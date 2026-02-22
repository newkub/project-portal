// ==========================================
// Config Constants
// ==========================================

export const APP_NAME = 'ProjectHub'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Project Management Platform'

export const DEFAULT_LOCALE = 'th'
export const DEFAULT_THEME = 'system'

export const API_BASE_URL = process.env.API_BASE_URL || '/api'
export const WS_BASE_URL = process.env.WS_BASE_URL || 'ws://localhost:3000'

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
} as const

export const TIMEOUTS = {
    API_REQUEST: 30000,
    WEBSOCKET_PING: 30000,
    SESSION_IDLE: 3600000
} as const

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme',
    LOCALE: 'locale'
} as const
