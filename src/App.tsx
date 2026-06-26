import { useEffect, useMemo, useState } from "react";
import { NaverMap } from "./components/NaverMap";
import { ReportButton } from "./components/ReportButton";
import { Sidebar } from "./components/Sidebar";
import { restaurants } from "./data/restaurants";
import { koreaRegions } from "./data/regions";
import type { Filters, Restaurant } from "./types";

const initialFilters: Filters = {
  query: "",
  province: undefined,
  district: undefined,
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

      return matchesQuery && matchesRegion && matchesDistrict;
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
        onClearSelection={() => setSelectedRestaurant(undefined)}
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

      <ReportButton />
    </main>
  );
}

export default App;
