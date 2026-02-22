// ==========================================
// Cache Utilities
// ==========================================

const memoryCache = new Map<string, { value: unknown; expires: number }>()

export async function getCache<T>(key: string): Promise<T | null> {
    const item = memoryCache.get(key)
    if (item && item.expires > Date.now()) {
        return item.value as T
    }
    memoryCache.delete(key)
    return null
}

export async function setCache(key: string, value: unknown, ttl = 300): Promise<void> {
    memoryCache.set(key, {
        value,
        expires: Date.now() + ttl * 1000
    })
}

export async function deleteCache(key: string): Promise<void> {
    memoryCache.delete(key)
}

export async function clearCache(): Promise<void> {
    memoryCache.clear()
}

export function getCacheStats() {
    return {
        size: memoryCache.size,
        keys: Array.from(memoryCache.keys())
    }
}
