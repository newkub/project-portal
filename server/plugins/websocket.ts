// ==========================================
// WebSocket Plugin
// ==========================================

export default defineNitroPlugin(() => {
    // Simple WebSocket connection manager
    const connections = new Map<string, WebSocket>()

    const ws = {
        broadcast: (channel: string, message: unknown) => {
            for (const [id, socket] of connections) {
                if (socket.readyState === 1) {
                    socket.send(JSON.stringify({ channel, message }))
                }
            }
            console.log(`[WebSocket] Broadcast to ${channel}`)
        },
        send: (id: string, message: unknown) => {
            const socket = connections.get(id)
            if (socket?.readyState === 1) {
                socket.send(JSON.stringify(message))
            }
        },
        addConnection: (id: string, socket: WebSocket) => {
            connections.set(id, socket)
            console.log(`[WebSocket] Connection added: ${id}`)
        },
        removeConnection: (id: string) => {
            connections.delete(id)
            console.log(`[WebSocket] Connection removed: ${id}`)
        },
        getConnections: () => connections.size
    }

    // @ts-ignore
    globalThis.$ws = ws
})
