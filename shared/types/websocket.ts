// ==========================================
// WebSocket Types
// ==========================================

export interface WebSocketMessage {
    id: string
    type: MessageType
    payload: unknown
    timestamp: Date
    channel?: string
    userId?: string
}

export type MessageType =
    | 'connection:established'
    | 'connection:closed'
    | 'connection:error'
    | 'ping'
    | 'pong'
    | 'subscribe'
    | 'unsubscribe'
    | 'broadcast'
    | 'notification'
    | 'typing:start'
    | 'typing:stop'

export interface WebSocketConnection {
    id: string
    userId?: string
    channels: string[]
    connectedAt: Date
    lastPingAt: Date
    isAlive: boolean
}

export interface ChannelSubscription {
    channel: string
    userId: string
    joinedAt: Date
}

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'error'
