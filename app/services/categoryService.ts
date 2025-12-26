import type { CategoryType } from '~/types/categoryType';

export class CategoryService {
  private apiBase: string;

  constructor(apiBase: string) {
    this.apiBase = apiBase;
  }

  async getCategories(): Promise<CategoryType[]> {
    return await $fetch<CategoryType[]>(this.apiBase);
  }
}

export const useCategoryService = () => {
  const config = useRuntimeConfig();
  const API_BASE = `${config.public.urlBackend}/categories`;
  return new CategoryService(API_BASE);
};
