export type FermentationLevel = "beginner" | "mild" | "medium" | "strong";

export type PriceRange = "low" | "mid" | "high";

export type SortMode = "default" | "distance" | "rating";

export type LocationStatus = "idle" | "requesting" | "ready" | "error" | "unsupported";

export type UserLocation = {
  lat: number;
  lng: number;
};

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  province: string;
  district: string;
  region: string;
  address: string;
  lat: number;
  lng: number;
  fermentation: FermentationLevel;
  priceRange?: PriceRange;
  averagePrice?: number;
  rating?: number;
  isOpenNow?: boolean;
  hasVideo?: boolean;
  hours: string;
  phone: string;
  naverPlaceUrl?: string;
  simpleReview: string;
  menuItems?: MenuItem[];
  menuSourceLabel?: string;
  menuSourceUrl?: string;
  menuImageUrl?: string;
  visitedAt: string;
  summary: string;
  tags: string[];
  youtubeId?: string;
  youtubeUrl?: string;
};

export type Filters = {
  query: string;
  province?: string;
  district?: string;
};
