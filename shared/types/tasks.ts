// ==========================================
// Task Types
// ==========================================

export interface Task {
    id: string
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    assignee?: string
    creator: string
    projectId: string
    parentId?: string
    subtasks: string[]
    tags: string[]
    dueDate?: Date
    estimatedHours?: number
    actualHours?: number
    createdAt: Date
    updatedAt: Date
    completedAt?: Date
}

export type TaskStatus =
    | 'backlog'
    | 'todo'
    | 'in_progress'
    | 'review'
    | 'blocked'
    | 'done'
    | 'cancelled'

export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low' | 'none'

export interface TaskList {
    id: string
    name: string
    projectId: string
    tasks: string[]
    order: number
}

export interface TimeEntry {
    id: string
    taskId: string
    userId: string
    duration: number
    description?: string
    startedAt: Date
    endedAt?: Date
}
