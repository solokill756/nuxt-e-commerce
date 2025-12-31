<template>
  <div class="mb-6">
    <div class="mb-6 pt-6 border-t border-gray-200"></div>
    <!-- Header -->
    <button
      @click="isExpanded = !isExpanded"
      class="w-full flex items-center justify-between mb-3 hover:opacity-70"
    >
      <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
        Free Shipping
      </h3>
      <span class="text-lg text-gray-600">{{ isExpanded ? '−' : '+' }}</span>
    </button>

    <div v-if="isExpanded">
      <!-- Toggle Switch -->
      <div class="flex items-center justify-between">
        <label for="freeShipping" class="text-sm text-gray-700 cursor-pointer">
          Display only items with free shipping
        </label>
        <div
          class="relative"
          @click="emit('filterChange', !props.isFreeShipping)"
        >
          <input
            id="freeShipping"
            :checked="props.isFreeShipping"
            type="checkbox"
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  isFreeShipping?: boolean;
}
interface Emits {
  filterChange: [isFreeShipping: boolean];
}

const props = withDefaults(defineProps<Props>(), {
  isFreeShipping: false,
});
const emit = defineEmits<Emits>();

const isExpanded = ref(true);
</script>
