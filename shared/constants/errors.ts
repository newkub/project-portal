// ==========================================
// Error Constants
// ==========================================

export const ERROR_CODES = {
    // Authentication
    AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
    AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
    AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
    AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
    AUTH_FORBIDDEN: 'AUTH_FORBIDDEN',

    // Validation
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    VALIDATION_REQUIRED: 'VALIDATION_REQUIRED',
    VALIDATION_INVALID_FORMAT: 'VALIDATION_INVALID_FORMAT',
    VALIDATION_TOO_SHORT: 'VALIDATION_TOO_SHORT',
    VALIDATION_TOO_LONG: 'VALIDATION_TOO_LONG',

    // Resource
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
    RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',

    // Server
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR'
} as const

export const ERROR_MESSAGES: Record<string, string> = {
    [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Invalid email or password',
    [ERROR_CODES.AUTH_TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',
    [ERROR_CODES.AUTH_UNAUTHORIZED]: 'You are not authorized to access this resource',
    [ERROR_CODES.RESOURCE_NOT_FOUND]: 'The requested resource was not found',
    [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input and try again',
    [ERROR_CODES.INTERNAL_ERROR]: 'An unexpected error occurred. Please try again later.'
}
