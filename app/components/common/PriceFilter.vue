<template>
  <div class="mb-6">
    <div class="mb-6 pt-6 border-t border-gray-200"></div>
    <!-- Header -->
    <button
      @click="isExpanded = !isExpanded"
      class="w-full flex items-center justify-between mb-3 hover:opacity-70"
    >
      <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        Price
      </h3>
      <span class="text-lg text-gray-600">{{ isExpanded ? '−' : '+' }}</span>
    </button>

    <div v-if="isExpanded">
      <!-- Price Display -->
      <div class="flex justify-between mb-4">
        <span class="text-sm font-semibold text-gray-900">
          $ {{ minPriceValue }}
        </span>
        <span class="text-sm font-semibold text-gray-900">
          $ {{ maxPriceValue }}
        </span>
      </div>

      <!-- Price Range Slider -->
      <input
        v-model.number="minPriceValue"
        type="range"
        @change="emit('filterChange', minPriceValue, maxPriceValue)"
        :min="priceFilter.minPriceRange.value"
        :max="maxPriceValue - 1"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      <input
        v-model.number="maxPriceValue"
        type="range"
        @change="emit('filterChange', minPriceValue, maxPriceValue)"
        :min="minPriceValue + 1"
        :max="priceFilter.maxPriceRange.value"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500 -mt-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { inject } from 'vue';
import { usePriceFilter } from '~/composables/usePriceFilter';

interface Props {
  minPrice: number | undefined;
  maxPrice: number | undefined;
}
const emit = defineEmits<{
  filterChange: [minPrice: number, maxPrice: number];
}>();

const props = defineProps<Props>();

const priceFilter = inject('priceFilter') as ReturnType<typeof usePriceFilter>;

const minPriceValue = ref(props.minPrice || priceFilter.minPriceRange.value);
const maxPriceValue = ref(props.maxPrice || priceFilter.maxPriceRange.value);

const isExpanded = ref(true);
</script>
