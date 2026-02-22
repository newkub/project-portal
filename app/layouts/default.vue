<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-gray-900">Project Portal</h1>
            </div>
          </div>
          
          <!-- Navigation -->
          <nav class="flex space-x-8">
            <NuxtLink
              v-for="tab in tabs"
              :key="tab.name"
              :to="tab.path"
              class="px-3 py-2 text-sm font-medium border-b-2 transition-colors"
              :class="isCurrentTab(tab.path) 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'"
            >
              <Icon :name="tab.icon" class="w-4 h-4 mr-2 inline-block" />
              {{ tab.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const tabs = [
	{ name: "Code", path: "/", icon: "lucide:code" },
	{ name: "Issues", path: "/issues", icon: "lucide:alert-circle" },
	{ name: "Dependencies", path: "/dependencies", icon: "lucide:package" },
	{ name: "Tasks", path: "/tasks", icon: "lucide:check-square" },
];

const isCurrentTab = (path: string) => {
	if (path === "/") {
		return route.path === "/";
	}
	return route.path.startsWith(path);
};
</script>
