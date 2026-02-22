<template>
  <div class="space-y-6">
    <!-- Tasks Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Tasks</h2>
          <p class="text-gray-600 mt-1">Manage project tasks and milestones</p>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="createNewTask"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Icon name="lucide:plus" class="w-4 h-4 mr-2 inline-block" />
            New task
          </button>
        </div>
      </div>
    </div>

    <!-- Task Stats -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
          <Icon name="lucide:layers" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">To Do</p>
            <p class="text-2xl font-bold text-gray-600">{{ stats.todo }}</p>
          </div>
          <Icon name="lucide:circle" class="w-8 h-8 text-gray-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">In Progress</p>
            <p class="text-2xl font-bold text-blue-600">{{ stats.inProgress }}</p>
          </div>
          <Icon name="lucide:play-circle" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Review</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats.review }}</p>
          </div>
          <Icon name="lucide:eye" class="w-8 h-8 text-yellow-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Done</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.done }}</p>
          </div>
          <Icon name="lucide:check-circle" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>

    <!-- Task Board -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">Project Board</h3>
        <div class="flex items-center space-x-2">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search tasks..."
            class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button 
            @click="refreshTasks"
            :disabled="loading"
            class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Icon name="lucide:refresh-cw" :class="{ 'animate-spin': loading }" class="w-4 h-4 mr-1 inline-block" />
            Refresh
          </button>
        </div>
      </div>

      <div v-if="loading" class="p-8 text-center">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-gray-600">Loading tasks...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Todo Column -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900">To Do</h4>
            <span class="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
              {{ filteredTodoTasks.length }}
            </span>
          </div>
          <div class="space-y-2">
            <div v-for="task in filteredTodoTasks" :key="task.id" class="bg-white p-3 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-start justify-between">
                <div class="flex-1" @click="viewTask(task.id)">
                  <h5 class="font-medium text-gray-900 text-sm">{{ task.title }}</h5>
                  <p class="text-gray-600 text-xs mt-1">{{ task.description }}</p>
                  <div class="flex items-center space-x-2 mt-2">
                    <span 
                      :class="getPriorityColor(task.priority)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ task.priority }}
                    </span>
                    <span class="text-xs text-gray-500">{{ task.dueDate }}</span>
                  </div>
                  <div v-if="task.labels?.length" class="flex items-center space-x-1 mt-2">
                    <span 
                      v-for="label in task.labels" 
                      :key="label"
                      class="px-1 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {{ label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex -space-x-2">
                  <div v-for="assignee in task.assignees" :key="assignee" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    {{ assignee.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <button 
                  @click.stop="editTask(task.id)"
                  class="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="lucide:more-horizontal" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- In Progress Column -->
        <div class="bg-blue-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900">In Progress</h4>
            <span class="bg-blue-200 text-blue-700 px-2 py-1 text-xs rounded-full">
              {{ filteredInProgressTasks.length }}
            </span>
          </div>
          <div class="space-y-2">
            <div v-for="task in filteredInProgressTasks" :key="task.id" class="bg-white p-3 rounded-md shadow-sm border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-start justify-between">
                <div class="flex-1" @click="viewTask(task.id)">
                  <h5 class="font-medium text-gray-900 text-sm">{{ task.title }}</h5>
                  <p class="text-gray-600 text-xs mt-1">{{ task.description }}</p>
                  <div class="flex items-center space-x-2 mt-2">
                    <span 
                      :class="getPriorityColor(task.priority)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ task.priority }}
                    </span>
                    <span class="text-xs text-gray-500">{{ task.dueDate }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      :style="{ width: `${task.progress}%` }"
                      class="bg-blue-600 h-1.5 rounded-full transition-all"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500 mt-1">{{ task.progress }}%</span>
                  <div v-if="task.labels?.length" class="flex items-center space-x-1 mt-2">
                    <span 
                      v-for="label in task.labels" 
                      :key="label"
                      class="px-1 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {{ label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex -space-x-2">
                  <div v-for="assignee in task.assignees" :key="assignee" class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    {{ assignee.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <button 
                  @click.stop="editTask(task.id)"
                  class="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="lucide:more-horizontal" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Review Column -->
        <div class="bg-yellow-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900">Review</h4>
            <span class="bg-yellow-200 text-yellow-700 px-2 py-1 text-xs rounded-full">
              {{ filteredReviewTasks.length }}
            </span>
          </div>
          <div class="space-y-2">
            <div v-for="task in filteredReviewTasks" :key="task.id" class="bg-white p-3 rounded-md shadow-sm border border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-start justify-between">
                <div class="flex-1" @click="viewTask(task.id)">
                  <h5 class="font-medium text-gray-900 text-sm">{{ task.title }}</h5>
                  <p class="text-gray-600 text-xs mt-1">{{ task.description }}</p>
                  <div class="flex items-center space-x-2 mt-2">
                    <span 
                      :class="getPriorityColor(task.priority)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ task.priority }}
                    </span>
                    <span class="text-xs text-gray-500">{{ task.dueDate }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      :style="{ width: `${task.progress}%` }"
                      class="bg-yellow-600 h-1.5 rounded-full transition-all"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500 mt-1">{{ task.progress }}%</span>
                  <div v-if="task.labels?.length" class="flex items-center space-x-1 mt-2">
                    <span 
                      v-for="label in task.labels" 
                      :key="label"
                      class="px-1 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {{ label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex -space-x-2">
                  <div v-for="assignee in task.assignees" :key="assignee" class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    {{ assignee.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <button 
                  @click.stop="editTask(task.id)"
                  class="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Icon name="lucide:more-horizontal" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Done Column -->
        <div class="bg-green-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900">Done</h4>
            <span class="bg-green-200 text-green-700 px-2 py-1 text-xs rounded-full">
              {{ filteredDoneTasks.length }}
            </span>
          </div>
          <div class="space-y-2">
            <div v-for="task in filteredDoneTasks" :key="task.id" class="bg-white p-3 rounded-md shadow-sm border border-green-200 opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
              <div class="flex items-start justify-between">
                <div class="flex-1" @click="viewTask(task.id)">
                  <h5 class="font-medium text-gray-900 text-sm line-through">{{ task.title }}</h5>
                  <p class="text-gray-600 text-xs mt-1">{{ task.description }}</p>
                  <div class="flex items-center space-x-2 mt-2">
                    <span 
                      :class="getPriorityColor(task.priority)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ task.priority }}
                    </span>
                    <span class="text-xs text-gray-500">{{ task.dueDate }}</span>
                  </div>
                  <div v-if="task.labels?.length" class="flex items-center space-x-1 mt-2">
                    <span 
                      v-for="label in task.labels" 
                      :key="label"
                      class="px-1 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {{ label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex -space-x-2">
                  <div v-for="assignee in task.assignees" :key="assignee" class="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    {{ assignee.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
	title: "Tasks - Project Portal",
	meta: [
		{ name: "description", content: "Manage project tasks and milestones" },
	],
});

// State
const loading = ref(false);
const searchQuery = ref("");
const todoTasks = ref<any[]>([]);
const inProgressTasks = ref<any[]>([]);
const reviewTasks = ref<any[]>([]);
const doneTasks = ref<any[]>([]);
const stats = ref({
	total: 0,
	todo: 0,
	inProgress: 0,
	review: 0,
	done: 0,
});

// Computed
const filteredTodoTasks = computed(() => {
	if (!searchQuery.value) return todoTasks.value;
	return todoTasks.value.filter(
		(task) =>
			task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			task.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

const filteredInProgressTasks = computed(() => {
	if (!searchQuery.value) return inProgressTasks.value;
	return inProgressTasks.value.filter(
		(task) =>
			task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			task.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

const filteredReviewTasks = computed(() => {
	if (!searchQuery.value) return reviewTasks.value;
	return reviewTasks.value.filter(
		(task) =>
			task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			task.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

const filteredDoneTasks = computed(() => {
	if (!searchQuery.value) return doneTasks.value;
	return doneTasks.value.filter(
		(task) =>
			task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			task.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

// Methods
const fetchTasks = async () => {
	loading.value = true;
	try {
		const response = await $fetch("/api/tasks");
		todoTasks.value = response.todoTasks;
		inProgressTasks.value = response.inProgressTasks;
		reviewTasks.value = response.reviewTasks;
		doneTasks.value = response.doneTasks;
		stats.value = response.stats;
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
	} finally {
		loading.value = false;
	}
};

const refreshTasks = () => {
	fetchTasks();
};

const createNewTask = () => {
	// Navigate to create task page or open modal
	navigateTo("/tasks/new");
};

const viewTask = (id: number) => {
	// Navigate to task details page
	navigateTo(`/tasks/${id}`);
};

const editTask = (id: number) => {
	// Navigate to edit task page
	navigateTo(`/tasks/${id}/edit`);
};

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "high":
			return "bg-red-100 text-red-800";
		case "medium":
			return "bg-yellow-100 text-yellow-800";
		case "low":
			return "bg-green-100 text-green-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

// Lifecycle
onMounted(() => {
	fetchTasks();
});
</script>
