// ==========================================
// Task Get API
// ==========================================

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    return {
        id,
        title: 'Sample Task',
        status: 'todo'
    }
})
