// ==========================================
// Issue Type Enum
// ==========================================

export enum IssueType {
    BUG = 'bug',
    FEATURE = 'feature',
    TASK = 'task',
    IMPROVEMENT = 'improvement',
    DOCUMENTATION = 'documentation'
}

export const ISSUE_TYPE_LABELS: Record<IssueType, string> = {
    [IssueType.BUG]: 'Bug',
    [IssueType.FEATURE]: 'Feature',
    [IssueType.TASK]: 'Task',
    [IssueType.IMPROVEMENT]: 'Improvement',
    [IssueType.DOCUMENTATION]: 'Documentation'
}

export const ISSUE_TYPE_COLORS: Record<IssueType, string> = {
    [IssueType.BUG]: 'bg-red-100 text-red-800',
    [IssueType.FEATURE]: 'bg-blue-100 text-blue-800',
    [IssueType.TASK]: 'bg-green-100 text-green-800',
    [IssueType.IMPROVEMENT]: 'bg-purple-100 text-purple-800',
    [IssueType.DOCUMENTATION]: 'bg-gray-100 text-gray-800'
}
