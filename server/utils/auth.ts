// ==========================================
// Auth Utilities
// ==========================================

export function hashPassword(password: string): string {
    // In production, use bcrypt or argon2
    return `hashed_${password}`
}

export function verifyPassword(password: string, hash: string): boolean {
    return hash === `hashed_${password}`
}

export function generateToken(payload: Record<string, unknown>): string {
    // In production, use JWT
    return `token_${JSON.stringify(payload)}`
}

export function verifyToken(token: string): Record<string, unknown> | null {
    try {
        if (token.startsWith('token_')) {
            return JSON.parse(token.slice(6))
        }
        return null
    } catch {
        return null
    }
}

export function hasPermission(userRole: string, requiredPermission: string): boolean {
    const rolePermissions: Record<string, string[]> = {
        admin: ['*'],
        manager: ['project:*', 'issue:*', 'pr:*', 'team:*'],
        developer: ['project:read', 'issue:*', 'pr:*'],
        viewer: ['project:read', 'issue:read', 'pr:read']
    }

    const permissions = rolePermissions[userRole] || []
    return permissions.includes('*') || permissions.includes(requiredPermission)
}
