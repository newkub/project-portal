// ==========================================
// Common Types
// ==========================================

export interface PaginationParams {
    page: number
    limit: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface FilterParams {
    search?: string
    status?: string[]
    dateFrom?: Date
    dateTo?: Date
    tags?: string[]
}

export type ID = string | number

export interface Timestamps {
    createdAt: Date
    updatedAt: Date
}

export interface SoftDelete {
    deletedAt?: Date
    isDeleted: boolean
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived'

export interface SelectOption {
    value: string | number
    label: string
    disabled?: boolean
    icon?: string
}

export type Locale = 'th' | 'en'

export type Theme = 'light' | 'dark' | 'system'
