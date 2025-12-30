import type { ProductType } from './productType';

export interface CategoryType {
  id: number;
  name: string;
  products: ProductType[];
  slug: string;
  subcategories?: CategoryType[];
}
