import assert from "node:assert/strict";
import test from "node:test";
import { restaurants } from "../src/data/restaurants.ts";
import { applyRestaurantPublications, restaurantPublications } from "../src/data/restaurantPublications.ts";

const publication = restaurantPublications[0];
const publishTime = Date.parse(publication.publishAt);
const findAnyang = (items) => items.find((restaurant) => restaurant.id === publication.restaurantId);

test("publication starts at 16:45 Korea time, not before", () => {
  assert.equal(new Date(publishTime).toISOString(), "2026-10-23T07:45:00.000Z");
  assert.equal(findAnyang(applyRestaurantPublications(restaurants, publishTime - 1)).visitStatus, "planned");

  for (const now of [publishTime, publishTime + 86_400_000]) {
    const restaurant = findAnyang(applyRestaurantPublications(restaurants, now));
    assert.equal(restaurant.visitStatus, "visited");
    assert.equal(restaurant.simpleReview, "유쾌한 홍어박사님의 강의를 들을 수 있는 곳");
    assert.equal(restaurant.youtubeId, "1qzZOL3YD-8");
    assert.equal(restaurant.youtubeUrl, "https://youtu.be/1qzZOL3YD-8");
    assert.ok(!restaurant.tags.includes("방문예정"));
    assert.ok(restaurant.tags.includes("영상리뷰"));
  }
});

test("only Anyang changes and the original data stays intact", () => {
  const original = findAnyang(restaurants);
  const published = applyRestaurantPublications(restaurants, publishTime);

  assert.equal(published.length, restaurants.length);
  assert.equal(original.visitStatus, "planned");
  assert.equal(original.youtubeId, undefined);
  assert.equal(findAnyang(published).address, original.address);

  for (const restaurant of restaurants.filter((item) => item.id !== publication.restaurantId)) {
    assert.equal(published.find((item) => item.id === restaurant.id), restaurant);
  }

  assert.equal(published.find((item) => item.id === "planned-namdo-seasonal-yeongdeungpo").visitStatus, "planned");
});

test("Namdo publishes only at November 2, 16:45 Korea time", () => {
  const namdoId = "planned-namdo-seasonal-yeongdeungpo";
  const matchingPublications = restaurantPublications.filter((item) => item.restaurantId === namdoId);
  assert.equal(matchingPublications.length, 1);

  const namdoPublication = matchingPublications[0];
  const namdoPublishTime = Date.parse(namdoPublication.publishAt);
  assert.equal(new Date(namdoPublishTime).toISOString(), "2026-11-02T07:45:00.000Z");

  const before = applyRestaurantPublications(restaurants, namdoPublishTime - 1);
  const beforeNamdo = before.find((item) => item.id === namdoId);
  assert.equal(beforeNamdo.visitStatus, "planned");
  assert.equal(beforeNamdo.youtubeUrl, undefined);
  assert.notEqual(beforeNamdo.simpleReview, namdoPublication.simpleReview);

  for (const now of [namdoPublishTime, namdoPublishTime + 86_400_000]) {
    const after = applyRestaurantPublications(restaurants, now);
    const namdo = after.find((item) => item.id === namdoId);
    assert.equal(namdo.visitStatus, "visited");
    assert.equal(namdo.youtubeId, "V0zl__ZEcmI");
    assert.equal(namdo.youtubeUrl, "https://youtu.be/V0zl__ZEcmI");
    assert.equal(namdo.simpleReview, "여기가 바로 홍어계의 최고 존엄 삭힘의 미학을 완벽하게 집대성한 절대강자.");
    assert.equal(namdo.hours, "확인 중");
    assert.equal(namdo.address, "서울 영등포구 양평로24길 9");
    assert.ok(!namdo.tags.includes("방문예정"));
    assert.ok(namdo.tags.includes("영상리뷰"));
    assert.deepEqual(after.filter((item) => item.id !== namdoId), before.filter((item) => item.id !== namdoId));
  }

  assert.equal(restaurants.find((item) => item.id === namdoId).visitStatus, "planned");
  assert.equal(findAnyang(before).visitStatus, "visited");
  assert.equal(findAnyang(before).youtubeId, "1qzZOL3YD-8");
});
