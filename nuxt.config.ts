// ==========================================
// Nuxt Config
// ==========================================

export default defineNuxtConfig({
    modules: [
        '@unocss/nuxt',
        '@vueuse/nuxt',
        '@nuxt/icon',
    ],
    css: ['~/assets/css/main.css'],
    devtools: { enabled: true },
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2025-02-01',
})