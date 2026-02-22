// ==========================================
// Issue Delete API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        message: 'Issue deleted successfully'
    }
})
