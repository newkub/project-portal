// ==========================================
// Database Utilities
// ==========================================

export interface QueryResult<T> {
    rows: T[]
    rowCount: number
}

export async function query<T>(sql: string, params?: unknown[]): Promise<QueryResult<T>> {
    console.log('[DB] Query:', sql, params)
    return { rows: [], rowCount: 0 }
}

export async function transaction<T>(callback: () => Promise<T>): Promise<T> {
    console.log('[DB] Transaction started')
    try {
        const result = await callback()
        console.log('[DB] Transaction committed')
        return result
    } catch (error) {
        console.log('[DB] Transaction rolled back')
        throw error
    }
}

export async function migrate(): Promise<void> {
    console.log('[DB] Running migrations')
}

export async function seed(): Promise<void> {
    console.log('[DB] Seeding database')
}
