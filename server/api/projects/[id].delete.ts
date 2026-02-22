// ==========================================
// Project Delete API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        message: 'Project deleted successfully'
    }
})
