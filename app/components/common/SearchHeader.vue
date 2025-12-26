<template>
  <header
    class="relative min-h-[400px] overflow-hidden bg-cover bg-center bg-no-repeat p-8"
    style="background-image: url('/cover.c5eecd4b.png')"
  >
    <div class="mx-auto max-w-4xl px-8 relative z-10">
      <!-- Logo -->
      <div class="mb-12 flex items-center gap-2">
        <img src="/logo.png" alt="Algolia" class="h-6 w-6" />
        <span class="text-xl font-medium text-white tracking-wide"
          >algolia</span
        >
      </div>

      <!-- Main Content -->
      <div class="text-center py-16">
        <h1
          class="text-4xl md:text-5xl font-light text-white mb-12 leading-snug drop-shadow-lg"
        >
          Stop looking for an item — find it.
        </h1>

        <!-- Search Bar -->
        <div class="mx-auto max-w-2xl">
          <div
            class="flex items-center bg-white rounded-lg p-6 shadow-xl transition-shadow duration-300 focus-within:shadow-2xl"
          >
            <Search class="flex-shrink-0 mr-4 text-gray-500" :size="20" />
            <input
              type="text"
              placeholder="Product, brand, color..."
              class="flex-1 border-none outline-none text-base text-gray-800 placeholder-gray-400"
              v-model="searchQuery.query"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSearch } from '~/composables/useSearch';
import { Search } from 'lucide-vue-next';

const { searchQuery, results } = useSearch();

watch(
  () => results.value,
  (newResults) => {
    console.log('🔍 SearchHeader - Results updated:', newResults.data);
  }
);
</script>
