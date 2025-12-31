import { ref } from 'vue';

export const usePriceFilter = () => {
  const minPriceRange = ref(0);
  const maxPriceRange = ref(0);

  const setMinMaxRange = (min: number, max: number) => {
    minPriceRange.value = Math.min(min, minPriceRange.value);
    maxPriceRange.value = Math.max(max, maxPriceRange.value);
  };

  return {
    minPriceRange,
    maxPriceRange,
    setMinMaxRange,
  };
};
