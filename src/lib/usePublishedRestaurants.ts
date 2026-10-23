import { useEffect, useMemo, useState } from "react";
import { restaurants } from "../data/restaurants";
import { applyRestaurantPublications, restaurantPublications } from "../data/restaurantPublications";

export function usePublishedRestaurants() {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      const currentTime = Date.now();
      setNow(currentTime);
      clearTimeout(timer);

      const nextPublication = Math.min(
        ...restaurantPublications.map((item) => Date.parse(item.publishAt)).filter((time) => time > currentTime),
      );

      if (Number.isFinite(nextPublication)) {
        timer = setTimeout(update, Math.min(nextPublication - currentTime, 2_147_483_647));
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        update();
      }
    };

    update();
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return useMemo(() => applyRestaurantPublications(restaurants, now), [now]);
}
