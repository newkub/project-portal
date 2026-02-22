// ==========================================
// Task Time Entry API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    return {
        taskId: id,
        duration: body.duration,
        description: body.description,
        loggedAt: new Date().toISOString()
    }
})
