<template>
  <div class="mb-6">
    <div class="mb-6 pt-6 border-t border-gray-200"></div>
    <!-- Header với collapse -->
    <button
      @click="isExpanded = !isExpanded"
      class="w-full flex items-center justify-between mb-3 hover:opacity-70"
    >
      <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        Brands
      </h3>
      <span class="text-lg text-gray-600">{{ isExpanded ? '−' : '+' }}</span>
    </button>

    <div v-if="isExpanded">
      <!-- Search Box -->
      <div class="mb-4">
        <div class="relative">
          <input
            v-model="searchBrand"
            type="text"
            placeholder="Search for brands..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <Icon
            name="mdi:magnify"
            class="absolute right-3 top-2.5 text-gray-400 w-4 h-4"
          />
        </div>
      </div>

      <!-- Brands List -->
      <div class="space-y-2 pl-2">
        <div
          v-for="brand in filteredBrands"
          :key="brand.id"
          class="flex items-center justify-between py-1"
        >
          <div class="flex items-center gap-2 flex-1">
            <input
              :id="`brand-${brand.id}`"
              type="checkbox"
              :checked="isSelectedBrand(brand.id)"
              @change="emit('filterChange', Number(brand.id))"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label
              :for="`brand-${brand.id}`"
              class="text-sm text-gray-700 cursor-pointer font-medium"
            >
              {{ brand.name }}
            </label>
          </div>
          <span class="text-xs text-gray-500 ml-2">
            {{ getBrandProductCount(brand.id) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { BrandType } from '~/types/brandType';
import type { ProductType } from '~/types/productType';

interface Props {
  brands: BrandType[];
  products: ProductType[];
  selectedBrands: number[];
}

interface Emits {
  filterChange: [brandId: number];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const searchBrand = ref('');
const isExpanded = ref(true);

const filteredBrands = computed(() => {
  if (!searchBrand.value) {
    return props.brands;
  }
  return props.brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrand.value.toLowerCase())
  );
});

const getBrandProductCount = (brandId: number | string): number => {
  return props.products.filter((product) => product.brandId === Number(brandId))
    .length;
};

const isSelectedBrand = (brandId: number | string): boolean => {
  return props.selectedBrands.includes(Number(brandId));
};
</script>
