// ==========================================
// User Role Enum
// ==========================================

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    DEVELOPER = 'developer',
    VIEWER = 'viewer'
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Admin',
    [UserRole.MANAGER]: 'Manager',
    [UserRole.DEVELOPER]: 'Developer',
    [UserRole.VIEWER]: 'Viewer'
}

export const USER_ROLE_COLORS: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'bg-red-100 text-red-800',
    [UserRole.MANAGER]: 'bg-blue-100 text-blue-800',
    [UserRole.DEVELOPER]: 'bg-green-100 text-green-800',
    [UserRole.VIEWER]: 'bg-gray-100 text-gray-800'
}

export const USER_ROLE_PERMISSIONS = {
    [UserRole.ADMIN]: ['*'],
    [UserRole.MANAGER]: ['project:*', 'issue:*', 'pr:*', 'team:*', 'settings:read'],
    [UserRole.DEVELOPER]: ['project:read', 'issue:*', 'pr:*', 'team:read'],
    [UserRole.VIEWER]: ['project:read', 'issue:read', 'pr:read', 'team:read']
}
