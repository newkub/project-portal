// ==========================================
// Permission Constants
// ==========================================

export const PERMISSIONS = {
    // Project
    PROJECT_READ: 'project:read',
    PROJECT_WRITE: 'project:write',
    PROJECT_DELETE: 'project:delete',

    // Issue
    ISSUE_READ: 'issue:read',
    ISSUE_WRITE: 'issue:write',
    ISSUE_DELETE: 'issue:delete',

    // Pull Request
    PR_READ: 'pr:read',
    PR_WRITE: 'pr:write',
    PR_MERGE: 'pr:merge',

    // Team
    TEAM_READ: 'team:read',
    TEAM_WRITE: 'team:write',

    // Settings
    SETTINGS_READ: 'settings:read',
    SETTINGS_WRITE: 'settings:write'
} as const

export const ROLE_PERMISSIONS: Record<string, string[]> = {
    admin: Object.values(PERMISSIONS),
    manager: [
        PERMISSIONS.PROJECT_READ,
        PERMISSIONS.PROJECT_WRITE,
        PERMISSIONS.ISSUE_READ,
        PERMISSIONS.ISSUE_WRITE,
        PERMISSIONS.PR_READ,
        PERMISSIONS.PR_WRITE,
        PERMISSIONS.TEAM_READ,
        PERMISSIONS.TEAM_WRITE,
        PERMISSIONS.SETTINGS_READ
    ],
    developer: [
        PERMISSIONS.PROJECT_READ,
        PERMISSIONS.ISSUE_READ,
        PERMISSIONS.ISSUE_WRITE,
        PERMISSIONS.PR_READ,
        PERMISSIONS.PR_WRITE,
        PERMISSIONS.TEAM_READ
    ],
    viewer: [
        PERMISSIONS.PROJECT_READ,
        PERMISSIONS.ISSUE_READ,
        PERMISSIONS.PR_READ,
        PERMISSIONS.TEAM_READ
    ]
}
