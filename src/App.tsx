import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { NaverMap } from "./components/NaverMap";
import { ReportButton } from "./components/ReportButton";
import { Sidebar } from "./components/Sidebar";
import { restaurants } from "./data/restaurants";
import { koreaRegions } from "./data/regions";
import type { Filters, Restaurant, SortMode, UserLocation } from "./types";

const initialFilters: Filters = {
  query: "",
  province: undefined,
  district: undefined,
};

function App() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>();
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [userLocation, setUserLocation] = useState<UserLocation | undefined>();
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "ready" | "error">("idle");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const filteredRestaurants = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const searchable = [
        restaurant.name,
        restaurant.region,
        restaurant.address,
        restaurant.summary,
        restaurant.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !query || searchable.includes(query);
      const matchesRegion = !filters.province || restaurant.province === filters.province;
      const matchesDistrict = !filters.district || restaurant.district === filters.district;

      return matchesQuery && matchesRegion && matchesDistrict;
    });
  }, [filters]);

  const distanceByRestaurantId = useMemo(() => {
    if (!userLocation) {
      return new Map<string, number>();
    }

    return new Map(
      restaurants.map((restaurant) => [
        restaurant.id,
        getDistanceKm(userLocation, {
          lat: restaurant.lat,
          lng: restaurant.lng,
        }),
      ]),
    );
  }, [userLocation]);

  const visibleRestaurants = useMemo(() => {
    const next = [...filteredRestaurants];

    if (sortMode === "distance" && userLocation) {
      next.sort((a, b) => (distanceByRestaurantId.get(a.id) ?? Infinity) - (distanceByRestaurantId.get(b.id) ?? Infinity));
      return next;
    }

    if (sortMode === "rating") {
      next.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
    }

    return next;
  }, [distanceByRestaurantId, filteredRestaurants, sortMode, userLocation]);

  const handleSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsMobileDrawerOpen(false);
  };

  const requestLocationSort = () => {
    setSortMode("distance");

    if (userLocation) {
      setLocationStatus("ready");
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus("ready");
      },
      () => {
        setLocationStatus("error");
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000 * 60 * 10,
        timeout: 10000,
      },
    );
  };

  const handleSortModeChange = (nextSortMode: SortMode) => {
    if (nextSortMode === "distance") {
      requestLocationSort();
      return;
    }

    setSortMode(nextSortMode);
  };

  useEffect(() => {
    if (!selectedRestaurant) {
      return;
    }

    if (!visibleRestaurants.some((restaurant) => restaurant.id === selectedRestaurant.id)) {
      setSelectedRestaurant(undefined);
    }
  }, [selectedRestaurant, visibleRestaurants]);

  const selectedProvince = filters.province
    ? koreaRegions.find((province) => province.name === filters.province)
    : undefined;
  const selectedDistrict =
    selectedProvince && filters.district
      ? selectedProvince.districts.find((district) => district.name === filters.district)
      : undefined;
  const mapFocus = selectedDistrict
    ? {
        key: selectedDistrict.fullName,
        provinceName: selectedProvince!.name,
        districtName: selectedDistrict.name,
        query: selectedDistrict.query,
        lat: selectedDistrict.fallbackLat,
        lng: selectedDistrict.fallbackLng,
        zoom: selectedDistrict.zoom,
      }
    : selectedProvince
      ? {
          key: selectedProvince.name,
          provinceName: selectedProvince.name,
          query: selectedProvince.name,
          lat: selectedProvince.lat,
          lng: selectedProvince.lng,
          zoom: selectedProvince.zoom,
        }
      : undefined;

  return (
    <main className={`app ${selectedRestaurant ? "has-place-detail" : ""}`}>
      <NaverMap
        focusedRegion={mapFocus}
        restaurants={visibleRestaurants}
        selectedId={selectedRestaurant?.id}
        onClearSelection={() => setSelectedRestaurant(undefined)}
        onSelect={handleSelect}
      />

      <Sidebar
        filters={filters}
        distanceByRestaurantId={distanceByRestaurantId}
        locationStatus={locationStatus}
        restaurants={restaurants}
        results={visibleRestaurants}
        selectedRestaurant={selectedRestaurant}
        selectedId={selectedRestaurant?.id}
        sortMode={sortMode}
        mobileDrawerOpen={isMobileDrawerOpen}
        onClearSelection={() => setSelectedRestaurant(undefined)}
        onFiltersChange={setFilters}
        onSelect={handleSelect}
        onSortModeChange={handleSortModeChange}
      />

      <div className="mobile-search-bar" aria-label="모바일 검색">
        <button
          aria-label={isMobileDrawerOpen ? "필터 닫기" : "필터 열기"}
          onClick={() => setIsMobileDrawerOpen((current) => !current)}
          type="button"
        >
          {isMobileDrawerOpen ? <X size={19} /> : <SlidersHorizontal size={19} />}
        </button>
        <label>
          <Search size={18} />
          <input
            onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
            placeholder="식당명, 지역, 태그 검색"
            type="search"
            value={filters.query}
          />
        </label>
      </div>

      {isMobileDrawerOpen && !selectedRestaurant && (
        <button
          aria-label="필터 닫기"
          className="mobile-drawer-backdrop"
          onClick={() => setIsMobileDrawerOpen(false)}
          type="button"
        />
      )}

      <ReportButton />
    </main>
  );
}

export default App;

function getDistanceKm(from: UserLocation, to: UserLocation) {
  const earthRadiusKm = 6371;
  const latDistance = toRadians(to.lat - from.lat);
  const lngDistance = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);

  const haversine =
    Math.sin(latDistance / 2) ** 2 + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDistance / 2) ** 2;
  const centralAngle = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return earthRadiusKm * centralAngle;
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
