<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStorage, useDebounceFn } from '@vueuse/core'

const searchQuery = ref('')
const selectedFilter = ref('all')
const selectedSort = ref('updated')

const filters = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'owned', label: 'ของฉัน' },
  { value: 'member', label: 'สมาชิก' },
  { value: 'archived', label: 'เก็บถาวร' }
]

const sortOptions = [
  { value: 'updated', label: 'อัปเดตล่าสุด' },
  { value: 'created', label: 'สร้างล่าสุด' },
  { value: 'name', label: 'ชื่อ' },
  { value: 'stars', label: 'Stars' }
]

const projects = ref([
  {
    id: 1,
    name: 'rust-packages',
    description: 'Rust packages monorepo with strict best practices and comprehensive tooling',
    language: 'Rust',
    stars: 45,
    forks: 12,
    issues: 8,
    prs: 3,
    visibility: 'public',
    updatedAt: '2024-01-15',
    createdAt: '2023-06-01',
    owner: 'wrikka',
    isOwned: true,
    topics: ['rust', 'monorepo', 'best-practices'],
    status: 'active'
  },
  {
    id: 2,
    name: 'project-web',
    description: 'Modern Nuxt.js web application with TypeScript and UnoCSS',
    language: 'TypeScript',
    stars: 23,
    forks: 8,
    issues: 5,
    prs: 2,
    visibility: 'public',
    updatedAt: '2024-01-14',
    createdAt: '2023-08-15',
    owner: 'wrikka',
    isOwned: true,
    topics: ['nuxt', 'vue', 'typescript'],
    status: 'active'
  },
  {
    id: 3,
    name: 'ai-platform',
    description: 'AI platform services with machine learning capabilities',
    language: 'Python',
    stars: 67,
    forks: 15,
    issues: 12,
    prs: 7,
    visibility: 'private',
    updatedAt: '2024-01-13',
    createdAt: '2023-05-20',
    owner: 'team',
    isOwned: false,
    topics: ['ai', 'python', 'machine-learning'],
    status: 'active'
  },
  {
    id: 4,
    name: 'cli-tools',
    description: 'Command line tools for development productivity',
    language: 'Go',
    stars: 18,
    forks: 4,
    issues: 2,
    prs: 1,
    visibility: 'public',
    updatedAt: '2024-01-12',
    createdAt: '2023-09-10',
    owner: 'wrikka',
    isOwned: true,
    topics: ['go', 'cli', 'tools'],
    status: 'active'
  },
  {
    id: 5,
    name: 'mobile-app',
    description: 'React Native mobile application for iOS and Android',
    language: 'React Native',
    stars: 34,
    forks: 9,
    issues: 6,
    prs: 4,
    visibility: 'public',
    updatedAt: '2024-01-11',
    createdAt: '2023-07-25',
    owner: 'team',
    isOwned: false,
    topics: ['react-native', 'mobile', 'ios', 'android'],
    status: 'active'
  },
  {
    id: 6,
    name: 'design-system',
    description: 'Component library and design system for web applications',
    language: 'TypeScript',
    stars: 89,
    forks: 22,
    issues: 3,
    prs: 5,
    visibility: 'public',
    updatedAt: '2024-01-10',
    createdAt: '2023-04-15',
    owner: 'wrikka',
    isOwned: true,
    topics: ['design-system', 'components', 'ui'],
    status: 'active'
  }
])

const filteredProjects = computed(() => {
  let filtered = projects.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.topics.some(topic => topic.toLowerCase().includes(query))
    )
  }

  // Filter by type
  if (selectedFilter.value === 'owned') {
    filtered = filtered.filter(p => p.isOwned)
  } else if (selectedFilter.value === 'member') {
    filtered = filtered.filter(p => !p.isOwned && p.status === 'active')
  } else if (selectedFilter.value === 'archived') {
    filtered = filtered.filter(p => p.status === 'archived')
  } else if (selectedFilter.value === 'all') {
    filtered = filtered.filter(p => p.status === 'active')
  }

  // Sort
  filtered.sort((a, b) => {
    switch (selectedSort.value) {
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      case 'stars':
        return b.stars - a.stars
      default:
        return 0
    }
  })

  return filtered
})

const getLanguageIcon = (language: string) => {
  const icons: Record<string, string> = {
    'Rust': 'i-simple-icons-rust',
    'TypeScript': 'i-simple-icons-typescript',
    'Python': 'i-simple-icons-python',
    'Go': 'i-simple-icons-go',
    'React Native': 'i-simple-icons-react',
    'JavaScript': 'i-simple-icons-javascript',
    'Vue': 'i-simple-icons-vuedotjs',
    'Nuxt': 'i-simple-icons-nuxtdotjs'
  }
  return icons[language] || 'i-heroicons-code-bracket'
}

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    'Rust': 'text-orange-600',
    'TypeScript': 'text-blue-600',
    'Python': 'text-green-600',
    'Go': 'text-cyan-600',
    'React Native': 'text-purple-600',
    'JavaScript': 'text-yellow-600',
    'Vue': 'text-green-500',
    'Nuxt': 'text-green-600'
  }
  return colors[language] || 'text-gray-600'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const debouncedSearch = useDebounceFn(() => {
  // Search is already reactive through computed
}, 300)

// Watch search query for debouncing
watch(searchQuery, debouncedSearch)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900">โปรเจกต์</h1>
            <span class="text-sm text-gray-500">{{ filteredProjects.length }} โปรเจกต์</span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              สร้างโปรเจกต์ใหม่
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="mb-6 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="ค้นหาโปรเจกต์..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
              <i class="i-heroicons-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
          
          <!-- Filters -->
          <div class="flex gap-2">
            <select
              v-model="selectedFilter"
              class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option v-for="filter in filters" :key="filter.value" :value="filter.value">
                {{ filter.label }}
              </option>
            </select>
            
            <select
              v-model="selectedSort"
              class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option v-for="sort in sortOptions" :key="sort.value" :value="sort.value">
                {{ sort.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-2">
                <i :class="[getLanguageIcon(project.language), getLanguageColor(project.language), 'text-xl']"></i>
                <h3 class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                  {{ project.name }}
                </h3>
              </div>
              <span v-if="project.visibility === 'private'" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <i class="i-heroicons-lock-closed mr-1"></i>
                Private
              </span>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>

            <!-- Topics -->
            <div class="flex flex-wrap gap-1 mb-4">
              <span
                v-for="topic in project.topics"
                :key="topic"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ topic }}
              </span>
            </div>

            <!-- Stats -->
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div class="flex items-center space-x-4">
                <span class="flex items-center">
                  <i class="i-heroicons-star mr-1"></i>
                  {{ project.stars }}
                </span>
                <span class="flex items-center">
                  <i class="i-heroicons-fork mr-1"></i>
                  {{ project.forks }}
                </span>
                <span class="flex items-center">
                  <i class="i-heroicons-exclamation-circle mr-1"></i>
                  {{ project.issues }}
                </span>
                <span class="flex items-center">
                  <i class="i-heroicons-code-bracket mr-1"></i>
                  {{ project.prs }}
                </span>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-500">
                อัปเดต {{ formatDate(project.updatedAt) }}
              </div>
              <button class="text-sm font-medium text-blue-600 hover:text-blue-800">
                ดูรายละเอียด →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <i class="i-heroicons-folder text-gray-400 text-5xl mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบโปรเจกต์</h3>
        <p class="text-gray-500 mb-4">ลองปรับเงื่อนไขการค้นหาหรือสร้างโปรเจกต์ใหม่</p>
        <button class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          สร้างโปรเจกต์ใหม่
        </button>
      </div>
    </main>
  </div>
</template>
