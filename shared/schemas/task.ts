// ==========================================
// Task Schema
// ==========================================

import type { BaseEntitySchema } from './common'

export interface TaskSchema extends BaseEntitySchema {
    title: string
    description?: string
    status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'blocked' | 'done' | 'cancelled'
    priority: 'urgent' | 'high' | 'medium' | 'low' | 'none'
    assigneeId?: string
    creatorId: string
    projectId: string
    parentId?: string
    dueDate?: string
    estimatedHours?: number
    actualHours?: number
    completedAt?: string
}

export interface CreateTaskSchema {
    title: string
    description?: string
    status?: TaskSchema['status']
    priority?: TaskSchema['priority']
    assigneeId?: string
    projectId: string
    parentId?: string
    dueDate?: string
    estimatedHours?: number
}

export interface UpdateTaskSchema {
    title?: string
    description?: string
    status?: TaskSchema['status']
    priority?: TaskSchema['priority']
    assigneeId?: string | null
    dueDate?: string | null
    estimatedHours?: number
    actualHours?: number
}
