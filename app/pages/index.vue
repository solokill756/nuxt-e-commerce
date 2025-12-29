<template>
  <div class="home-page">
    <SearchHeader :searchQuery="searchQuery" :results="productResults" />
    <div v-if="productResults.error">
      <p class="text-red-500 text-center mt-4">
        Error loading products: {{ productResults.error }}
      </p>
    </div>

    <!-- Sort and Filter Section -->
    <div
      v-if="
        !isProductLoading && !isCategoryLoading && productResults.error === ''
      "
      class="flex justify-end gap-4 px-8 py-4 bg-gray-50"
    >
      <!-- Sort Dropdown -->
      <div class="flex items-center gap-2">
        <label for="sort" class="text-sm font-medium text-gray-700"
          >Sort by</label
        >
        <select
          id="sort"
          v-model="sortBy"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <!-- Items Per Page Dropdown -->
      <div class="flex items-center gap-2">
        <label for="pageSize" class="text-sm font-medium text-gray-700"
          >Items per page</label
        >
        <select
          id="pageSize"
          v-model.number="pageSize"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option :value="8">8 hits per page</option>
          <option :value="16">16 hits per page</option>
          <option :value="24">24 hits per page</option>
          <option :value="32">32 hits per page</option>
        </select>
      </div>
    </div>

    <ProductGrid
      v-if="
        !isProductLoading && !isCategoryLoading && productResults.error === ''
      "
      :products="products"
      :categories="categories"
    />
    <Pagination
      v-if="
        !isProductLoading &&
        !isCategoryLoading &&
        productResults.error === '' &&
        totalPages > 1
      "
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage"
    />
    <div
      v-else-if="productResults.error === ''"
      class="flex justify-center items-center min-h-[400px]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SearchHeader from '~/components/common/SearchHeader.vue';
import ProductGrid from '~/components/products/ProductGrid.vue';
import Pagination from '~/components/common/Pagination.vue';
import type { CategoryType } from '~/types/categoryType';
import type { ProductType } from '~/types/productType';
import { useCategory } from '~/composables/useCategory';
import { useSearch } from '~/composables/useSearch';

const products = ref<ProductType[]>([]);
const categories = ref<CategoryType[]>([]);
const currentPage = ref(1);
const pageSize = ref(16);
const sortBy = ref('featured');

const {
  fetchCategories,
  results: categoryResults,
  isLoading: isCategoryLoading,
} = useCategory();

const {
  initializeProducts,
  searchQuery,
  isLoading: isProductLoading,
  results: productResults,
  changePage: changePageComposable,
  totalPages,
  sortProducts,
  changePageSize,
} = useSearch();

const changePage = (page: number) => {
  currentPage.value = page;
  changePageComposable(page);
};

watch(
  () => productResults.value,
  (newResult) => {
    console.log('Search results:', productResults.value.data);
    products.value = newResult.data;
  },
  { deep: true, immediate: true }
);

watch(
  () => categoryResults.value,
  (newResult) => {
    categories.value = newResult.data;
  },
  { deep: true, immediate: true }
);

watch(
  () => pageSize.value,
  () => {
    changePageSize(pageSize.value);
  }
);

watch(
  () => sortBy.value,
  () => {
    sortProducts(sortBy.value);
    currentPage.value = 1;
  }
);

onMounted(async () => {
  await fetchCategories();
  await initializeProducts();
});
</script>

<style scoped lang="postcss">
.home-page {
  @apply min-h-screen bg-white;
}
</style>
