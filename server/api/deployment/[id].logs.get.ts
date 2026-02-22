// ==========================================
// Deployment Logs API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        logs: ['Deployment started', 'Building...', 'Tests passed', 'Deployed successfully']
    }
})
