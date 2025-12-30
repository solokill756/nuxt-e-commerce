<template>
  <div class="filters-sidebar bg-white p-6 rounded-lg sticky top-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-bold text-gray-900">Filters</h2>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        <span>✕</span> Clear filters
      </button>
    </div>
    <div class="mb-6 pt-6 border-t border-gray-200"></div>

    <!-- Category Filter -->
    <CategoryFilter
      :categories="props.categories"
      :products="props.products"
      @filterChange="emitFilters"
      :selectedCategory="selectedCategory"
      @toggleCategorySelect="toggleCategorySelect"
    />
    <BrandFilter
      :brands="brands"
      :products="props.products"
      @filterChange="toggleBrand"
      v-if="!isBrandLoading"
      :selectedBrands="selectedBrands"
    />
    <div
      v-else-if="brandResults.error === ''"
      class="flex justify-center items-center min-h-[400px]"
    >
      <span class="text-gray-500 text-lg">Loading...</span>
    </div>
    <!-- Price Filter -->
    <PriceFilter
      @filterChange="togglePrice"
      :minPrice="minPrice"
      :maxPrice="maxPrice"
    />
    <!-- Free Shipping Filter -->
    <FreeShippingFilter
      @filterChange="toggleFreeShipping"
      :isFreeShipping="freeShipping"
    />
    <!-- Ratings Filter -->
    <RatingsFilter
      :products="props.products"
      :selectedRating="selectedRating"
      @filterChange="toggleRating"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { CategoryType } from '~/types/categoryType';
import type { ProductType } from '~/types/productType';
import type { SearchParams } from '~/types/searchParams';
import CategoryFilter from '~/components/common/CategoryFilter.vue';
import type { BrandType } from '~/types/brandType';
import { useBrand } from '~/composables/useBrand';
import BrandFilter from '~/components/common/BrandFilter.vue';
import PriceFilter from '~/components/common/PriceFilter.vue';
import FreeShippingFilter from '~/components/common/FreeShippingFilter.vue';
import RatingsFilter from '~/components/common/RatingsFilter.vue';
interface Props {
  categories: CategoryType[];
  products: ProductType[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  filterChange: [filters: SearchParams];
}>();

const selectedCategory = ref<number>();
const selectedRating = ref<number>();
const brands = ref<BrandType[]>([]);
const selectedBrands = ref<number[]>([]);
const freeShipping = ref<boolean>(false);
const maxPrice = ref<number>();
const minPrice = ref<number>();

const {
  fetchBrands,
  results: brandResults,
  isLoading: isBrandLoading,
} = useBrand();

const hasActiveFilters = computed(() => {
  return (
    selectedCategory.value !== undefined ||
    selectedRating.value !== undefined ||
    freeShipping.value ||
    selectedBrands.value.length > 0
  );
});

const toggleCategorySelect = (categoryId: number) => {
  if (selectedCategory.value === categoryId) {
    selectedCategory.value = undefined;
  } else {
    selectedCategory.value = categoryId;
  }
  emitFilters();
};

const toggleBrand = (brandId: number) => {
  const index = selectedBrands.value.indexOf(brandId);
  if (index > -1) {
    selectedBrands.value.splice(index, 1);
  } else {
    selectedBrands.value.push(brandId);
  }
  emitFilters();
};

const toggleRating = (rating: number) => {
  console.log('Toggling rating:', rating);
  if (selectedRating.value === rating) {
    selectedRating.value = undefined;
  } else {
    selectedRating.value = rating;
  }
  emitFilters();
};

const togglePrice = (minPriceValue: number, maxPriceValue: number) => {
  minPrice.value = minPriceValue;
  maxPrice.value = maxPriceValue;
  emitFilters();
};

const toggleFreeShipping = (isFreeShipping: boolean) => {
  freeShipping.value = isFreeShipping;
  emitFilters();
};

const clearFilters = () => {
  selectedCategory.value = undefined;
  selectedRating.value = undefined;
  freeShipping.value = false;
  selectedBrands.value = [];
  emitFilters();
};

const emitFilters = () => {
  emit('filterChange', {
    query: '',
    categoryId: selectedCategory.value,
    freeShipping: freeShipping.value,
    rating: selectedRating.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    brandIds: selectedBrands.value,
  });
};

watch(
  () => brandResults.value,
  (newResult) => {
    brands.value = newResult.data;
  },
  { deep: true, immediate: true }
);

onMounted(async () => {
  await fetchBrands();
});
</script>

<style scoped lang="postcss">
.filters-sidebar {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
