import type { ProductType } from '~/types/productType';
import type { SearchParams } from '~/types/searchParams';

export class ProductService {
  private apiBase: string;

  constructor(apiBase: string) {
    this.apiBase = apiBase;
  }

  sortProducts(products: ProductType[], sortBy: string): ProductType[] {
    switch (sortBy) {
      case 'featured':
        return products;
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  }

  searchProducts(params: SearchParams, products: ProductType[]): ProductType[] {
    try {
      const filteredProducts = products.filter((product) => {
        let isMatch = true;

        if (params.query) {
          const queryLower = params.query.toLowerCase();
          isMatch =
            isMatch &&
            (product.name.toLowerCase().includes(queryLower) ||
              product.description.toLowerCase().includes(queryLower));
        }
        if (params.category) {
          isMatch = isMatch && product.categoryId === Number(params.category);
        }
        if (params.brand) {
          isMatch = isMatch && product.brandId === Number(params.brand);
        }
        if (params.minPrice !== undefined) {
          isMatch = isMatch && product.price >= params.minPrice;
        }
        if (params.maxPrice !== undefined) {
          isMatch = isMatch && product.price <= params.maxPrice;
        }
        if (params.rating !== undefined) {
          isMatch = isMatch && product.rating >= params.rating;
        }
        if (params.freeShipping !== undefined) {
          isMatch = isMatch && product.freeShipping === params.freeShipping;
        }

        return isMatch;
      });

      return filteredProducts;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProducts(): Promise<ProductType[]> {
    return await $fetch<ProductType[]>(this.apiBase);
  }
}

export const useProductService = () => {
  const config = useRuntimeConfig();
  const API_BASE = `${config.public.urlBackend}/products`;
  return new ProductService(API_BASE);
};
