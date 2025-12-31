import { useBrandService } from '~/services/brandService';
import type { BrandType } from '~/types/brandType';
import { ref } from 'vue';

export const useBrand = () => {
  const brandService = useBrandService();
  const isLoading = ref(false);
  const results = ref<{ data: BrandType[]; error: string }>({
    data: [],
    error: '',
  });

  const fetchBrands = async () => {
    isLoading.value = true;
    try {
      const brands = await brandService.getBrands();

      results.value = { data: brands, error: '' };
    } catch (error: any) {
      console.error('Error fetching brands:', error.statusText || error);
      results.value = { data: [], error: 'Failed to fetch brands' };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    results,
    fetchBrands,
  };
};
