<template>
  <div class="product-grid">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full group"
      >
        <!-- Product Image Container -->
        <div
          class="product-image-container bg-gray-100 h-48 overflow-hidden flex items-center justify-center relative"
        >
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <!-- Product Info -->
        <div class="p-4 flex flex-col flex-grow">
          <!-- Category Badge -->
          <div class="mb-2">
            <span
              class="text-xs font-semibold text-blue-600 uppercase tracking-wider"
            >
              {{ getCategoryName(product.categoryId) }}
            </span>
          </div>

          <!-- Product Name -->
          <h3
            class="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10"
          >
            {{ product.name }}
          </h3>

          <!-- Product Description -->
          <p class="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">
            {{ product.description }}
          </p>

          <!-- Rating -->
          <div class="flex items-center gap-1 mb-3">
            <div class="flex text-yellow-400">
              <Star
                v-for="i in 5"
                :key="i"
                :size="14"
                :fill="
                  i <= Math.round(product.rating) ? 'currentColor' : 'none'
                "
              />
            </div>
            <span class="text-xs text-gray-500"
              >({{ product.reviewCount }})</span
            >
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-lg font-bold text-gray-900">
              ${{ product.price.toFixed(2) }}
            </span>
            <span
              v-if="product.freeShipping"
              class="text-xs text-green-600 font-semibold"
            >
              Free Shipping
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="products.length === 0" class="text-center py-16">
      <p class="text-gray-500 text-lg">No products found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Star } from 'lucide-vue-next';
import type { CategoryType } from '~/types/categoryType';
import type { ProductType } from '~/types/productType';

interface Props {
  products: ProductType[];
  categories?: CategoryType[];
}

const props = defineProps<Props>();
const products = computed(() => props.products);
const categories = computed(() => props.categories || []);

const getCategoryName = (categoryId: number) => {
  return (
    categories.value.find((c) => Number(c.id) === categoryId)?.name || 'Product'
  );
};
</script>

<style scoped lang="postcss">
.product-grid {
  @apply min-h-screen bg-gray-50;
}

.product-card {
  @apply border border-gray-200;
}
</style>
