// Import types from shared
import type { ApiResponse, CreateUserRequest, Post, User } from '../../shared/types';

// User store - Nuxt 3 composables style
export const useUserStore = () => {
  // State
  const users = useState<User[]>('users', () => []);
  const currentUser = useState<User | null>('currentUser', () => null);
  const loading = useState<boolean>('usersLoading', () => false);
  const error = useState<string | null>('usersError', () => null);

  // Actions
  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<User[]>>('/api/users');
      if (response.success) {
        users.value = response.data;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users';
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (userData: CreateUserRequest) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<User>>('/api/users', {
        method: 'POST',
        body: userData
      });

      if (response.success) {
        users.value.push(response.data);
        return response.data;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create user';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setCurrentUser = (user: User | null) => {
    currentUser.value = user;
  };

  // Getters
  const userCount = computed(() => users.value.length);
  const adminUsers = computed(() => users.value.filter((user: User) => user.role === 'admin'));

  return {
    // State
    users: readonly(users),
    currentUser: readonly(currentUser),
    loading: readonly(loading),
    error: readonly(error),

    // Actions
    fetchUsers,
    createUser,
    setCurrentUser,

    // Getters
    userCount,
    adminUsers
  };
};

// Post store - Nuxt 3 composables style
export const usePostStore = () => {
  // State
  const posts = useState<Post[]>('posts', () => []);
  const loading = useState<boolean>('postsLoading', () => false);
  const error = useState<string | null>('postsError', () => null);
  const filterStatus = useState<string>('postFilterStatus', () => '');

  // Actions
  const fetchPosts = async (status?: string) => {
    loading.value = true;
    error.value = null;

    try {
      const query = status ? { status } : {};
      const response = await $fetch<ApiResponse<Post[]>>('/api/posts', {
        query
      });

      if (response.success) {
        posts.value = response.data;
        filterStatus.value = status || '';
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch posts';
    } finally {
      loading.value = false;
    }
  };

  const filterPosts = (status: string) => {
    void fetchPosts(status);
  };

  const clearFilter = () => {
    filterStatus.value = '';
    void fetchPosts();
  };

  // Getters
  const publishedPosts = computed(() =>
    posts.value.filter((post: Post) => post.status === 'published')
  );
  const draftPosts = computed(() => posts.value.filter((post: Post) => post.status === 'draft'));
  const postCount = computed(() => posts.value.length);
  const publishedCount = computed(() => publishedPosts.value.length);
  const draftCount = computed(() => draftPosts.value.length);

  return {
    // State
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),
    filterStatus: readonly(filterStatus),

    // Actions
    fetchPosts,
    filterPosts,
    clearFilter,

    // Getters
    publishedPosts,
    draftPosts,
    postCount,
    publishedCount,
    draftCount
  };
};
