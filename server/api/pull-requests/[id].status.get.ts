// ==========================================
// PR Status API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        status: 'open',
        checks: {
            ci: 'passed',
            review: 'pending'
        }
    }
})
