// ==========================================
// Pull Request Types
// ==========================================

export interface PullRequest {
    id: string
    number: number
    title: string
    description: string
    status: PullRequestStatus
    state: PullRequestState
    author: string
    sourceBranch: string
    targetBranch: string
    projectId: string
    reviewers: string[]
    approvals: number
    requiredApprovals: number
    createdAt: Date
    updatedAt: Date
    mergedAt?: Date
    closedAt?: Date
    mergeCommitSha?: string
    draft: boolean
}

export type PullRequestStatus =
    | 'open'
    | 'draft'
    | 'under_review'
    | 'approved'
    | 'changes_requested'
    | 'merged'
    | 'closed'

export type PullRequestState = 'open' | 'closed' | 'merged'

export interface PullRequestReview {
    id: string
    pullRequestId: string
    reviewer: string
    state: ReviewState
    comment?: string
    submittedAt: Date
}

export type ReviewState = 'approved' | 'changes_requested' | 'commented'

export interface PullRequestDiff {
    filename: string
    additions: number
    deletions: number
    changes: number
    status: 'added' | 'removed' | 'modified' | 'renamed'
    patch?: string
}
