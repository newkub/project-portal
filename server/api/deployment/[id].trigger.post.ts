// ==========================================
// Deployment Trigger API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        message: 'Deployment triggered',
        pipelineId: `pipeline-${id}`
    }
})
