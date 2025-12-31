<template>
  <div class="mb-6">
    <h3
      class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3"
    >
      Category
    </h3>
    <div class="space-y-1">
      <div v-for="category in categories" :key="category.id">
        <!-- Main Category -->
        <div class="flex items-center justify-between py-1">
          <div class="flex items-center gap-2 flex-1">
            <span
              @click="emit('toggleCategorySelect', category.id)"
              :class="[
                'text-sm cursor-pointer font-semibold',
                selectedCategory === category.id
                  ? 'text-blue-600 hover:underline'
                  : 'text-gray-700',
              ]"
            >
              {{ category.name }}
            </span>
          </div>
          <span class="text-xs text-gray-500 ml-2">
            {{ getCategoryProductCount(category.id) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CategoryType } from '~/types/categoryType';
import type { ProductType } from '~/types/productType';
interface Props {
  categories: CategoryType[];
  products: ProductType[];
  selectedCategory: number | undefined;
}
interface selectedCategoryEmit {
  toggleCategorySelect: [categoryId: number];
}
const props = defineProps<Props>();
const emit = defineEmits<selectedCategoryEmit>();

const getCategoryProductCount = (categoryId: number | string) => {
  return props.products.filter((p) => p.categoryId === Number(categoryId))
    .length;
};
</script>
