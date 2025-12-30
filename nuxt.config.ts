export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  components: { dirs: ['~/components'] },
  imports: { dirs: ['~/composables', '~/utils'] },
  runtimeConfig: {
    public: {
      urlBackend:
        process.env.NUXT_PUBLIC_URL_BACKEND || 'http://localhost:3001',
    },
  },
});
