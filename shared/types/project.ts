// ==========================================
// Project Types
// ==========================================

export interface Project {
    id: string
    name: string
    slug: string
    description: string
    status: ProjectStatus
    visibility: ProjectVisibility
    owner: string
    members: ProjectMember[]
    repository?: Repository
    createdAt: Date
    updatedAt: Date
    settings: ProjectSettings
}

export type ProjectStatus = 'active' | 'inactive' | 'archived'

export type ProjectVisibility = 'public' | 'private' | 'internal'

export interface ProjectMember {
    userId: string
    role: ProjectRole
    joinedAt: Date
}

export type ProjectRole = 'owner' | 'maintainer' | 'developer' | 'reporter'

export interface Repository {
    provider: 'github' | 'gitlab' | 'bitbucket'
    url: string
    defaultBranch: string
    cloneUrl: string
    stars: number
    forks: number
    language?: string
}

export interface ProjectSettings {
    allowIssues: boolean
    allowPullRequests: boolean
    allowWiki: boolean
    requireApprovals: number
    mergeStrategy: 'merge' | 'squash' | 'rebase'
}
