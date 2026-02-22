// ==========================================
// Queue Plugin
// ==========================================

export default defineNitroPlugin(() => {
    // Simple in-memory queue
    const queues = new Map<string, unknown[]>()

    const queue = {
        add: (name: string, data: unknown) => {
            if (!queues.has(name)) {
                queues.set(name, [])
            }
            queues.get(name)?.push(data)
            console.log(`[Queue] Added to ${name}`, data)
        },
        process: async (name: string, processor: (data: unknown) => Promise<void>) => {
            const items = queues.get(name) || []
            for (const item of items) {
                try {
                    await processor(item)
                    console.log(`[Queue] Processed item from ${name}`)
                } catch (error) {
                    console.error(`[Queue] Failed to process item`, error)
                }
            }
            queues.set(name, [])
        },
        getSize: (name: string) => queues.get(name)?.length || 0
    }

    // @ts-ignore
    globalThis.$queue = queue
})
