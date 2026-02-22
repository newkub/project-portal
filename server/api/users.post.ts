// Mock data for creating users
let nextUserId = 4;

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);

  // Validate required fields
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required'
    });
  }

  // Create new user
  const newUser = {
    id: nextUserId++,
    name: body.name,
    email: body.email,
    role: body.role || 'user',
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    data: newUser,
    message: 'User created successfully'
  };
});
