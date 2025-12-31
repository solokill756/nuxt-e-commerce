export interface SearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  freeShipping?: boolean;
  page?: number;
  pageSize?: number;
}
