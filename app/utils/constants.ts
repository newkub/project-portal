// ==========================================
// App Constants
// ==========================================

export const APP_CONFIG = {
    name: 'ProjectHub',
    version: '1.0.0',
    description: 'Project Management Platform',
    defaultLocale: 'th',
    defaultTheme: 'system'
} as const

export const UI_CONFIG = {
    sidebarWidth: 280,
    headerHeight: 64,
    maxToastCount: 5,
    defaultPageSize: 20,
    paginationOptions: [10, 20, 50, 100]
} as const

export const ANIMATION_CONFIG = {
    duration: {
        fast: 150,
        normal: 300,
        slow: 500
    },
    easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
    }
} as const
