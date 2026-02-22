// ==========================================
// Project Schema
// ==========================================

import type { BaseEntitySchema } from './common'

export interface ProjectSchema extends BaseEntitySchema {
    name: string
    slug: string
    description: string
    status: 'active' | 'inactive' | 'archived'
    visibility: 'public' | 'private' | 'internal'
    ownerId: string
    repositoryUrl?: string
    defaultBranch?: string
}

export interface CreateProjectSchema {
    name: string
    slug?: string
    description: string
    visibility: ProjectSchema['visibility']
    repositoryUrl?: string
}

export interface UpdateProjectSchema {
    name?: string
    description?: string
    status?: ProjectSchema['status']
    visibility?: ProjectSchema['visibility']
}

export interface ProjectMemberSchema {
    userId: string
    projectId: string
    role: 'owner' | 'maintainer' | 'developer' | 'reporter'
    joinedAt: string
}
