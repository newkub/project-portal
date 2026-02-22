// ==========================================
// Analytics Plugin
// ==========================================

export default defineNitroPlugin(() => {
    // Initialize analytics tracking
    const analytics = {
        track: (event: string, data?: Record<string, unknown>) => {
            // Send to analytics service
            console.log(`[Analytics] ${event}`, data)
        },
        pageView: (path: string) => {
            console.log(`[Analytics] Page view: ${path}`)
        }
    }

    // Make available globally
    // @ts-ignore
    globalThis.$analytics = analytics
})
