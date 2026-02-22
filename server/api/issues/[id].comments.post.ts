// ==========================================
// Issue Comments Post API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    return {
        issueId: id,
        comment: body,
        createdAt: new Date().toISOString()
    }
})
