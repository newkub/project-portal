// ==========================================
// Authentication Types
// ==========================================

export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    role: UserRole
    permissions: Permission[]
    createdAt: Date
    updatedAt: Date
}

export type UserRole = 'admin' | 'manager' | 'developer' | 'viewer'

export type Permission =
    | 'project:read'
    | 'project:write'
    | 'project:delete'
    | 'issue:read'
    | 'issue:write'
    | 'issue:delete'
    | 'pr:read'
    | 'pr:write'
    | 'pr:merge'
    | 'team:read'
    | 'team:write'
    | 'settings:read'
    | 'settings:write'

export interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
}

export interface LoginCredentials {
    email: string
    password: string
    rememberMe?: boolean
}

export interface RegisterData {
    email: string
    password: string
    name: string
}

export interface TokenPayload {
    sub: string
    email: string
    role: UserRole
    iat: number
    exp: number
}
