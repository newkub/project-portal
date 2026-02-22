// ==========================================
// Team Types
// ==========================================

export interface Team {
    id: string
    name: string
    slug: string
    description?: string
    avatar?: string
    members: TeamMember[]
    projects: string[]
    createdAt: Date
    updatedAt: Date
}

export interface TeamMember {
    userId: string
    teamId: string
    role: TeamRole
    joinedAt: Date
}

export type TeamRole = 'lead' | 'senior' | 'member' | 'guest'

export interface Organization {
    id: string
    name: string
    slug: string
    plan: OrganizationPlan
    settings: OrganizationSettings
    teams: string[]
    createdAt: Date
}

export type OrganizationPlan = 'free' | 'starter' | 'professional' | 'enterprise'

export interface OrganizationSettings {
    allowPublicProjects: boolean
    requireTwoFactor: boolean
    defaultProjectVisibility: 'public' | 'private'
}
