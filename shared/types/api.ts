// ==========================================
// API Types
// ==========================================

export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: ApiError
    meta?: ApiMeta
}

export interface ApiError {
    code: string
    message: string
    details?: Record<string, string[]>
}

export interface ApiMeta {
    page: number
    limit: number
    total: number
    totalPages: number
}

export interface ApiRequestConfig {
    headers?: Record<string, string>
    params?: Record<string, string | number | boolean>
    timeout?: number
    retry?: number
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface EndpointDefinition {
    path: string
    method: HttpMethod
    requiresAuth: boolean
    rateLimit?: number
}
