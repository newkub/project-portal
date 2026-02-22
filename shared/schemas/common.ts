// ==========================================
// Common Schemas
// ==========================================

export interface PaginationSchema {
    page: number
    limit: number
}

export interface SortSchema {
    field: string
    order: 'asc' | 'desc'
}

export interface FilterSchema {
    field: string
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith'
    value: string | number | boolean | Date
}

export interface QuerySchema {
    pagination?: PaginationSchema
    sort?: SortSchema[]
    filters?: FilterSchema[]
    search?: string
}

export interface TimestampSchema {
    createdAt: string
    updatedAt: string
}

export interface BaseEntitySchema extends TimestampSchema {
    id: string
}
