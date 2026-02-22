// ==========================================
// Project Get API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        name: 'Sample Project',
        status: 'active'
    }
})
