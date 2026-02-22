// Mock data for posts
const posts = [
  {
    id: 1,
    title: 'Getting Started with Nuxt 3',
    content: 'Nuxt 3 is a powerful framework for building Vue.js applications...',
    authorId: 1,
    status: 'published',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'TypeScript Best Practices',
    content: 'TypeScript provides static typing for JavaScript applications...',
    authorId: 2,
    status: 'published',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: 3,
    title: 'Modern Web Development',
    content: 'Modern web development involves many tools and frameworks...',
    authorId: 1,
    status: 'draft',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  }
];

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);

  // Filter by status if provided
  let filteredPosts = posts;
  if (query.status) {
    filteredPosts = posts.filter((post) => post.status === query.status);
  }

  return {
    success: true,
    data: filteredPosts,
    total: filteredPosts.length
  };
});
