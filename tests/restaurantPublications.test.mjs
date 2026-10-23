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
