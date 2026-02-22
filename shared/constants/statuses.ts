// ==========================================
// Status Constants
// ==========================================

export const STATUSES = {
    // Issue
    ISSUE_OPEN: 'open',
    ISSUE_IN_PROGRESS: 'in_progress',
    ISSUE_REVIEW: 'review',
    ISSUE_CLOSED: 'closed',
    ISSUE_REOPENED: 'reopened',

    // Pull Request
    PR_OPEN: 'open',
    PR_DRAFT: 'draft',
    PR_MERGED: 'merged',
    PR_CLOSED: 'closed',

    // Task
    TASK_BACKLOG: 'backlog',
    TASK_TODO: 'todo',
    TASK_IN_PROGRESS: 'in_progress',
    TASK_REVIEW: 'review',
    TASK_BLOCKED: 'blocked',
    TASK_DONE: 'done',
    TASK_CANCELLED: 'cancelled',

    // Project
    PROJECT_ACTIVE: 'active',
    PROJECT_INACTIVE: 'inactive',
    PROJECT_ARCHIVED: 'archived'
} as const

export const STATUS_LABELS: Record<string, string> = {
    [STATUSES.ISSUE_OPEN]: 'Open',
    [STATUSES.ISSUE_IN_PROGRESS]: 'In Progress',
    [STATUSES.ISSUE_REVIEW]: 'Review',
    [STATUSES.ISSUE_CLOSED]: 'Closed',
    [STATUSES.PR_DRAFT]: 'Draft',
    [STATUSES.PR_MERGED]: 'Merged',
    [STATUSES.TASK_DONE]: 'Done'
}
