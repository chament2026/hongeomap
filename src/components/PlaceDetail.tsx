import { ExternalLink, MapPinned, Navigation, PlayCircle, Star } from "lucide-react";
import type { Restaurant } from "../types";
import { fermentationLabels, priceRangeLabels } from "../data/restaurants";

type PlaceDetailProps = {
  restaurant?: Restaurant;
};

export function PlaceDetail({ restaurant }: PlaceDetailProps) {
  if (!restaurant) {
    return (
      <aside className="place-detail empty-detail">
        <strong>홍어집을 선택해보세요</strong>
        <span>지도 마커나 왼쪽 목록을 누르면 리뷰 요약과 길찾기 링크가 열립니다.</span>
      </aside>
    );
  }

  const query = encodeURIComponent(restaurant.address || restaurant.name);
  const naverMapUrl = `https://map.naver.com/p/search/${query}`;
  const kakaoMapUrl = `https://map.kakao.com/link/search/${query}`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <aside className="place-detail">
      <div className="detail-eyebrow">
        <span>{restaurant.isOpenNow ? "영업중" : "영업시간 확인 필요"}</span>
        <span>{restaurant.hasVideo ? "영상 리뷰" : "텍스트 리뷰"}</span>
      </div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.summary}</p>

      <div className="detail-stats">
        <span>
          <Star size={15} />
          {restaurant.rating.toFixed(1)}
        </span>
        <span>{fermentationLabels[restaurant.fermentation]}</span>
        <span>{priceRangeLabels[restaurant.priceRange]}</span>
      </div>

      <div className="address-line">
        <MapPinned size={16} />
        <span>{restaurant.address}</span>
      </div>

      <div className="tag-row">
        {restaurant.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="detail-actions">
        {restaurant.youtubeUrl && (
          <a className="primary-action" href={restaurant.youtubeUrl} rel="noreferrer" target="_blank">
            <PlayCircle size={17} />
            영상 보기
          </a>
        )}
        <a href={naverMapUrl} rel="noreferrer" target="_blank">
          <Navigation size={16} />
          네이버지도
        </a>
        <a href={kakaoMapUrl} rel="noreferrer" target="_blank">
          <ExternalLink size={16} />
          카카오맵
        </a>
        <a href={googleMapUrl} rel="noreferrer" target="_blank">
          <ExternalLink size={16} />
          구글지도
        </a>
      </div>
    </aside>
  );
}
