import { useCategoryService } from '~/services/categoryService';
import type { CategoryType } from '~/types/categoryType';
import { ref } from 'vue';
export const useCategory = () => {
  const categoryService = useCategoryService();
  const isLoading = ref(false);
  const results = ref<{ data: CategoryType[]; error: string }>({
    data: [],
    error: '',
  });
  const fetchCategories = async () => {
    isLoading.value = true;
    try {
      const cats = await categoryService.getCategories();

      results.value = { data: cats, error: '' };
    } catch (error: any) {
      console.error('Error fetching categories:', error.statusText || error);
      results.value = { data: [], error: 'Failed to fetch categories' };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    results,
    fetchCategories,
  };
};
