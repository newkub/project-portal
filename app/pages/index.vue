<template>
  <div class="space-y-6">
    <!-- Project Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Project Repository</h2>
          <p class="text-gray-600 mt-1">Main codebase and source files</p>
        </div>
        <div class="flex items-center space-x-2">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Icon name="lucide:git-branch" class="w-4 h-4 mr-2 inline-block" />
            main
          </button>
          <button 
            @click="refreshFiles"
            :disabled="loading"
            class="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Icon name="lucide:refresh-cw" :class="{ 'animate-spin': loading }" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Project Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Files</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
          <Icon name="lucide:files" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Directories</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.directories }}</p>
          </div>
          <Icon name="lucide:folder" class="w-8 h-8 text-yellow-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Code Files</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.files }}</p>
          </div>
          <Icon name="lucide:code" class="w-8 h-8 text-green-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Last Updated</p>
            <p class="text-sm font-bold text-gray-900">{{ lastUpdated }}</p>
          </div>
          <Icon name="lucide:clock" class="w-8 h-8 text-gray-500" />
        </div>
      </div>
    </div>

    <!-- File Explorer -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200 px-6 py-3">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Files</h3>
          <div class="flex items-center space-x-2">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search files..."
              class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Icon name="lucide:plus" class="w-4 h-4 mr-1 inline-block" />
              Add file
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="p-8 text-center">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-gray-600">Loading files...</p>
      </div>
      
      <div v-else class="p-6">
        <div class="space-y-1">
          <div v-for="file in filteredFiles" :key="file.path" class="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer group" @click="selectFile(file)">
            <Icon 
              :name="file.type === 'directory' ? 'lucide:folder' : 'lucide:file'" 
              :class="file.type === 'directory' ? 'w-4 h-4 mr-2 text-blue-500' : 'w-4 h-4 mr-2 text-gray-400'"
            />
            <span class="text-sm font-medium flex-1">{{ file.name }}</span>
            <div class="flex items-center space-x-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <span v-if="file.type === 'file' && file.size">{{ formatFileSize(file.size) }}</span>
              <span v-if="file.modified">{{ formatDate(file.modified) }}</span>
              <button 
                @click.stop="viewFile(file)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <Icon name="lucide:eye" class="w-3 h-3" />
              </button>
              <button 
                @click.stop="editFile(file)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <Icon name="lucide:edit" class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Preview -->
    <div v-if="selectedFile" class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200 px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Icon 
              :name="selectedFile.type === 'directory' ? 'lucide:folder' : 'lucide:file'" 
              :class="selectedFile.type === 'directory' ? 'w-4 h-4 text-blue-500' : 'w-4 h-4 text-gray-400'"
            />
            <h3 class="text-lg font-medium text-gray-900">{{ selectedFile.name }}</h3>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="copyFileContent"
              class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon name="lucide:copy" class="w-4 h-4 mr-1 inline-block" />
              Copy
            </button>
            <button 
              @click="downloadFile"
              class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon name="lucide:download" class="w-4 h-4 mr-1 inline-block" />
              Download
            </button>
            <button 
              @click="closePreview"
              class="p-1 text-gray-400 hover:text-gray-600"
            >
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div v-if="selectedFile.type === 'directory'" class="text-center py-8">
          <Icon name="lucide:folder-open" class="w-12 h-12 mx-auto text-blue-500" />
          <p class="mt-2 text-gray-600">Directory: {{ selectedFile.name }}</p>
          <p v-if="selectedFile.children" class="text-sm text-gray-500 mt-1">
            {{ selectedFile.children.length }} items
          </p>
        </div>
        <div v-else class="bg-gray-50 rounded-md p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-500">{{ selectedFile.path }}</span>
            <span v-if="selectedFile.size" class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</span>
          </div>
          <pre class="text-gray-700 text-sm overflow-x-auto whitespace-pre-wrap"><code>{{ selectedFile.content }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
	title: "Code - Project Portal",
	meta: [
		{ name: "description", content: "View and manage project source code" },
	],
});

// State
const loading = ref(false);
const searchQuery = ref("");
const files = ref<any[]>([]);
const selectedFile = ref<any>(null);
const stats = ref({
	total: 0,
	directories: 0,
	files: 0,
});

// Computed
const filteredFiles = computed(() => {
	if (!searchQuery.value) return files.value;
	return files.value.filter(
		(file) =>
			file.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			file.path.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

const lastUpdated = computed(() => {
	if (files.value.length === 0) return "N/A";
	const latestFile = files.value
		.filter((f) => f.modified)
		.sort(
			(a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime(),
		)[0];

	if (!latestFile) return "N/A";
	return formatDate(latestFile.modified);
});

// Methods
const fetchFiles = async () => {
	loading.value = true;
	try {
		const response = await $fetch("/api/files");
		files.value = response.files;
		stats.value = response.stats;
	} catch (error) {
		console.error("Failed to fetch files:", error);
	} finally {
		loading.value = false;
	}
};

const refreshFiles = () => {
	fetchFiles();
};

const selectFile = (file: any) => {
	selectedFile.value = file;
};

const viewFile = (file: any) => {
	selectedFile.value = file;
};

const editFile = (file: any) => {
	// Navigate to edit page or open editor
	console.log("Edit file:", file.path);
};

const copyFileContent = async () => {
	if (selectedFile.value?.content) {
		try {
			await navigator.clipboard.writeText(selectedFile.value.content);
			// Show success message
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	}
};

const downloadFile = () => {
	if (selectedFile.value?.content) {
		const blob = new Blob([selectedFile.value.content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = selectedFile.value.name;
		a.click();
		URL.revokeObjectURL(url);
	}
};

const closePreview = () => {
	selectedFile.value = null;
};

const formatFileSize = (bytes: number) => {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / k ** i).toFixed(1)) + " " + sizes[i];
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
	fetchFiles();
});
</script>
