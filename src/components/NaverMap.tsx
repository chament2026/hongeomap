import { useEffect, useMemo, useRef, useState } from "react";
import type { Restaurant } from "../types";

type NaverMapProps = {
  focusedRegion?: {
    key: string;
    provinceName: string;
    districtName?: string;
    query: string;
    lat: number;
    lng: number;
    zoom: number;
  };
  restaurants: Restaurant[];
  selectedId?: string;
  onClearSelection: () => void;
  onSelect: (restaurant: Restaurant) => void;
};

type NaverMaps = {
  LatLng: new (lat: number, lng: number) => unknown;
  Point: new (x: number, y: number) => unknown;
  Map: new (
    element: HTMLElement,
    options: Record<string, unknown>,
  ) => { setCenter: (latLng: unknown) => void; setZoom: (zoom: number) => void };
  Marker: new (options: Record<string, unknown>) => { setMap: (map: unknown | null) => void };
  Polygon: new (options: Record<string, unknown>) => { setMap: (map: unknown | null) => void };
  Event: { addListener: (target: unknown, eventName: string, handler: () => void) => void };
  Service?: {
    geocode: (
      options: { query: string },
      callback: (status: string, response: { v2?: { addresses?: Array<{ x: string; y: string }> } }) => void,
    ) => void;
    Status?: { OK: string };
  };
};

type GeoFeature = {
  type: "Feature";
  properties: { code: string; name: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};

type GeoFeatureCollection = {
  type: "FeatureCollection";
  features: GeoFeature[];
};

declare global {
  interface Window {
    naver?: { maps: NaverMaps };
    __initHongeoNaverMap?: () => void;
  }
}

const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined;
let naverMapsPromise: Promise<NaverMaps> | undefined;
let provinceBoundaryPromise: Promise<GeoFeatureCollection> | undefined;
let municipalityBoundaryPromise: Promise<GeoFeatureCollection> | undefined;

const provinceCodeByName: Record<string, string> = {
  서울특별시: "11",
  부산광역시: "21",
  대구광역시: "22",
  인천광역시: "23",
  광주광역시: "24",
  대전광역시: "25",
  울산광역시: "26",
  세종특별자치시: "29",
  경기도: "31",
  강원도: "32",
  강원특별자치도: "32",
  충청북도: "33",
  충청남도: "34",
  전라북도: "35",
  전북특별자치도: "35",
  전라남도: "36",
  경상북도: "37",
  경상남도: "38",
  제주특별자치도: "39",
};

const boundaryNameAliases: Record<string, string> = {
  강원특별자치도: "강원도",
  전북특별자치도: "전라북도",
};

function loadProvinceBoundaries() {
  provinceBoundaryPromise ??= fetch("/data/skorea_provinces_geo_simple.json").then((response) => response.json());
  return provinceBoundaryPromise;
}

function loadMunicipalityBoundaries() {
  municipalityBoundaryPromise ??= fetch("/data/skorea_municipalities_geo_simple.json").then((response) => response.json());
  return municipalityBoundaryPromise;
}

function waitForNaverMaps(timeoutMs = 6000) {
  return new Promise<NaverMaps>((resolve, reject) => {
    const startedAt = Date.now();
    const check = () => {
      if (window.naver?.maps) {
        resolve(window.naver.maps);
        return;
      }

      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error("NAVER_MAP_TIMEOUT"));
        return;
      }

      window.setTimeout(check, 100);
    };

    check();
  });
}

function loadNaverMaps() {
  if (window.naver?.maps) {
    return Promise.resolve(window.naver.maps);
  }

  if (naverMapsPromise) {
    return naverMapsPromise;
  }

  if (!clientId) {
    return Promise.reject(new Error("NAVER_MAP_CLIENT_ID_MISSING"));
  }

  naverMapsPromise = new Promise<NaverMaps>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-naver-map]");

    window.__initHongeoNaverMap = () => {
      if (window.naver?.maps) {
        resolve(window.naver.maps);
      } else {
        reject(new Error("NAVER_MAP_LOAD_FAILED"));
      }
    };

    if (existing) {
      waitForNaverMaps().then(resolve).catch(reject);
      existing.addEventListener("error", () => reject(new Error("NAVER_MAP_SCRIPT_ERROR")));
      return;
    }

    const script = document.createElement("script");
    script.dataset.naverMap = "true";
    script.async = true;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`;
    script.onload = () => waitForNaverMaps().then(resolve).catch(reject);
    script.onerror = () => reject(new Error("NAVER_MAP_SCRIPT_ERROR"));
    document.head.appendChild(script);
  });

  return naverMapsPromise;
}

function featureToPolygonPaths(maps: NaverMaps, feature: GeoFeature) {
  if (feature.geometry.type === "Polygon") {
    return [feature.geometry.coordinates as number[][][]].map((polygon) =>
      polygon.map((ring) => ring.map(([lng, lat]) => new maps.LatLng(lat, lng))),
    );
  }

  return (feature.geometry.coordinates as number[][][][]).map((polygon) =>
    polygon.map((ring) => ring.map(([lng, lat]) => new maps.LatLng(lat, lng))),
  );
}

function createBoundaryPolygons(maps: NaverMaps, map: unknown, feature: GeoFeature) {
  return featureToPolygonPaths(maps, feature).map(
    (paths) =>
      new maps.Polygon({
        map,
        paths,
        strokeColor: "#059669",
        strokeOpacity: 0.95,
        strokeWeight: 4,
        fillColor: "#059669",
        fillOpacity: 0.08,
        clickable: false,
        zIndex: 90,
      }),
  );
}

async function findBoundaryFeature(focusedRegion: NonNullable<NaverMapProps["focusedRegion"]>) {
  const provinceCode = provinceCodeByName[focusedRegion.provinceName];

  if (focusedRegion.districtName && provinceCode) {
    const municipalities = await loadMunicipalityBoundaries();
    const districtFeature = municipalities.features.find(
      (feature) => feature.properties.code.startsWith(provinceCode) && feature.properties.name === focusedRegion.districtName,
    );

    if (districtFeature) {
      return districtFeature;
    }
  }

  const provinces = await loadProvinceBoundaries();
  const boundaryName = boundaryNameAliases[focusedRegion.provinceName] ?? focusedRegion.provinceName;
  return provinces.features.find((feature) => feature.properties.name === boundaryName);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return replacements[character];
  });
}

export function NaverMap({ focusedRegion, restaurants, selectedId, onClearSelection, onSelect }: NaverMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);
  const hasMapClickListenerRef = useRef(false);
  const ignoreNextMapClickRef = useRef(false);
  const markerRefs = useRef<Array<{ setMap: (map: unknown | null) => void }>>([]);
  const boundaryRefs = useRef<Array<{ setMap: (map: unknown | null) => void }>>([]);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "fallback">("loading");
  const onClearSelectionRef = useRef(onClearSelection);

  onClearSelectionRef.current = onClearSelection;

  const center = useMemo(() => {
    if (restaurants.length === 0) {
      return { lat: 36.3, lng: 127.8 };
    }

    const total = restaurants.reduce(
      (sum, restaurant) => ({ lat: sum.lat + restaurant.lat, lng: sum.lng + restaurant.lng }),
      { lat: 0, lng: 0 },
    );

    return { lat: total.lat / restaurants.length, lng: total.lng / restaurants.length };
  }, [restaurants]);

  const selectedRestaurant = useMemo(
    () => restaurants.find((restaurant) => restaurant.id === selectedId),
    [restaurants, selectedId],
  );

  useEffect(() => {
    let cancelled = false;

    loadNaverMaps()
      .then((maps) => {
        if (cancelled || !mapElementRef.current) {
          return;
        }

        const activeCenter = focusedRegion ?? selectedRestaurant ?? center;
        const map =
          mapRef.current ??
          new maps.Map(mapElementRef.current, {
            center: new maps.LatLng(activeCenter.lat, activeCenter.lng),
            zoom: focusedRegion?.zoom ?? (selectedRestaurant ? 12 : restaurants.length > 2 ? 7 : 10),
            minZoom: 6,
            scaleControl: false,
            logoControl: true,
            mapDataControl: false,
          });

        mapRef.current = map;
        if (!hasMapClickListenerRef.current) {
          maps.Event.addListener(map, "click", () => {
            if (ignoreNextMapClickRef.current) {
              ignoreNextMapClickRef.current = false;
              return;
            }

            onClearSelectionRef.current();
          });
          hasMapClickListenerRef.current = true;
        }

        markerRefs.current.forEach((marker) => marker.setMap(null));
        markerRefs.current = restaurants.map((restaurant) => {
          const isSelected = restaurant.id === selectedId;
          const marker = new maps.Marker({
            position: new maps.LatLng(restaurant.lat, restaurant.lng),
            map,
            icon: {
              content: `<div class="naver-marker ${isSelected ? "is-selected" : ""}">${isSelected ? `<span>${escapeHtml(restaurant.name)}</span>` : ""}</div>`,
              anchor: new maps.Point(0, 0),
            },
            title: restaurant.name,
          });
          maps.Event.addListener(marker, "click", () => {
            ignoreNextMapClickRef.current = true;
            onSelect(restaurant);
            window.setTimeout(() => {
              ignoreNextMapClickRef.current = false;
            }, 0);
          });
          return marker;
        });

        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setLoadState("fallback");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [center, focusedRegion, onSelect, restaurants, selectedId, selectedRestaurant]);

  useEffect(() => {
    if (!selectedId || focusedRegion || !window.naver?.maps || !mapRef.current) {
      return;
    }

    const selected = restaurants.find((restaurant) => restaurant.id === selectedId);
    if (selected) {
      const latLng = new window.naver.maps.LatLng(selected.lat, selected.lng);
      (mapRef.current as { setCenter: (latLng: unknown) => void; setZoom: (zoom: number) => void }).setCenter(latLng);
      (mapRef.current as { setCenter: (latLng: unknown) => void; setZoom: (zoom: number) => void }).setZoom(12);
    }
  }, [restaurants, selectedId]);

  useEffect(() => {
    if (!focusedRegion || !window.naver?.maps || !mapRef.current) {
      return;
    }

    const map = mapRef.current as { setCenter: (latLng: unknown) => void; setZoom: (zoom: number) => void };
    const fallback = () => {
      map.setCenter(new window.naver!.maps.LatLng(focusedRegion.lat, focusedRegion.lng));
      map.setZoom(focusedRegion.zoom);
    };

    const service = window.naver.maps.Service;
    if (!service?.geocode) {
      fallback();
      return;
    }

    service.geocode({ query: focusedRegion.query }, (status, response) => {
      const okStatus = service.Status?.OK ?? "OK";
      const address = response.v2?.addresses?.[0];

      if (status === okStatus && address) {
        map.setCenter(new window.naver!.maps.LatLng(Number(address.y), Number(address.x)));
        map.setZoom(focusedRegion.zoom);
        return;
      }

      fallback();
    });
  }, [focusedRegion]);

  useEffect(() => {
    let cancelled = false;

    boundaryRefs.current.forEach((polygon) => polygon.setMap(null));
    boundaryRefs.current = [];

    if (!focusedRegion || !window.naver?.maps || !mapRef.current) {
      return;
    }

    findBoundaryFeature(focusedRegion)
      .then((feature) => {
        if (cancelled || !feature || !window.naver?.maps || !mapRef.current) {
          return;
        }

        boundaryRefs.current = createBoundaryPolygons(window.naver.maps, mapRef.current, feature);
      })
      .catch(() => {
        boundaryRefs.current = [];
      });

    return () => {
      cancelled = true;
    };
  }, [focusedRegion]);

  return (
    <section className="map-shell" aria-label="홍어맵 지도">
      <div ref={mapElementRef} className="naver-map" style={{ height: "100%", width: "100%" }} />
      {loadState !== "ready" && (
        <FallbackMap
          restaurants={restaurants}
          selectedId={selectedId}
          onClearSelection={onClearSelection}
          onSelect={onSelect}
          loading={loadState === "loading"}
        />
      )}
    </section>
  );
}

function FallbackMap({
  restaurants,
  selectedId,
  onClearSelection,
  onSelect,
  loading,
}: NaverMapProps & { loading: boolean }) {
  return (
    <div
      className="fallback-map"
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("button")) {
          onClearSelection();
        }
      }}
    >
      <div className="fallback-river" />
      <div className="fallback-road road-a" />
      <div className="fallback-road road-b" />
      <div className="fallback-road road-c" />
      <span className="map-place-label label-seoul">서울권</span>
      <span className="map-place-label label-jeonnam">전남권</span>
      <span className="map-place-label label-busan">부산권</span>
      {restaurants.map((restaurant, index) => (
        <button
          className={`fallback-pin ${selectedId === restaurant.id ? "is-selected" : ""}`}
          key={restaurant.id}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(restaurant);
          }}
          style={{
            left: `${22 + ((index * 17) % 56)}%`,
            top: `${24 + ((index * 23) % 48)}%`,
          }}
          type="button"
        >
          {selectedId === restaurant.id && <span>{restaurant.name}</span>}
        </button>
      ))}
      <div className="map-status">
        <strong>{loading ? "네이버 지도 연결 중" : "운영 지도 연결 대기"}</strong>
        <span>{clientId ? "지도를 불러오고 있습니다." : "네이버 ncpKeyId를 연결하면 실제 지도 타일로 전환됩니다."}</span>
      </div>
    </div>
  );
}
