export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  brandId: number;
  freeShipping: boolean;
  rating: number;
  reviewCount: number;
  sku?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
