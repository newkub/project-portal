// ==========================================
// Redis Plugin
// ==========================================

export default defineNitroPlugin(() => {
    // Mock Redis interface
    const cache = new Map<string, { value: unknown; expires: number }>()

    const redis = {
        get: async (key: string) => {
            const item = cache.get(key)
            if (item && item.expires > Date.now()) {
                return item.value
            }
            cache.delete(key)
            return null
        },
        set: async (key: string, value: unknown, ttl?: number) => {
            cache.set(key, {
                value,
                expires: ttl ? Date.now() + ttl * 1000 : Infinity
            })
            console.log(`[Redis] SET ${key}`)
        },
        del: async (key: string) => {
            cache.delete(key)
            console.log(`[Redis] DEL ${key}`)
        },
        keys: async (pattern: string) => {
            const regex = new RegExp(pattern.replace('*', '.*'))
            return Array.from(cache.keys()).filter((k) => regex.test(k))
        }
    }

    // @ts-ignore
    globalThis.$redis = redis
})
