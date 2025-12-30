<template>
  <div class="mb-6">
    <div class="mb-6 pt-6 border-t border-gray-200"></div>
    <!-- Header -->
    <button
      @click="isExpanded = !isExpanded"
      class="w-full flex items-center justify-between mb-3 hover:opacity-70"
    >
      <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        Ratings
      </h3>
      <span class="text-lg text-gray-600">{{ isExpanded ? '−' : '+' }}</span>
    </button>

    <div v-if="isExpanded">
      <!-- Ratings List -->
      <div class="space-y-3">
        <div
          v-for="rating in [5, 4, 3, 2, 1]"
          :key="rating"
          class="flex items-center gap-3 cursor-pointer group"
        >
          <input
            :id="`rating-${rating}`"
            type="radio"
            :checked="isSelectedRating(rating)"
            @change="emit('filterChange', rating)"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label
            :for="`rating-${rating}`"
            class="flex items-center gap-1 cursor-pointer flex-1"
          >
            <!-- Stars -->
            <div class="flex gap-0.5">
              <Icon
                v-for="i in rating"
                :key="`filled-${i}`"
                name="mdi:star"
                class="w-4 h-4 text-yellow-400"
              />
              <Icon
                v-for="i in 5 - rating"
                :key="`empty-${i}`"
                name="mdi:star-outline"
                class="w-4 h-4 text-gray-300"
              />
            </div>
            <span class="text-xs text-gray-500">{{
              getRatingCount(rating)
            }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ProductType } from '~/types/productType';

interface Props {
  products: ProductType[];
  selectedRating: number | undefined;
}

interface Emits {
  filterChange: [rating: number];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isExpanded = ref(true);

const getRatingCount = (rating: number): number => {
  return props.products.filter((product) => {
    const productRating = Math.round(product.rating);
    return productRating === rating;
  }).length;
};

const isSelectedRating = (rating: number): boolean => {
  if (props.selectedRating === undefined) {
    return false;
  }
  return props.selectedRating === rating;
};
</script>
