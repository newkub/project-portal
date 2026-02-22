// ==========================================
// PR Merge API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        merged: true,
        message: 'Pull request merged successfully'
    }
})
