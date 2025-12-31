<template>
  <div class="flex justify-center items-center gap-2 py-8">
    <!-- Previous Button -->
    <button
      @click="emit('changePage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      &lt;
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-2">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="emit('changePage', page)"
        :class="[
          'px-4 py-2 rounded-md font-medium transition',
          currentPage === page
            ? 'bg-yellow-400 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      @click="emit('changePage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisible: 5,
});

const emit = defineEmits<{
  changePage: [page: number];
}>();

const visiblePages = computed(() => {
  const pages: number[] = [];
  const { currentPage, totalPages, maxVisible } = props;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const half = Math.floor(maxVisible / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisible;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisible + 1;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
});
</script>

<style scoped lang="postcss">
button {
  @apply transition-colors duration-200;
}
</style>
