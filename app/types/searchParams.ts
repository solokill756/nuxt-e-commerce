export interface SearchParams {
  query: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  brandIds?: number[];
  rating?: number;
  freeShipping?: boolean;
  page?: number;
  pageSize?: number;
}
