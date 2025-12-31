import { ref, watch } from 'vue';
import { useProductService } from '~/services/productService';
import type { ProductType } from '~/types/productType';
import type { SearchParams } from '~/types/searchParams';
export const useSearch = () => {
  const productService = useProductService();
  const searchQuery = ref<SearchParams>({ query: '', freeShipping: false });
  const isLoading = ref(false);
  const results = ref<{
    data?: ProductType[];
    displayData: ProductType[];
    error: string;
  }>({
    data: [],
    displayData: [],
    error: '',
  });
  const totalPages = ref(0);
  const page = ref(1);
  const pageSize = ref(16);
  let debounceTimer: NodeJS.Timeout | null = null;
  let allProducts: ProductType[] = [];
  let filteredProducts: ProductType[] = [];
  const initializeProducts = async (): Promise<void> => {
    isLoading.value = true;
    try {
      allProducts = await productService.getProducts();
      filteredProducts = allProducts;
      results.value = {
        data: allProducts,
        error: '',
        displayData: allProducts,
      };
      totalPages.value = getTotalPages();
    } catch (error) {
      console.error('Initialization error:', error);
      results.value = {
        data: [],
        error: 'Failed to initialize products',
        displayData: [],
      };
    } finally {
      isLoading.value = false;
    }
  };

  const filterProducts = (): void => {
    try {
      searchQuery.value.page = page.value;
      searchQuery.value.pageSize = pageSize.value;
      filteredProducts = productService.searchProducts(
        searchQuery.value,
        allProducts
      );

      totalPages.value = getTotalPages();
      const startIndex = (page.value - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;
      results.value = {
        data: filteredProducts,
        displayData: filteredProducts.slice(startIndex, endIndex),
        error: '',
      };
    } catch (error) {
      console.error('Search error:', error);
      results.value = {
        data: [],
        displayData: [],
        error: 'product search error',
      };
    }
  };

  watch(
    () => searchQuery.value.query,
    (newQuery) => {
      console.log('Query changed to:', newQuery);

      // Clear timer cũ
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        filterProducts();
      }, 300);
    }
  );
  const changePage = (newPage: number): void => {
    page.value = newPage;
    filterProducts();
  };
  const changePageSize = (newPageSize: number): void => {
    pageSize.value = newPageSize;
    page.value = 1;
    filterProducts();
  };

  const getTotalPages = (): number => {
    return Math.ceil(filteredProducts.length / pageSize.value) || 1;
  };

  const sortProducts = (sortBy: string): void => {
    results.value = {
      displayData: productService.sortProducts(
        results.value.displayData,
        sortBy
      ),
      error: '',
    };
  };

  return {
    searchQuery,
    results,
    isLoading,
    filterProducts,
    initializeProducts,
    changePage,
    totalPages,
    changePageSize,
    sortProducts,
  };
};
