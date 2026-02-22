<template>
  <div class="space-y-6">
    <!-- Dependencies Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Dependencies</h2>
          <p class="text-gray-600 mt-1">Manage project dependencies and packages</p>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="updateAllDependencies"
            :disabled="loading"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="lucide:download" class="w-4 h-4 mr-2 inline-block" />
            {{ loading ? 'Updating...' : 'Update all' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Dependency Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
          <Icon name="lucide:package" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Outdated</p>
            <p class="text-2xl font-bold text-orange-600">{{ stats.outdated }}</p>
          </div>
          <Icon name="lucide:alert-triangle" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Vulnerable</p>
            <p class="text-2xl font-bold text-red-600">{{ stats.vulnerable }}</p>
          </div>
          <Icon name="lucide:shield-x" class="w-8 h-8 text-red-500" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Dev</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.dev }}</p>
          </div>
          <Icon name="lucide:tool" class="w-8 h-8 text-gray-500" />
        </div>
      </div>
    </div>

    <!-- Dependencies List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200 px-6 py-3">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Packages</h3>
          <div class="flex items-center space-x-2">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search dependencies..."
              class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <select 
              v-model="filterStatus"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="current">Current</option>
              <option value="outdated">Outdated</option>
              <option value="vulnerable">Vulnerable</option>
            </select>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="p-8 text-center">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-gray-600">Loading dependencies...</p>
      </div>
      
      <div v-else-if="filteredDependencies.length === 0" class="p-8 text-center">
        <Icon name="lucide:inbox" class="w-12 h-12 mx-auto text-gray-400" />
        <p class="mt-2 text-gray-600">No dependencies found</p>
      </div>
      
      <div v-else class="divide-y divide-gray-200">
        <div v-for="dep in filteredDependencies" :key="dep.name" class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <h4 class="text-lg font-medium text-gray-900">{{ dep.name }}</h4>
                <span 
                  :class="getStatusColor(dep.status)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ dep.status }}
                </span>
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {{ dep.type }}
                </span>
              </div>
              <p class="text-gray-600 mt-1">{{ dep.description }}</p>
              <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Version: {{ dep.current }}</span>
                <span v-if="dep.latest">Latest: {{ dep.latest }}</span>
                <span>License: {{ dep.license }}</span>
              </div>
              <div class="flex items-center space-x-2 mt-3">
                <a 
                  v-if="dep.homepage"
                  :href="dep.homepage" 
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Icon name="lucide:home" class="w-3 h-3 mr-1" />
                  Homepage
                </a>
                <a 
                  v-if="dep.repository"
                  :href="dep.repository" 
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Icon name="lucide:github" class="w-3 h-3 mr-1" />
                  Repository
                </a>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                v-if="dep.status === 'outdated'"
                @click="updateDependency(dep.name)"
                class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
              <button 
                @click="viewDependencyDetails(dep)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <Icon name="lucide:external-link" class="w-4 h-4" />
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
	title: "Dependencies - Project Portal",
	meta: [
		{
			name: "description",
			content: "Manage project dependencies and packages",
		},
	],
});

// State
const loading = ref(false);
const searchQuery = ref("");
const filterStatus = ref("");
const dependencies = ref<any[]>([]);
const stats = ref({
	total: 0,
	outdated: 0,
	vulnerable: 0,
	dev: 0,
});

// Computed
const filteredDependencies = computed(() => {
	let filtered = dependencies.value;

	if (searchQuery.value) {
		filtered = filtered.filter(
			(dep) =>
				dep.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				dep.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
		);
	}

	if (filterStatus.value) {
		filtered = filtered.filter((dep) => dep.status === filterStatus.value);
	}

	return filtered;
});

// Methods
const fetchDependencies = async () => {
	loading.value = true;
	try {
		const response = await $fetch("/api/dependencies");
		dependencies.value = response.dependencies;
		stats.value = response.stats;
	} catch (error) {
		console.error("Failed to fetch dependencies:", error);
	} finally {
		loading.value = false;
	}
};

const updateDependency = async (name: string) => {
	try {
		// Mock update - ในอนาคตจะเรียก API จริง
		const dep = dependencies.value.find((d) => d.name === name);
		if (dep) {
			dep.status = "current";
			dep.current = dep.latest;
		}
	} catch (error) {
		console.error("Failed to update dependency:", error);
	}
};

const updateAllDependencies = async () => {
	loading.value = true;
	try {
		// Mock update all - ในอนาจจะเรียก API จริง
		await new Promise((resolve) => setTimeout(resolve, 2000));
		dependencies.value.forEach((dep) => {
			if (dep.status === "outdated") {
				dep.status = "current";
				dep.current = dep.latest;
			}
		});
	} catch (error) {
		console.error("Failed to update all dependencies:", error);
	} finally {
		loading.value = false;
	}
};

const viewDependencyDetails = (dep: any) => {
	// Open details modal or navigate to details page
	console.log("View details for:", dep.name);
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "current":
			return "bg-green-100 text-green-800";
		case "outdated":
			return "bg-orange-100 text-orange-800";
		case "vulnerable":
			return "bg-red-100 text-red-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

// Lifecycle
onMounted(() => {
	fetchDependencies();
});
</script>
