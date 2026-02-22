// ==========================================
// Deployment Environment Enum
// ==========================================

export enum DeploymentEnvironment {
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production'
}

export const DEPLOYMENT_ENV_LABELS: Record<DeploymentEnvironment, string> = {
    [DeploymentEnvironment.DEVELOPMENT]: 'Development',
    [DeploymentEnvironment.STAGING]: 'Staging',
    [DeploymentEnvironment.PRODUCTION]: 'Production'
}

export const DEPLOYMENT_ENV_COLORS: Record<DeploymentEnvironment, string> = {
    [DeploymentEnvironment.DEVELOPMENT]: 'bg-gray-100 text-gray-800',
    [DeploymentEnvironment.STAGING]: 'bg-yellow-100 text-yellow-800',
    [DeploymentEnvironment.PRODUCTION]: 'bg-green-100 text-green-800'
}
