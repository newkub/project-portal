<template>
  <div class="space-y-6">
    <!-- Task Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <span 
              :class="getPriorityColor(task?.priority)"
              class="px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ task?.priority }}
            </span>
            <span 
              :class="getStatusColor(task?.status)"
              class="px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ task?.status }}
            </span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ task?.title }}</h1>
            <div class="flex items-center space-x-2 mt-1">
              <span class="font-mono text-xs bg-gray-100 px-2 py-1 rounded">#{{ task?.id }}</span>
              <span class="text-sm text-gray-500">Created {{ formatDate(task?.createdAt) }}</span>
              <span class="text-sm text-gray-500">Due {{ task?.dueDate }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="editTask"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Icon name="lucide:edit" class="w-4 h-4 mr-2 inline-block" />
            Edit
          </button>
          <button 
            @click="deleteTask"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Icon name="lucide:trash" class="w-4 h-4 mr-2 inline-block" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Task Progress -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Progress</h2>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Completion</span>
          <span class="text-sm text-gray-900">{{ task?.progress || 0 }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            :style="{ width: `${task?.progress || 0}%` }"
            class="bg-blue-600 h-2 rounded-full transition-all"
          ></div>
        </div>
      </div>
    </div>

    <!-- Task Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Description -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Description</h2>
          <p class="text-gray-700">{{ task?.description }}</p>
          
          <div v-if="task?.labels?.length" class="flex items-center space-x-2 mt-4">
            <span class="text-sm font-medium text-gray-700">Labels:</span>
            <span 
              v-for="label in task.labels" 
              :key="label"
              class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
            >
              {{ label }}
            </span>
          </div>
        </div>

        <!-- Status Updates -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Status Updates</h2>
          
          <!-- Add Update -->
          <div class="mb-6">
            <textarea 
              v-model="newUpdate"
              placeholder="Add a status update..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            <div class="mt-2 flex justify-between items-center">
              <select 
                v-model="newStatus"
                class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Change status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              <button 
                @click="addUpdate"
                :disabled="!newUpdate.trim()"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Update
              </button>
            </div>
          </div>

          <!-- Updates List -->
          <div class="space-y-4">
            <div v-for="update in updates" :key="update.id" class="border-b border-gray-200 pb-4 last:border-b-0">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {{ update.author.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-gray-900">{{ update.author }}</span>
                    <span class="text-sm text-gray-500">{{ formatDate(update.createdAt) }}</span>
                    <span 
                      v-if="update.statusChange"
                      :class="getStatusColor(update.statusChange)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ update.statusChange }}
                    </span>
                  </div>
                  <p class="text-gray-700 mt-1">{{ update.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Assignees -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Assignees</h3>
          <div class="space-y-2">
            <div v-for="assignee in task?.assignees" :key="assignee" class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {{ assignee.charAt(0).toUpperCase() }}
              </div>
              <span class="text-gray-900">{{ assignee }}</span>
            </div>
          </div>
        </div>

        <!-- Metadata -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Details</h3>
          <div class="space-y-3">
            <div>
              <span class="text-sm font-medium text-gray-700">Priority:</span>
              <span class="ml-2 text-sm text-gray-900">{{ task?.priority }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Status:</span>
              <span class="ml-2 text-sm text-gray-900">{{ task?.status }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Due Date:</span>
              <span class="ml-2 text-sm text-gray-900">{{ task?.dueDate }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Created:</span>
              <span class="ml-2 text-sm text-gray-900">{{ formatDate(task?.createdAt) }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Updated:</span>
              <span class="ml-2 text-sm text-gray-900">{{ formatDate(task?.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <button 
              @click="updateProgress(25)"
              class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Icon name="lucide:trending-up" class="w-4 h-4 mr-2 inline-block" />
              Update Progress
            </button>
            <button 
              @click="changeStatus('in-progress')"
              class="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Icon name="lucide:play" class="w-4 h-4 mr-2 inline-block" />
              Start Working
            </button>
            <button 
              @click="changeStatus('review')"
              class="w-full px-3 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
            >
              <Icon name="lucide:eye" class="w-4 h-4 mr-2 inline-block" />
              Ready for Review
            </button>
            <button 
              @click="changeStatus('done')"
              class="w-full px-3 py-2 text-left text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
            >
              <Icon name="lucide:check" class="w-4 h-4 mr-2 inline-block" />
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue/Nuxt imports
import { ref, computed, onMounted, watch } from 'vue'

// VueUse imports
import { 
  useLocalStorage, 
  useClipboard, 
  useDateFormat, 
  useWindowSize, 
  useDocumentVisibility, 
  useIdle 
} from '@vueuse/core'

// SEO Meta
const route = useRoute();
const taskId = route.params.id;

useHead({
	title: `Task #${taskId} - Project Portal`,
	meta: [{ name: "description", content: `View and manage task #${taskId}` }],
});

// State - ใช้ VueUse composables
const loading = ref(true);
const task = ref<any>(null);
const updates = ref<any[]>([]);
const newUpdate = ref("");
const newStatus = ref("");

// ใช้ VueUse useLocalStorage เพื่อเก็บสถานะ
const savedProgress = useLocalStorage(`task-${taskId}-progress`, 0);
const savedStatus = useLocalStorage(`task-${taskId}-status`, '');

// ใช้ VueUse useClipboard สำหรับคัดลอกข้อมูล
const { copy } = useClipboard();

// ใช้ VueUse useDateFormat สำหรับจัดรูปแบบวันที่
const formatDate = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');

// Methods
const fetchTask = async () => {
	try {
		// In a real app, fetch from API
		const response = await $fetch("/api/tasks") as any;
		const allTasks = [
			...response.todoTasks,
			...response.inProgressTasks,
			...response.reviewTasks,
			...response.doneTasks,
		];
		task.value = allTasks.find((t: any) => t.id === parseInt(taskId as string));

		// Mock updates
		updates.value = [
			{
				id: 1,
				author: "john",
				content:
					"Started working on the authentication system. Setting up the basic structure.",
				createdAt: "2024-12-20T10:00:00Z",
				statusChange: "in-progress",
			},
			{
				id: 2,
				author: "john",
				content:
					"Implemented login functionality. Need to add registration form next.",
				createdAt: "2024-12-21T15:30:00Z",
			},
		];
	} catch (error) {
		console.error("Failed to fetch task:", error);
	} finally {
		loading.value = false;
	}
};

const addUpdate = () => {
	if (!newUpdate.value.trim()) return;

	const update = {
		id: updates.value.length + 1,
		author: "current.user",
		content: newUpdate.value,
		createdAt: new Date().toISOString(),
		statusChange: newStatus.value || undefined,
	};

	updates.value.push(update);

	if (newStatus.value && task.value) {
		task.value.status = newStatus.value;
		task.value.updatedAt = new Date().toISOString();
		savedStatus.value = newStatus.value;
	}

	newUpdate.value = "";
	newStatus.value = "";
};

const updateProgress = (progress: number) => {
	if (task.value) {
		task.value.progress = Math.min(100, Math.max(0, progress));
		task.value.updatedAt = new Date().toISOString();
		savedProgress.value = task.value.progress;
	}
};

const changeStatus = (status: string) => {
	if (task.value) {
		task.value.status = status;
		task.value.updatedAt = new Date().toISOString();
		savedStatus.value = status;

		if (status === "done") {
			task.value.progress = 100;
			savedProgress.value = 100;
		}
	}
};

const editTask = () => {
	navigateTo(`/tasks/${taskId}/edit`);
};

const deleteTask = () => {
	if (confirm("Are you sure you want to delete this task?")) {
		navigateTo("/tasks");
	}
};

const copyTaskId = () => {
	copy(`Task #${taskId}`);
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

const getStatusColor = (status: string) => {
	switch (status) {
		case "todo":
			return "bg-gray-100 text-gray-800";
		case "in-progress":
			return "bg-blue-100 text-blue-800";
		case "review":
			return "bg-yellow-100 text-yellow-800";
		case "done":
			return "bg-green-100 text-green-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const formatDateRelative = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 1) return "yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	return date.toLocaleDateString();
};

// ใช้ VueUse useWindowSize สำหรับ responsive behavior
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

// ใช้ VueUse useDocumentVisibility สำหรับ tracking การมองเห็นหน้า
const visibility = useDocumentVisibility();

// ใช้ VueUse useIdle สำหรับ tracking การไม่ได้ใช้งาน
const { idle } = useIdle(5 * 60 * 1000); // 5 minutes

// Lifecycle
onMounted(() => {
	fetchTask();
});

// Watch for visibility changes to refresh data when user returns
watch(visibility, (visible: string) => {
	if (visible === 'visible' && !loading.value) {
		// Refresh data when user returns to the tab
		void fetchTask();
	}
});
</script>
