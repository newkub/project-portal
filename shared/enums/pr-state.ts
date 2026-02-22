// ==========================================
// PR State Enum
// ==========================================

export enum PullRequestState {
    OPEN = 'open',
    CLOSED = 'closed',
    MERGED = 'merged',
    DRAFT = 'draft'
}

export const PR_STATE_LABELS: Record<PullRequestState, string> = {
    [PullRequestState.OPEN]: 'Open',
    [PullRequestState.CLOSED]: 'Closed',
    [PullRequestState.MERGED]: 'Merged',
    [PullRequestState.DRAFT]: 'Draft'
}

export const PR_STATE_COLORS: Record<PullRequestState, string> = {
    [PullRequestState.OPEN]: 'bg-green-100 text-green-800',
    [PullRequestState.CLOSED]: 'bg-red-100 text-red-800',
    [PullRequestState.MERGED]: 'bg-purple-100 text-purple-800',
    [PullRequestState.DRAFT]: 'bg-gray-100 text-gray-800'
}
