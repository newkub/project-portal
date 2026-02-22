<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapsed = ref(false)

const navigation = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', href: '/', icon: 'i-heroicons-home', badge: null },
      { name: 'Projects', href: '/projects', icon: 'i-heroicons-folder', badge: '12' },
      { name: 'Issues', href: '/issues', icon: 'i-heroicons-exclamation-circle', badge: '24' },
      { name: 'Pull Requests', href: '/pull-requests', icon: 'i-heroicons-arrow-right-on-rectangle', badge: '8' }
    ]
  },
  {
    title: 'Development',
    items: [
      { name: 'Code', href: '/code', icon: 'i-heroicons-code-bracket', badge: null },
      { name: 'Actions', href: '/actions', icon: 'i-heroicons-bolt', badge: null },
      { name: 'Packages', href: '/packages', icon: 'i-heroicons-cube', badge: null },
      { name: 'Security', href: '/security', icon: 'i-heroicons-shield-check', badge: '3' }
    ]
  },
  {
    title: 'Planning',
    items: [
      { name: 'Milestones', href: '/milestones', icon: 'i-heroicons-flag', badge: null },
      { name: 'Releases', href: '/releases', icon: 'i-heroicons-rocket-launch', badge: '2' },
      { name: 'Discussions', href: '/discussions', icon: 'i-heroicons-chat-bubble-left-right', badge: null },
      { name: 'Wiki', href: '/wiki', icon: 'i-heroicons-book-open', badge: null }
    ]
  },
  {
    title: 'Team',
    items: [
      { name: 'Members', href: '/team', icon: 'i-heroicons-users', badge: null },
      { name: 'Organizations', href: '/organizations', icon: 'i-heroicons-building-office-2', badge: null },
      { name: 'Activity', href: '/activity', icon: 'i-heroicons-chart-bar', badge: null }
    ]
  }
]

const recentProjects = ref([
  { name: 'rust-packages', href: '/projects/1', language: 'Rust', updated: '2 ชั่วโมงที่แล้ว' },
  { name: 'project-web', href: '/projects/2', language: 'TypeScript', updated: '5 ชั่วโมงที่แล้ว' },
  { name: 'ai-platform', href: '/projects/3', language: 'Python', updated: '1 วันที่แล้ว' }
])

const getLanguageIcon = (language: string) => {
  const icons: Record<string, string> = {
    'Rust': 'i-simple-icons-rust text-orange-600',
    'TypeScript': 'i-simple-icons-typescript text-blue-600',
    'Python': 'i-simple-icons-python text-green-600',
    'Go': 'i-simple-icons-go text-cyan-600'
  }
  return icons[language] || 'i-heroicons-code-bracket text-gray-600'
}

const currentPath = computed(() => route.path)

const isActive = (href: string) => {
  if (href === '/') {
    return currentPath.value === href
  }
  return currentPath.value.startsWith(href)
}
</script>

<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div v-if="!isCollapsed" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i class="i-heroicons-cube text-white text-lg"></i>
          </div>
          <span class="text-lg font-bold text-gray-900">ProjectHub</span>
        </div>
        <button
          @click="isCollapsed = !isCollapsed"
          class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
        >
          <i :class="[isCollapsed ? 'i-heroicons-bars-3' : 'i-heroicons-bars-3-center-left', 'text-lg']"></i>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4">
        <div v-for="section in navigation" :key="section.title" class="mb-6">
          <h3 v-if="!isCollapsed" class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {{ section.title }}
          </h3>
          <div class="space-y-1">
            <router-link
              v-for="item in section.items"
              :key="item.name"
              :to="item.href"
              :class="[
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive(item.href)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              ]"
            >
              <i :class="[item.icon, 'mr-3 text-lg flex-shrink-0']"></i>
              <span v-if="!isCollapsed" class="flex-1">{{ item.name }}</span>
              <span
                v-if="!isCollapsed && item.badge"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {{ item.badge }}
              </span>
              <div
                v-if="isCollapsed && item.badge"
                class="absolute right-2 top-2 w-2 h-2 bg-red-500 rounded-full"
              ></div>
            </router-link>
          </div>
        </div>

        <!-- Recent Projects -->
        <div v-if="!isCollapsed" class="border-t border-gray-200 pt-4">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recent Projects
          </h3>
          <div class="space-y-2">
            <router-link
              v-for="project in recentProjects"
              :key="project.name"
              :to="project.href"
              class="group flex items-center px-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              <i :class="[getLanguageIcon(project.language), 'mr-2']"></i>
              <div class="flex-1 min-w-0">
                <p class="font-medium truncate">{{ project.name }}</p>
                <p class="text-xs text-gray-500">{{ project.updated }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200">
        <div v-if="!isCollapsed" class="text-xs text-gray-500">
          <div class="flex items-center justify-between mb-2">
            <span>Storage</span>
            <span>2.3 GB / 10 GB</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5">
            <div class="bg-indigo-600 h-1.5 rounded-full" style="width: 23%"></div>
          </div>
        </div>
        <button
          v-else
          class="w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md flex items-center justify-center"
          title="Storage: 2.3 GB / 10 GB"
        >
          <i class="i-heroicons-chart-bar text-lg"></i>
        </button>
      </div>
    </div>
  </aside>
</template>