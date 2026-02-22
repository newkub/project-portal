// ==========================================
// Transformer Utilities
// ==========================================

export function camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export function kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function camelToSnake(str: string): string {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function keysToCamelCase<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map((item) => keysToCamelCase(item)) as unknown as T
    }
    if (obj !== null && typeof obj === 'object') {
        const result = {} as Record<string, unknown>
        for (const [key, value] of Object.entries(obj)) {
            result[snakeToCamel(key)] = keysToCamelCase(value)
        }
        return result as T
    }
    return obj
}
