import { useEffect, useMemo, useState } from "react";
import { Heart, ListFilter, Map } from "lucide-react";
import { NaverMap } from "./components/NaverMap";
import { Sidebar } from "./components/Sidebar";
import { restaurants } from "./data/restaurants";
import { koreaRegions } from "./data/regions";
import type { Filters, Restaurant } from "./types";

const initialFilters: Filters = {
  query: "",
  province: undefined,
  district: undefined,
  fermentation: [],
  maxPrice: 1000000,
  openNow: false,
};

function App() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>();

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
      const matchesFermentation =
        filters.fermentation.length === 0 || filters.fermentation.includes(restaurant.fermentation);
      const matchesPrice = restaurant.averagePrice <= filters.maxPrice;
      const matchesOpen = !filters.openNow || restaurant.isOpenNow;

      return matchesQuery && matchesRegion && matchesDistrict && matchesFermentation && matchesPrice && matchesOpen;
    });
  }, [filters]);

  const handleSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  useEffect(() => {
    if (!selectedRestaurant) {
      return;
    }

    if (!filteredRestaurants.some((restaurant) => restaurant.id === selectedRestaurant.id)) {
      setSelectedRestaurant(undefined);
    }
  }, [filteredRestaurants, selectedRestaurant]);

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
    <main className="app">
      <NaverMap
        focusedRegion={mapFocus}
        restaurants={filteredRestaurants}
        selectedId={selectedRestaurant?.id}
        onSelect={handleSelect}
      />

      <Sidebar
        filters={filters}
        restaurants={restaurants}
        results={filteredRestaurants}
        selectedRestaurant={selectedRestaurant}
        selectedId={selectedRestaurant?.id}
        onClearSelection={() => setSelectedRestaurant(undefined)}
        onFiltersChange={setFilters}
        onSelect={handleSelect}
      />

      <div className="top-controls" aria-label="지도 빠른 조작">
        <button type="button">
          <Map size={17} />
          이 지역 더 보기
        </button>
        <button aria-label="찜한 홍어집" type="button">
          <Heart size={18} />
        </button>
        <button aria-label="필터 열기" type="button">
          <ListFilter size={18} />
        </button>
      </div>

      <section className="recent-panel" aria-label="최근 업데이트">
        <div>
          <strong>이번 달 홍어집</strong>
          <span>영상 업로드 후 리뷰가 연결됩니다</span>
        </div>
        {restaurants.slice(0, 4).map((restaurant, index) => (
          <button key={restaurant.id} onClick={() => handleSelect(restaurant)} type="button">
            <span>#{index + 1}</span>
            <strong>{restaurant.name}</strong>
            <small>{restaurant.visitedAt}</small>
          </button>
        ))}
      </section>
    </main>
  );
}

export default App;
