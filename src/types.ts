export type FermentationLevel = "beginner" | "mild" | "medium" | "strong";

export type PriceRange = "low" | "mid" | "high";

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
  fermentation: FermentationLevel[];
};
