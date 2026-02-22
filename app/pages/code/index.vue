<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedTab = ref('repositories')

const repositories = ref([
  {
    id: 1,
    name: 'project-web',
    description: 'Main web application built with Vue 3 and TypeScript',
    owner: { name: 'wrikka', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    language: 'Vue',
    stars: 245,
    forks: 89,
    issues: 12,
    pullRequests: 5,
    lastCommit: {
      hash: 'a1b2c3d',
      message: 'feat: add new dashboard components',
      author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
      time: '2 นาทีที่แล้ว'
    },
    visibility: 'public',
    size: '2.3 MB',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'rust-packages',
    description: 'Collection of Rust packages and libraries',
    owner: { name: 'wrikka', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    language: 'Rust',
    stars: 189,
    forks: 45,
    issues: 8,
    pullRequests: 3,
    lastCommit: {
      hash: 'e4f5g6h',
      message: 'fix: resolve compilation error',
      author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
      time: '1 ชั่วโมงที่แล้ว'
    },
    visibility: 'public',
    size: '5.7 MB',
    updatedAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    name: 'mobile-app',
    description: 'React Native mobile application',
    owner: { name: 'wrikka', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    language: 'React Native',
    stars: 156,
    forks: 67,
    issues: 23,
    pullRequests: 8,
    lastCommit: {
      hash: 'i7j8k9l',
      message: 'feat: implement push notifications',
      author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
      time: '3 ชั่วโมงที่แล้ว'
    },
    visibility: 'private',
    size: '8.9 MB',
    updatedAt: '2024-01-15T07:45:00Z'
  }
])

const recentActivity = ref([
  {
    type: 'commit',
    repository: 'project-web',
    message: 'feat: add new dashboard components',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    time: '2 นาทีที่แล้ว',
    hash: 'a1b2c3d'
  },
  {
    type: 'pull_request',
    repository: 'rust-packages',
    message: 'Fix memory leak in parser',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    time: '30 นาทีที่แล้ว',
    action: 'opened'
  },
  {
    type: 'issue',
    repository: 'mobile-app',
    message: 'Crash on iOS 16',
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
    time: '1 ชั่วโมงที่แล้ว',
    action: 'opened'
  }
])

const filteredRepositories = computed(() => {
  if (!searchQuery.value) return repositories.value
  
  const query = searchQuery.value.toLowerCase()
  return repositories.value.filter(repo => 
    repo.name.toLowerCase().includes(query) ||
    repo.description.toLowerCase().includes(query) ||
    repo.language.toLowerCase().includes(query)
  )
})

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    'Vue': 'bg-green-100 text-green-800',
    'Rust': 'bg-orange-100 text-orange-800',
    'React Native': 'bg-blue-100 text-blue-800',
    'TypeScript': 'bg-blue-100 text-blue-800',
    'JavaScript': 'bg-yellow-100 text-yellow-800'
  }
  return colors[language] || 'bg-gray-100 text-gray-800'
}

const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    commit: 'i-heroicons-document-text',
    pull_request: 'i-heroicons-arrow-path',
    issue: 'i-heroicons-exclamation-circle',
    release: 'i-heroicons-tag'
  }
  return icons[type] || 'i-heroicons-document-text'
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffMinutes = Math.ceil(diffTime / (1000 * 60))
  
  if (diffMinutes < 60) return `${diffMinutes} นาทีที่แล้ว`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`
  return `${Math.floor(diffHours / 24)} วันที่แล้ว`
}

const createRepository = () => {
  console.log('Creating new repository...')
}

const cloneRepository = (repoName: string) => {
  console.log('Cloning repository:', repoName)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Code</h1>
            <p class="text-gray-600 mt-1">จัดการ repositories และดู activity ล่าสุด</p>
          </div>
          <button @click="createRepository" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            <i class="i-heroicons-plus mr-1"></i>
            New Repository
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search -->
      <div class="mb-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search repositories..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
          <i class="i-heroicons-magnifying-glass absolute left-3 top-3.5 text-gray-400"></i>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="flex space-x-8">
          <button
            @click="selectedTab = 'repositories'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              selectedTab === 'repositories'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Repositories
          </button>
          <button
            @click="selectedTab = 'activity'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              selectedTab === 'activity'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Recent Activity
          </button>
        </nav>
      </div>

      <!-- Repositories Tab -->
      <div v-if="selectedTab === 'repositories'">
        <div v-if="filteredRepositories.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="repo in filteredRepositories" :key="repo.id" class="bg-white rounded-lg shadow">
            <div class="p-6">
              <!-- Repository Header -->
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                    {{ repo.owner.name }}/{{ repo.name }}
                  </h3>
                  <p class="text-gray-600 text-sm mt-1">{{ repo.description }}</p>
                </div>
                <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getLanguageColor(repo.language)]">
                  {{ repo.language }}
                </span>
              </div>

              <!-- Repository Stats -->
              <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div class="flex items-center space-x-1">
                  <i class="i-heroicons-star"></i>
                  <span>{{ repo.stars }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <i class="i-heroicons-fork"></i>
                  <span>{{ repo.forks }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <i class="i-heroicons-exclamation-triangle"></i>
                  <span>{{ repo.issues }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <i class="i-heroicons-arrow-path"></i>
                  <span>{{ repo.pullRequests }}</span>
                </div>
              </div>

              <!-- Last Commit -->
              <div class="flex items-center space-x-3 mb-4">
                <img :src="repo.lastCommit.author.avatar" :alt="repo.lastCommit.author.name" class="w-6 h-6 rounded-full">
                <div class="flex-1">
                  <div class="text-sm text-gray-900">{{ repo.lastCommit.message }}</div>
                  <div class="text-xs text-gray-500">
                    {{ repo.lastCommit.author.name }} • {{ repo.lastCommit.time }}
                  </div>
                </div>
              </div>

              <!-- Repository Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{{ repo.visibility }}</span>
                  <span>{{ repo.size }}</span>
                  <span>Updated {{ formatTime(repo.updatedAt) }}</span>
                </div>
                <button
                  @click="cloneRepository(repo.name)"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <i class="i-heroicons-clipboard-document mr-1"></i>
                  Clone
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <i class="i-heroicons-folder text-gray-400 text-5xl mx-auto mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบ repositories</h3>
          <p class="text-gray-600 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหา</p>
          <button
            @click="searchQuery = ''"
            class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
          >
            ล้างการค้นหา
          </button>
        </div>
      </div>

      <!-- Activity Tab -->
      <div v-if="selectedTab === 'activity'">
        <div class="bg-white rounded-lg shadow">
          <div class="divide-y divide-gray-200">
            <div v-for="activity in recentActivity" :key="activity.hash || activity.message" class="p-6">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <i :class="[getActivityIcon(activity.type), 'text-gray-600']"></i>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <img :src="activity.author.avatar" :alt="activity.author.name" class="w-6 h-6 rounded-full">
                    <span class="font-medium text-gray-900">{{ activity.author.name }}</span>
                    <span class="text-gray-500">
                      <span v-if="activity.type === 'commit'">committed to</span>
                      <span v-else-if="activity.type === 'pull_request'">{{ activity.action }} pull request in</span>
                      <span v-else-if="activity.type === 'issue'">{{ activity.action }} issue in</span>
                      <span v-else>updated</span>
                    </span>
                    <span class="font-medium text-blue-600">{{ activity.repository }}</span>
                  </div>
                  <div class="mt-1">
                    <p class="text-sm text-gray-900">{{ activity.message }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>