import type { Restaurant } from "../types";

// 실제 방문한 홍어집 데이터를 이 배열에 추가합니다.
export const restaurants: Restaurant[] = [
  {
    id: "hongeo-hanmari-seogyo",
    name: "홍어한마리",
    province: "서울특별시",
    district: "마포구",
    region: "서울 마포구",
    address: "서울 마포구 동교로 94 지하1층",
    lat: 37.5542573,
    lng: 126.9125671,
    fermentation: "medium",
    hours: "월-토 16:00 - 22:00, 일요일 휴무",
    phone: "02-323-1011",
    naverPlaceUrl: "https://naver.me/IItJtzq9",
    simpleReview: "참피디 간단리뷰 작성 예정입니다. 우선 방문 영상으로 홍어한마리의 홍마카세 구성을 확인할 수 있습니다.",
    visitedAt: "방문일 확인 필요",
    summary: "서울 마포구 서교동에서 홍어 코스요리인 홍마카세로 알려진 홍어집.",
    tags: ["서울", "마포구", "서교동", "홍마카세", "흑산도홍어", "중숙", "강숙", "영상리뷰"],
    youtubeId: "z6tDJC6iJ1Q",
    youtubeUrl: "https://www.youtube.com/watch?v=z6tDJC6iJ1Q",
  },
];

export const fermentationLabels = {
  beginner: "입문자",
  mild: "약숙",
  medium: "중숙",
  strong: "강숙",
} as const;

export const priceRangeLabels = {
  low: "2만원 이하",
  mid: "2~4만원",
  high: "4만원 이상",
} as const;
