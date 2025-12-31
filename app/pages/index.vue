<template>
  <div class="home-page">
    <SearchHeader />
    <div v-if="productResults.error">
      <p class="text-red-500 text-center mt-4">
        Error loading products: {{ productResults.error }}
      </p>
    </div>
    <ProductGrid
      v-if="
        !isProductLoading && !isCategoryLoading && productResults.error === ''
      "
      :products="products"
      :categories="categories"
    />
    <div
      v-else-if="productResults.error === ''"
      class="flex justify-center items-center min-h-[400px]"
    >
      <span class="text-gray-500 text-lg">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import SearchHeader from '~/components/common/SearchHeader.vue';
import ProductGrid from '~/components/products/ProductGrid.vue';
import type { CategoryType } from '~/types/categoryType';
import type { ProductType } from '~/types/productType';
import { useCategory } from '~/composables/useCategory';
import { useProduct } from '~/composables/useProduct';

const products = ref<ProductType[]>([]);
const categories = ref<CategoryType[]>([]);
const {
  fetchProducts,
  results: productResults,
  isLoading: isProductLoading,
} = useProduct();
const {
  fetchCategories,
  results: categoryResults,
  isLoading: isCategoryLoading,
} = useCategory();

watch(
  () => productResults.value,
  (newResult) => {
    products.value = newResult.data;
  }
);

watch(
  () => categoryResults.value,
  (newResult) => {
    categories.value = newResult.data;
  }
);

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});
</script>

<style scoped lang="postcss">
.home-page {
  @apply min-h-screen bg-white;
}
</style>
