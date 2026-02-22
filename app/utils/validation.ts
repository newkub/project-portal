// ==========================================
// Validation Utilities
// ==========================================

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const URL_REGEX = /^https?:\/\/.+/

export function isEmail(value: string): boolean {
    return EMAIL_REGEX.test(value)
}

export function isURL(value: string): boolean {
    return URL_REGEX.test(value)
}

export function isRequired(value: unknown): boolean {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return Object.keys(value).length > 0
    return true
}

export function minLength(value: string, min: number): boolean {
    return value.length >= min
}

export function maxLength(value: string, max: number): boolean {
    return value.length <= max
}

export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max
}

export interface ValidationResult {
    valid: boolean
    errors: string[]
}

export function validateEmail(email: string): ValidationResult {
    const errors: string[] = []
    if (!isRequired(email)) {
        errors.push('Email is required')
    } else if (!isEmail(email)) {
        errors.push('Invalid email format')
    }
    return { valid: errors.length === 0, errors }
}
