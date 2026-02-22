<template>
  <div class="space-y-6">
    <!-- Issue Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Icon 
            :name="getIssueIcon(issue?.type)" 
            :class="getIssueIconColor(issue?.type)"
            class="w-6 h-6"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ issue?.title }}</h1>
            <div class="flex items-center space-x-2 mt-1">
              <span class="font-mono text-xs bg-gray-100 px-2 py-1 rounded">#{{ issue?.id }}</span>
              <span 
                :class="getStatusColor(issue?.status)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ issue?.status }}
              </span>
              <span 
                v-if="issue?.priority === 'high'"
                class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
              >
                high priority
              </span>
              <span class="text-sm text-gray-500">Opened {{ formatDate(issue?.createdAt) }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="editIssue"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Icon name="lucide:edit" class="w-4 h-4 mr-2 inline-block" />
            Edit
          </button>
          <button 
            v-if="issue?.status === 'open'"
            @click="closeIssue"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Icon name="lucide:check" class="w-4 h-4 mr-2 inline-block" />
            Close issue
          </button>
        </div>
      </div>
    </div>

    <!-- Issue Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Description -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Description</h2>
          <p class="text-gray-700">{{ issue?.description }}</p>
          
          <div v-if="issue?.labels?.length" class="flex items-center space-x-2 mt-4">
            <span class="text-sm font-medium text-gray-700">Labels:</span>
            <span 
              v-for="label in issue.labels" 
              :key="label"
              class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
            >
              {{ label }}
            </span>
          </div>
        </div>

        <!-- Comments -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">
            Comments ({{ issue?.comments || 0 }})
          </h2>
          
          <!-- Add Comment -->
          <div class="mb-6">
            <textarea 
              v-model="newComment"
              placeholder="Add a comment..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            <div class="mt-2 flex justify-end">
              <button 
                @click="addComment"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-4">
            <div v-for="comment in comments" :key="comment.id" class="border-b border-gray-200 pb-4 last:border-b-0">
              <div class="flex items-start space-x-3">
                <img :src="comment.authorAvatar" :alt="comment.author" class="w-8 h-8 rounded-full" />
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-gray-900">{{ comment.author }}</span>
                    <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-gray-700 mt-1">{{ comment.content }}</p>
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
          <div v-if="issue?.assignee" class="flex items-center space-x-3">
            <img :src="issue.assigneeAvatar" :alt="issue.assignee" class="w-8 h-8 rounded-full" />
            <span class="text-gray-900">{{ issue.assignee }}</span>
          </div>
          <p v-else class="text-gray-500 text-sm">No one assigned</p>
        </div>

        <!-- Metadata -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Metadata</h3>
          <div class="space-y-3">
            <div>
              <span class="text-sm font-medium text-gray-700">Type:</span>
              <span class="ml-2 text-sm text-gray-900">{{ issue?.type }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Status:</span>
              <span class="ml-2 text-sm text-gray-900">{{ issue?.status }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Author:</span>
              <div class="flex items-center space-x-2 mt-1">
                <img :src="issue?.authorAvatar" :alt="issue?.author" class="w-4 h-4 rounded-full" />
                <span class="text-sm text-gray-900">{{ issue?.author }}</span>
              </div>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Milestone:</span>
              <span class="ml-2 text-sm text-gray-900">{{ issue?.milestone || 'None' }}</span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-700">Updated:</span>
              <span class="ml-2 text-sm text-gray-900">{{ formatDate(issue?.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Actions</h3>
          <div class="space-y-2">
            <button 
              @click="editIssue"
              class="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Icon name="lucide:edit" class="w-4 h-4 mr-2 inline-block" />
              Edit issue
            </button>
            <button 
              v-if="issue?.status === 'open'"
              @click="closeIssue"
              class="w-full px-3 py-2 text-left text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
            >
              <Icon name="lucide:check" class="w-4 h-4 mr-2 inline-block" />
              Close issue
            </button>
            <button 
              v-else
              @click="reopenIssue"
              class="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Icon name="lucide:rotate-ccw" class="w-4 h-4 mr-2 inline-block" />
              Reopen issue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
const route = useRoute();
const issueId = route.params.id;

useHead({
	title: `Issue #${issueId} - Project Portal`,
	meta: [{ name: "description", content: `View and manage issue #${issueId}` }],
});

// State
const loading = ref(true);
const issue = ref<any>(null);
const comments = ref<any[]>([]);
const newComment = ref("");

// Methods
const fetchIssue = async () => {
	try {
		// In a real app, fetch from API
		const response = await $fetch("/api/issues");
		const issues = response.issues;
		issue.value = issues.find((i: any) => i.id === parseInt(issueId as string));

		// Mock comments
		comments.value = [
			{
				id: 1,
				author: "john.doe",
				authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
				content:
					"I think this is related to the navigation component. Let me investigate.",
				createdAt: "2024-12-21T14:30:00Z",
			},
			{
				id: 2,
				author: "jane.smith",
				authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
				content:
					"I can reproduce this on mobile. The hamburger menu is not working properly.",
				createdAt: "2024-12-22T09:15:00Z",
			},
		];
	} catch (error) {
		console.error("Failed to fetch issue:", error);
	} finally {
		loading.value = false;
	}
};

const addComment = () => {
	if (!newComment.value.trim()) return;

	const comment = {
		id: comments.value.length + 1,
		author: "current.user",
		authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
		content: newComment.value,
		createdAt: new Date().toISOString(),
	};

	comments.value.push(comment);
	newComment.value = "";
};

const editIssue = () => {
	navigateTo(`/issues/${issueId}/edit`);
};

const closeIssue = () => {
	if (issue.value) {
		issue.value.status = "closed";
		issue.value.updatedAt = new Date().toISOString();
	}
};

const reopenIssue = () => {
	if (issue.value) {
		issue.value.status = "open";
		issue.value.updatedAt = new Date().toISOString();
	}
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
	fetchIssue();
});
</script>
