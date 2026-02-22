// ==========================================
// Deployment Status API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        status: 'success',
        message: 'Deployment completed'
    }
})
