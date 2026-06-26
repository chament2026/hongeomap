import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  MapPin,
  Phone,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Store,
  X,
} from "lucide-react";
import { useMemo, type ReactNode } from "react";
import type { Filters, Restaurant } from "../types";
import { fermentationLabels } from "../data/restaurants";
import { koreaRegions } from "../data/regions";

type SidebarProps = {
  filters: Filters;
  restaurants: Restaurant[];
  results: Restaurant[];
  selectedRestaurant?: Restaurant;
  selectedId?: string;
  onFiltersChange: (filters: Filters) => void;
  onClearSelection: () => void;
  onSelect: (restaurant: Restaurant) => void;
};

const koreanNameCollator = new Intl.Collator("ko-KR");

export function Sidebar({
  filters,
  restaurants,
  results,
  selectedRestaurant,
  selectedId,
  onClearSelection,
  onFiltersChange,
  onSelect,
}: SidebarProps) {
  const selectedProvince = filters.province
    ? koreaRegions.find((province) => province.name === filters.province)
    : undefined;
  const selectedDistricts = useMemo(
    () => [...(selectedProvince?.districts ?? [])].sort((a, b) => koreanNameCollator.compare(a.name, b.name)),
    [selectedProvince],
  );

  const setQuery = (query: string) => onFiltersChange({ ...filters, query });

  const selectProvince = (province: string) => {
    onFiltersChange({
      ...filters,
      province: filters.province === province ? undefined : province,
      district: undefined,
    });
  };

  const clearFilters = () =>
    onFiltersChange({
      query: "",
      province: undefined,
      district: undefined,
    });

  if (selectedRestaurant) {
    return (
      <aside className="sidebar place-sidebar" aria-label={`${selectedRestaurant.name} 상세 정보`}>
        <PlaceSidebar restaurant={selectedRestaurant} onBack={onClearSelection} />
      </aside>
    );
  }

  return (
    <aside className="sidebar" aria-label="홍어집 검색과 필터">
      <div className="brand">
        <div>
          <h1>참피디의 홍어맵</h1>
          <p>전국 홍어 맛집 전부 알려드림</p>
        </div>
      </div>

      <label className="search-box">
        <Search size={18} />
        <input
          value={filters.query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="식당명, 지역, 태그 검색"
          type="search"
        />
      </label>

      <div className="filter-header">
        <span>
          <SlidersHorizontal size={16} />
          필터
        </span>
        <button onClick={clearFilters} type="button">
          <X size={14} />
          초기화
        </button>
      </div>

      <FilterGroup title="지역별">
        <div className="region-picker">
          <div className="region-column" aria-label="시도 선택">
            {koreaRegions.map((province) => (
              <button
                className={filters.province === province.name ? "is-active" : ""}
                key={province.name}
                onClick={() => selectProvince(province.name)}
                type="button"
              >
                <MapPin size={14} />
                {province.shortName}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
          <div className="region-column district-column" aria-label="구시군 선택">
            {filters.province ? (
              <>
                <button
                  className={!filters.district ? "is-active" : ""}
                  onClick={() => onFiltersChange({ ...filters, district: undefined })}
                  type="button"
                >
                  전체
                </button>
                {selectedDistricts.map((district) => (
                  <button
                    className={filters.district === district.name ? "is-active" : ""}
                    key={district.fullName}
                    onClick={() => onFiltersChange({ ...filters, district: district.name })}
                    type="button"
                  >
                    {district.name}
                  </button>
                ))}
              </>
            ) : (
              <span>시/도를 먼저 선택하세요</span>
            )}
          </div>
        </div>
      </FilterGroup>

      <div className="result-meta">
        <span>{results.length}곳 발견</span>
        <span>총 {restaurants.length}곳</span>
      </div>

      <div className="result-list">
        {results.map((restaurant, index) => (
          <button
            className={`restaurant-card ${selectedId === restaurant.id ? "is-selected" : ""}`}
            key={restaurant.id}
            onClick={() => onSelect(restaurant)}
            type="button"
          >
            <span className="rank">#{index + 1}</span>
            <div className="card-main">
              <strong>{restaurant.name}</strong>
              <span>{restaurant.region}</span>
              <small>{restaurant.summary}</small>
            </div>
            <div className="card-score">
              <Store size={15} />
              {restaurant.rating ? restaurant.rating.toFixed(1) : "보기"}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

function PlaceSidebar({ restaurant, onBack }: { restaurant: Restaurant; onBack: () => void }) {
  const naverPlaceUrl =
    restaurant.naverPlaceUrl ?? `https://map.naver.com/p/search/${encodeURIComponent(restaurant.name)}`;
  const youtubeThumbnail = restaurant.youtubeId
    ? `https://img.youtube.com/vi/${restaurant.youtubeId}/hqdefault.jpg`
    : undefined;

  return (
    <>
      <button className="detail-back" onClick={onBack} type="button">
        <ArrowLeft size={18} />
        목록으로
      </button>

      <div className="place-hero">
        <span>{restaurant.region}</span>
        <h1>{restaurant.name}</h1>
        <div className="score-meta-row">
          <ScoreBlock rating={restaurant.rating} />
          <div className="place-meta-row">
            <em>{fermentationLabels[restaurant.fermentation]}</em>
          </div>
        </div>
      </div>

      <section className="full-video">
        <h2>풀영상 보러가기</h2>
        {restaurant.youtubeUrl && youtubeThumbnail ? (
          <a href={restaurant.youtubeUrl} rel="noreferrer" target="_blank">
            <img alt={`${restaurant.name} 유튜브 썸네일`} src={youtubeThumbnail} />
          </a>
        ) : (
          <div className="video-empty">
            <PlayCircle size={20} />
            풀영상 준비 중
          </div>
        )}
      </section>

      <section className="simple-review">
        <h2>참피디의 한 줄평</h2>
        <p>{restaurant.simpleReview}</p>
      </section>

      <section className="place-info-list" aria-label="가게 기본 정보">
        <InfoLine icon={<MapPin size={17} />} label="주소" value={restaurant.address} />
        <InfoLine icon={<Clock3 size={17} />} label="영업시간" value={restaurant.hours} />
        <InfoLine icon={<Phone size={17} />} label="전화번호" value={restaurant.phone} />
      </section>

      {restaurant.menuItems?.length ? (
        <section className="menu-section">
          <div className="section-title-row">
            <h2>메뉴</h2>
            {restaurant.menuSourceUrl ? (
              <a href={restaurant.menuSourceUrl} rel="noreferrer" target="_blank">
                {restaurant.menuSourceLabel ?? "출처 보기"}
              </a>
            ) : (
              restaurant.menuSourceLabel && <span>{restaurant.menuSourceLabel}</span>
            )}
          </div>
          <div className="menu-list">
            {restaurant.menuItems.map((item) => (
              <div className="menu-item" key={`${item.name}-${item.price}`}>
                <div>
                  <strong>{item.name}</strong>
                  {item.description && <span>{item.description}</span>}
                </div>
                <em>{item.price}</em>
              </div>
            ))}
          </div>
          {restaurant.menuImageUrl && (
            <img className="menu-image" alt={`${restaurant.name} 가격표`} src={restaurant.menuImageUrl} />
          )}
        </section>
      ) : null}

      <a className="naver-place-button" href={naverPlaceUrl} rel="noreferrer" target="_blank">
        <ExternalLink size={17} />
        네이버플레이스에서 보기
      </a>
    </>
  );
}

function ScoreBlock({ rating }: { rating?: number }) {
  const hasRating = typeof rating === "number";

  return (
    <div className={`score-block ${hasRating ? "" : "is-empty"}`}>
      <span>참피디 평점</span>
      {hasRating ? (
        <strong>
          {rating.toFixed(1)}
          <small>/ 5.0</small>
        </strong>
      ) : (
        <strong>평점 준비중</strong>
      )}
    </div>
  );
}

function InfoLine({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="place-info-line">
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="filter-group">
      <h2>{title}</h2>
      <div className="filter-content">{children}</div>
    </section>
  );
}
