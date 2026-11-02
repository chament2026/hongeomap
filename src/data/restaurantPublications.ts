import type { Restaurant } from "../types";

export const restaurantPublications = [
  {
    restaurantId: "planned-heuksando-hongeo-anyang",
    publishAt: "2026-10-23T16:45:00+09:00",
    simpleReview: "유쾌한 홍어박사님의 강의를 들을 수 있는 곳",
    youtubeId: "1qzZOL3YD-8",
    youtubeUrl: "https://youtu.be/1qzZOL3YD-8",
  },
  {
    restaurantId: "planned-namdo-seasonal-yeongdeungpo",
    publishAt: "2026-11-02T16:45:00+09:00",
    simpleReview: "여기가 바로 홍어계의 최고 존엄 삭힘의 미학을 완벽하게 집대성한 절대강자.",
    youtubeId: "V0zl__ZEcmI",
    youtubeUrl: "https://youtu.be/V0zl__ZEcmI",
  },
];

export function applyRestaurantPublications(restaurants: Restaurant[], now: number): Restaurant[] {
  return restaurants.map((restaurant) => {
    const publication = restaurantPublications.find(
      (item) => item.restaurantId === restaurant.id && Date.parse(item.publishAt) <= now,
    );

    if (!publication) {
      return restaurant;
    }

    return {
      ...restaurant,
      visitStatus: "visited",
      visitedAt: "방문일 확인 필요",
      hours: restaurant.hours === "방문예정" ? "확인 중" : restaurant.hours,
      simpleReview: publication.simpleReview,
      youtubeId: publication.youtubeId,
      youtubeUrl: publication.youtubeUrl,
      tags: [...restaurant.tags.filter((tag) => tag !== "방문예정" && tag !== "제보맛집"), "영상리뷰"],
    };
  });
}
