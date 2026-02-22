// ==========================================
// PR Review API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    return {
        id,
        review: body,
        submittedAt: new Date().toISOString()
    }
})
