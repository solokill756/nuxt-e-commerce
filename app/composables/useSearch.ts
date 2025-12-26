import { ref, watch } from 'vue';
import { useProductService } from '~/services/productService';
import type { ProductType } from '~/types/productType';
import type { SearchParams } from '~/types/searchParams';
export const useSearch = () => {
  const productService = useProductService();
  const searchQuery = ref<SearchParams>({ query: '' });
  const isLoading = ref(false);
  const results = ref<{ data: ProductType[]; error: string }>({
    data: [],
    error: '',
  });
  let debounceTimer: NodeJS.Timeout | null = null;

  const filterProducts = (products: ProductType[]): void => {
    isLoading.value = true;
    try {
      if (
        (!searchQuery.value.query || searchQuery.value.query.trim() === '') &&
        products.length === 0
      ) {
        console.log(' Fetched all products');
        return;
      }
      results.value = {
        data: productService.searchProducts(searchQuery.value, products),
        error: '',
      };
    } catch (error) {
      console.error(' Search error:', error);
      results.value = { data: [], error: 'product search error' };
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    () => searchQuery.value.query,
    (newQuery) => {
      console.log('Query changed to:', newQuery);

      // Clear timer cũ
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        filterProducts(results.value.data);
      }, 50);
    }
  );

  return {
    searchQuery,
    results,
    isLoading,
    filterProducts,
  };
};
