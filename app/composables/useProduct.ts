import { useProductService } from '~/services/productService';
import type { ProductType } from '~/types/productType';
import { ref } from 'vue';

export const useProduct = () => {
  const productService = useProductService();
  const isLoading = ref(false);
  const results = ref<{ data: ProductType[]; error: string }>({
    data: [],
    error: '',
  });
  const fetchProducts = async () => {
    isLoading.value = true;
    try {
      const products = await productService.getProducts();
      console.log('Fetched products:', products);
      results.value = { data: products, error: '' };
    } catch (error) {
      console.error('Error fetching products:', error);
      results.value = { data: [], error: 'Failed to fetch products' };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    results,
    fetchProducts,
  };
};
