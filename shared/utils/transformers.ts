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

export function keysToSnakeCase<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map((item) => keysToSnakeCase(item)) as unknown as T
    }
    if (obj !== null && typeof obj === 'object') {
        const result = {} as Record<string, unknown>
        for (const [key, value] of Object.entries(obj)) {
            result[camelToSnake(key)] = keysToSnakeCase(value)
        }
        return result as T
    }
    return obj
}

export function flattenObject(
    obj: Record<string, unknown>,
    prefix = ''
): Record<string, unknown> {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value as Record<string, unknown>, newKey))
        } else {
            result[newKey] = value
        }
    }
    return result
}

export function unflattenObject(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
        const keys = key.split('.')
        let current = result
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i]!
            if (!(k in current)) {
                current[k] = {}
            }
            current = current[k] as Record<string, unknown>
        }
        const lastKey = keys[keys.length - 1]
        if (lastKey) {
            current[lastKey] = value
        }
    }
    return result
}
