// ==========================================
// Auth Login API
// ==========================================

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    return {
        success: true,
        token: 'mock-jwt-token',
        user: {
            id: '1',
            email,
            name: 'John Doe'
        }
    }
})
