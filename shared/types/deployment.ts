// ==========================================
// Deployment Types
// ==========================================

export type DeploymentEnvironment = 'development' | 'staging' | 'production'

export interface Deployment {
    id: string
    projectId: string
    environment: DeploymentEnvironment
    version: string
    status: DeploymentStatus
    startedAt: Date
    completedAt?: Date
    duration?: number
    triggeredBy: string
    commitSha: string
    branch: string
    logs?: string[]
}

export type DeploymentStatus =
    | 'pending'
    | 'building'
    | 'testing'
    | 'deploying'
    | 'success'
    | 'failed'
    | 'rolled_back'

export interface DeploymentConfig {
    environment: DeploymentEnvironment
    autoDeploy: boolean
    requireApproval: boolean
    notifyChannels: string[]
    healthCheckUrl?: string
    rollbackStrategy: 'automatic' | 'manual'
}

export interface BuildArtifact {
    id: string
    name: string
    size: number
    checksum: string
    createdAt: Date
    url: string
}
