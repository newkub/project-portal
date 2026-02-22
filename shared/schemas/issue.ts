// ==========================================
// Issue Schema
// ==========================================

import type { BaseEntitySchema, TimestampSchema } from './common'

export interface IssueSchema extends BaseEntitySchema {
    number: number
    title: string
    description: string
    status: 'open' | 'in_progress' | 'review' | 'closed' | 'reopened'
    priority: 'critical' | 'high' | 'medium' | 'low' | 'trivial'
    type: 'bug' | 'feature' | 'task' | 'improvement' | 'documentation'
    assigneeId?: string
    reporterId: string
    projectId: string
    milestoneId?: string
    labels: string[]
    closedAt?: string
    estimate?: number
    spent?: number
}

export interface CreateIssueSchema {
    title: string
    description: string
    priority: IssueSchema['priority']
    type: IssueSchema['type']
    assigneeId?: string
    labels?: string[]
    estimate?: number
}

export interface UpdateIssueSchema {
    title?: string
    description?: string
    status?: IssueSchema['status']
    priority?: IssueSchema['priority']
    assigneeId?: string | null
    labels?: string[]
    estimate?: number
}

export interface IssueCommentSchema extends BaseEntitySchema {
    issueId: string
    authorId: string
    content: string
}
