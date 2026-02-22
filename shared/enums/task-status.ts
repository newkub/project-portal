// ==========================================
// Task Status Enum
// ==========================================

export enum TaskStatus {
    BACKLOG = 'backlog',
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    BLOCKED = 'blocked',
    DONE = 'done',
    CANCELLED = 'cancelled'
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: 'Backlog',
    [TaskStatus.TODO]: 'To Do',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.REVIEW]: 'Review',
    [TaskStatus.BLOCKED]: 'Blocked',
    [TaskStatus.DONE]: 'Done',
    [TaskStatus.CANCELLED]: 'Cancelled'
}

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: 'bg-gray-100 text-gray-600',
    [TaskStatus.TODO]: 'bg-blue-100 text-blue-800',
    [TaskStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
    [TaskStatus.REVIEW]: 'bg-purple-100 text-purple-800',
    [TaskStatus.BLOCKED]: 'bg-red-100 text-red-800',
    [TaskStatus.DONE]: 'bg-green-100 text-green-800',
    [TaskStatus.CANCELLED]: 'bg-gray-100 text-gray-400'
}
