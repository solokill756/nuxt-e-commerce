import type { BrandType } from '~/types/brandType';

export class BrandService {
  private apiBase: string;

  constructor(apiBase: string) {
    this.apiBase = apiBase;
  }

  async getBrands(): Promise<BrandType[]> {
    return await $fetch<BrandType[]>(this.apiBase);
  }
}

export const useBrandService = () => {
  const config = useRuntimeConfig();
  const API_BASE = `${config.public.urlBackend}/brands`;
  return new BrandService(API_BASE);
};
