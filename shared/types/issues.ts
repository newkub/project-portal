// ==========================================
// Issue Types
// ==========================================

export interface Issue {
    id: string
    number: number
    title: string
    description: string
    status: IssueStatus
    priority: IssuePriority
    type: IssueType
    assignee?: string
    reporter: string
    labels: string[]
    projectId: string
    milestone?: string
    createdAt: Date
    updatedAt: Date
    closedAt?: Date
    estimate?: number
    spent?: number
}

export type IssueStatus = 'open' | 'in_progress' | 'review' | 'closed' | 'reopened'

export type IssuePriority = 'critical' | 'high' | 'medium' | 'low' | 'trivial'

export type IssueType = 'bug' | 'feature' | 'task' | 'improvement' | 'documentation'

export interface IssueComment {
    id: string
    issueId: string
    author: string
    content: string
    createdAt: Date
    updatedAt?: Date
}

export interface IssueAttachment {
    id: string
    issueId: string
    filename: string
    size: number
    mimeType: string
    url: string
    uploadedAt: Date
}
