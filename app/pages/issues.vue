<template>
  <div class="space-y-6">
    <!-- Issues Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Issues</h2>
          <p class="text-gray-600 mt-1">Track bugs, features, and tasks</p>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="createNewIssue"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Icon name="lucide:plus" class="w-4 h-4 mr-2 inline-block" />
            New issue
          </button>
        </div>
      </div>
    </div>

    <!-- Issue Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <p class="text-sm font-medium text-gray-600">Open</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.open }}</p>
          </div>
          <Icon name="lucide:circle" class="w-8 h-8 text-green-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Closed</p>
            <p class="text-2xl font-bold text-gray-600">{{ stats.closed }}</p>
          </div>
          <Icon name="lucide:check-circle" class="w-8 h-8 text-gray-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Bugs</p>
            <p class="text-2xl font-bold text-red-600">{{ bugCount }}</p>
          </div>
          <Icon name="lucide:bug" class="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>

    <!-- Issue Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <label class="text-sm font-medium text-gray-700">Status:</label>
          <select 
            v-model="filterStatus"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <label class="text-sm font-medium text-gray-700">Type:</label>
          <select 
            v-model="filterType"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="bug">bug</option>
            <option value="enhancement">enhancement</option>
            <option value="documentation">documentation</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search issues..."
            class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>
    </div>

    <!-- Issues List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="loading" class="p-8 text-center">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-gray-600">Loading issues...</p>
      </div>
      
      <div v-else-if="filteredIssues.length === 0" class="p-8 text-center">
        <Icon name="lucide:inbox" class="w-12 h-12 mx-auto text-gray-400" />
        <p class="mt-2 text-gray-600">No issues found</p>
      </div>
      
      <div v-else class="divide-y divide-gray-200">
        <div v-for="issue in filteredIssues" :key="issue.id" class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <Icon 
                  :name="getIssueIcon(issue.type)" 
                  :class="getIssueIconColor(issue.type)"
                  class="w-4 h-4"
                />
                <h3 
                  @click="viewIssue(issue.id)"
                  class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                >
                  {{ issue.title }}
                </h3>
                <span 
                  :class="getStatusColor(issue.status)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ issue.status }}
                </span>
                <span 
                  v-if="issue.priority === 'high'"
                  class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
                >
                  high priority
                </span>
              </div>
              <p class="text-gray-600 mt-1">{{ issue.description }}</p>
              <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span class="font-mono text-xs bg-gray-100 px-2 py-1 rounded">#{{ issue.id }}</span>
                <div class="flex items-center space-x-1">
                  <img :src="issue.authorAvatar" :alt="issue.author" class="w-4 h-4 rounded-full" />
                  <span>{{ issue.author }}</span>
                </div>
                <span>{{ formatDate(issue.createdAt) }}</span>
                <div class="flex items-center space-x-1">
                  <Icon name="lucide:message-square" class="w-3 h-3" />
                  <span>{{ issue.comments }}</span>
                </div>
              </div>
              <div v-if="issue.labels?.length" class="flex items-center space-x-2 mt-2">
                <span 
                  v-for="label in issue.labels" 
                  :key="label"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {{ label }}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div v-if="issue.assignee" class="flex items-center space-x-2">
                <img :src="issue.assigneeAvatar" :alt="issue.assignee" class="w-6 h-6 rounded-full" />
                <span class="text-sm text-gray-600">{{ issue.assignee }}</span>
              </div>
              <button 
                @click="editIssue(issue.id)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <Icon name="lucide:edit" class="w-4 h-4" />
              </button>
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
	title: "Issues - Project Portal",
	meta: [{ name: "description", content: "Track and manage project issues" }],
});

// State
const loading = ref(false);
const searchQuery = ref("");
const filterStatus = ref("");
const filterType = ref("");
const issues = ref<any[]>([]);
const stats = ref({
	total: 0,
	open: 0,
	closed: 0,
});

// Computed
const filteredIssues = computed(() => {
	let filtered = issues.value;

	if (searchQuery.value) {
		filtered = filtered.filter(
			(issue) =>
				issue.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				issue.description
					.toLowerCase()
					.includes(searchQuery.value.toLowerCase()),
		);
	}

	if (filterStatus.value) {
		filtered = filtered.filter((issue) => issue.status === filterStatus.value);
	}

	if (filterType.value) {
		filtered = filtered.filter((issue) => issue.type === filterType.value);
	}

	return filtered;
});

const bugCount = computed(() => {
	return issues.value.filter((issue) => issue.type === "bug").length;
});

// Methods
const fetchIssues = async () => {
	loading.value = true;
	try {
		const response = await $fetch("/api/issues");
		issues.value = response.issues;
		stats.value = {
			total: response.total,
			open: response.open,
			closed: response.closed,
		};
	} catch (error) {
		console.error("Failed to fetch issues:", error);
	} finally {
		loading.value = false;
	}
};

const createNewIssue = () => {
	// Navigate to create issue page or open modal
	navigateTo("/issues/new");
};

const viewIssue = (id: number) => {
	// Navigate to issue details page
	navigateTo(`/issues/${id}`);
};

const editIssue = (id: number) => {
	// Navigate to edit issue page
	navigateTo(`/issues/${id}/edit`);
};

const getIssueIcon = (type: string) => {
	switch (type) {
		case "bug":
			return "lucide:bug";
		case "enhancement":
			return "lucide:zap";
		case "documentation":
			return "lucide:file-text";
		default:
			return "lucide:circle";
	}
};

const getIssueIconColor = (type: string) => {
	switch (type) {
		case "bug":
			return "text-red-500";
		case "enhancement":
			return "text-purple-500";
		case "documentation":
			return "text-blue-500";
		default:
			return "text-gray-500";
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "open":
			return "bg-green-100 text-green-800";
		case "closed":
			return "bg-gray-100 text-gray-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 1) return "yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	return date.toLocaleDateString();
};

// Lifecycle
onMounted(() => {
	fetchIssues();
});
</script>
