// ==========================================
// Local Storage Utilities
// ==========================================

export function setStorage(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        console.error('Failed to save to localStorage')
    }
}

export function getStorage<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : defaultValue
    } catch {
        return defaultValue
    }
}

export function removeStorage(key: string): void {
    localStorage.removeItem(key)
}

export function clearStorage(): void {
    localStorage.clear()
}
