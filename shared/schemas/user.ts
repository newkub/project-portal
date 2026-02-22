// ==========================================
// User Schema
// ==========================================

import type { BaseEntitySchema } from './common'

export interface UserSchema extends BaseEntitySchema {
    email: string
    name: string
    avatar?: string
    role: 'admin' | 'manager' | 'developer' | 'viewer'
    isActive: boolean
    lastLoginAt?: string
    emailVerified: boolean
}

export interface CreateUserSchema {
    email: string
    name: string
    password: string
    role?: UserSchema['role']
    avatar?: string
}

export interface UpdateUserSchema {
    name?: string
    avatar?: string
    role?: UserSchema['role']
    isActive?: boolean
}

export interface UserPreferencesSchema {
    userId: string
    theme: 'light' | 'dark' | 'system'
    locale: 'th' | 'en'
    notifications: {
        email: boolean
        push: boolean
        desktop: boolean
    }
}

export interface ChangePasswordSchema {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}
