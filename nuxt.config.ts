export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      urlBackend:
        process.env.NUXT_PUBLIC_URL_BACKEND || 'http://localhost:3001',
    },
  },
});
