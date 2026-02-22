export default defineEventHandler(async () => {
  const issues = [
    {
      id: 1,
      title: 'Fix navigation responsive issues',
      description:
        'The navigation menu doesn\'t work properly on mobile devices. When screen size is below 768px, the menu items are not accessible.',
      type: 'bug',
      status: 'open',
      priority: 'high',
      author: 'john.doe',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      assignee: 'jane.smith',
      assigneeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
      createdAt: '2024-12-21T10:30:00Z',
      updatedAt: '2024-12-22T15:45:00Z',
      comments: 5,
      labels: ['bug', 'mobile', 'high-priority'],
      milestone: 'v1.2.0'
    },
    {
      id: 2,
      title: 'Add dark mode support',
      description:
        'Users should be able to switch between light and dark themes. The theme preference should be persisted in localStorage.',
      type: 'enhancement',
      status: 'open',
      priority: 'medium',
      author: 'jane.smith',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
      assignee: null,
      assigneeAvatar: null,
      createdAt: '2024-12-15T09:15:00Z',
      updatedAt: '2024-12-20T14:20:00Z',
      comments: 12,
      labels: ['enhancement', 'ui', 'theme'],
      milestone: 'v1.3.0'
    },
    {
      id: 3,
      title: 'Update documentation',
      description:
        'Add API documentation for the new endpoints. Include request/response examples and authentication requirements.',
      type: 'documentation',
      status: 'closed',
      priority: 'low',
      author: 'bob.wilson',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      assignee: 'john.doe',
      assigneeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      createdAt: '2024-12-10T13:45:00Z',
      updatedAt: '2024-12-18T16:30:00Z',
      comments: 3,
      labels: ['documentation', 'api'],
      milestone: 'v1.1.0'
    },
    {
      id: 4,
      title: 'Performance optimization',
      description:
        'Optimize application performance by implementing lazy loading and code splitting for large components.',
      type: 'enhancement',
      status: 'open',
      priority: 'medium',
      author: 'alice.chen',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      assignee: 'diana.kim',
      assigneeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diana',
      createdAt: '2024-12-18T11:20:00Z',
      updatedAt: '2024-12-22T09:10:00Z',
      comments: 8,
      labels: ['enhancement', 'performance'],
      milestone: 'v1.2.0'
    }
  ];

  return {
    issues,
    total: issues.length,
    open: issues.filter((i) => i.status === 'open').length,
    closed: issues.filter((i) => i.status === 'closed').length
  };
});
