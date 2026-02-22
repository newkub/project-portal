export default defineEventHandler(async () => {
  const tasks = [
    {
      id: 1,
      title: 'Implement user authentication',
      description: 'Add login and registration functionality with JWT tokens',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-12-25',
      assignees: ['john', 'jane'],
      labels: ['backend', 'auth'],
      progress: 0,
      createdAt: '2024-12-20T10:00:00Z',
      updatedAt: '2024-12-20T10:00:00Z'
    },
    {
      id: 2,
      title: 'Design system components',
      description: 'Create reusable UI components with proper documentation',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-12-28',
      assignees: ['alice'],
      labels: ['frontend', 'design'],
      progress: 0,
      createdAt: '2024-12-20T11:30:00Z',
      updatedAt: '2024-12-20T11:30:00Z'
    },
    {
      id: 3,
      title: 'API integration',
      description: 'Connect frontend to backend APIs with proper error handling',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-12-24',
      assignees: ['bob', 'charlie'],
      labels: ['frontend', 'backend'],
      progress: 65,
      createdAt: '2024-12-19T14:20:00Z',
      updatedAt: '2024-12-22T16:45:00Z'
    },
    {
      id: 4,
      title: 'Performance optimization',
      description: 'Optimize application performance and reduce bundle size',
      status: 'review',
      priority: 'medium',
      dueDate: '2024-12-26',
      assignees: ['diana'],
      labels: ['performance', 'optimization'],
      progress: 90,
      createdAt: '2024-12-18T09:15:00Z',
      updatedAt: '2024-12-22T13:30:00Z'
    },
    {
      id: 5,
      title: 'Setup project structure',
      description: 'Initialize project with best practices and proper configuration',
      status: 'done',
      priority: 'high',
      dueDate: '2024-12-20',
      assignees: ['team'],
      labels: ['setup', 'configuration'],
      progress: 100,
      createdAt: '2024-12-15T08:00:00Z',
      updatedAt: '2024-12-20T17:00:00Z'
    }
  ];

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const reviewTasks = tasks.filter((t) => t.status === 'review');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return {
    tasks,
    todoTasks,
    inProgressTasks,
    reviewTasks,
    doneTasks,
    stats: {
      total: tasks.length,
      todo: todoTasks.length,
      inProgress: inProgressTasks.length,
      review: reviewTasks.length,
      done: doneTasks.length
    }
  };
});
