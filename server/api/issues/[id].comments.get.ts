// ==========================================
// Issue Comments Get API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        issueId: id,
        comments: []
    }
})
