// ==========================================
// Event Types
// ==========================================

export interface AppEvent {
    id: string
    type: EventType
    payload: unknown
    timestamp: Date
    source: string
    userId?: string
    sessionId?: string
}

export type EventType =
    | 'user:login'
    | 'user:logout'
    | 'user:created'
    | 'user:updated'
    | 'project:created'
    | 'project:updated'
    | 'project:deleted'
    | 'issue:created'
    | 'issue:updated'
    | 'issue:closed'
    | 'pr:opened'
    | 'pr:merged'
    | 'pr:closed'
    | 'deployment:started'
    | 'deployment:completed'
    | 'deployment:failed'

export interface EventHandler {
    type: EventType
    handler: (event: AppEvent) => void | Promise<void>
    priority?: number
}

export interface EventSubscription {
    id: string
    eventTypes: EventType[]
    callback: (event: AppEvent) => void
    once?: boolean
}
