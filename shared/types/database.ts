// ==========================================
// Database Types
// ==========================================

export interface DatabaseConnection {
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl?: boolean
    poolSize?: number
}

export interface QueryOptions {
    select?: string[]
    where?: Record<string, unknown>
    orderBy?: { column: string; direction: 'asc' | 'desc' }
    limit?: number
    offset?: number
    include?: string[]
}

export interface Transaction {
    id: string
    status: 'pending' | 'committed' | 'rolled_back'
    operations: DatabaseOperation[]
    startedAt: Date
    completedAt?: Date
}

export interface DatabaseOperation {
    type: 'insert' | 'update' | 'delete' | 'select'
    table: string
    data?: Record<string, unknown>
    where?: Record<string, unknown>
}

export type DatabaseDriver = 'postgresql' | 'mysql' | 'sqlite' | 'mongodb'

export interface Migration {
    id: string
    name: string
    appliedAt: Date
    checksum: string
}
