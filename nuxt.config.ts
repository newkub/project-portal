export default defineNuxtConfig({
  // Set compatibility date
  compatibilityDate: '2026-02-23',

  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  // Configure app directory structure
  app: {
    head: {
      title: 'Project Portal',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Project Portal for managing data and services'
        }
      ]
    }
  },

  // Runtime configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: process.env.API_SECRET || 'default-secret',
    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  }
});
