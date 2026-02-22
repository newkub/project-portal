<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const searchQuery = ref('')
const selectedState = ref('open')
const selectedSort = ref('created-desc')
const selectedAuthor = ref('all')
const selectedLabels = ref<string[]>([])

const states = [
  { value: 'open', label: 'เปิด', count: 24 },
  { value: 'closed', label: 'ปิด', count: 156 },
  { value: 'all', label: 'ทั้งหมด', count: 180 }
]

const sortOptions = [
  { value: 'created-desc', label: 'สร้างใหม่ล่าสุด' },
  { value: 'created-asc', label: 'สร้างเก่าที่สุด' },
  { value: 'updated-desc', label: 'อัปเดตล่าสุด' },
  { value: 'comments-desc', label: 'ความคิดเห็นมากที่สุด' }
]

const authors = [
  { value: 'all', label: 'ทุกคน' },
  { value: 'me', label: 'ฉัน' },
  { value: 'john-doe', label: 'John Doe' },
  { value: 'jane-smith', label: 'Jane Smith' },
  { value: 'bob-wilson', label: 'Bob Wilson' }
]

const labels = [
  { value: 'bug', label: 'bug', color: 'bg-red-100 text-red-800' },
  { value: 'enhancement', label: 'enhancement', color: 'bg-green-100 text-green-800' },
  { value: 'documentation', label: 'documentation', color: 'bg-blue-100 text-blue-800' },
  { value: 'good first issue', label: 'good first issue', color: 'bg-purple-100 text-purple-800' },
  { value: 'help wanted', label: 'help wanted', color: 'bg-orange-100 text-orange-800' },
  { value: 'priority: high', label: 'priority: high', color: 'bg-red-100 text-red-800' },
  { value: 'priority: medium', label: 'priority: medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'priority: low', label: 'priority: low', color: 'bg-gray-100 text-gray-800' }
]

const issues = ref([
  {
    id: 1,
    title: 'Fix navigation bug on mobile devices',
    author: { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    state: 'open',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    comments: 8,
    labels: ['bug', 'mobile', 'priority: high'],
    assignees: [
      { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' }
    ],
    milestone: 'v2.0.0',
    reactions: { thumbsUp: 3, thumbsDown: 0, laugh: 1, hooray: 2 }
  },
  {
    id: 2,
    title: 'Add dark mode support to the application',
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    state: 'open',
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-15T09:10:00Z',
    comments: 15,
    labels: ['enhancement', 'ui', 'priority: medium'],
    assignees: [],
    milestone: null,
    reactions: { thumbsUp: 12, thumbsDown: 1, laugh: 0, hooray: 8 }
  },
  {
    id: 3,
    title: 'Improve loading performance for large datasets',
    author: { name: 'Carol Davis', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
    state: 'open',
    createdAt: '2024-01-13T08:20:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    comments: 6,
    labels: ['performance', 'enhancement', 'priority: high'],
    assignees: [
      { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/567890?v=4' },
      { name: 'Mike Brown', avatar: 'https://avatars.githubusercontent.com/u/234567?v=4' }
    ],
    milestone: 'v2.1.0',
    reactions: { thumbsUp: 7, thumbsDown: 0, laugh: 0, hooray: 3 }
  },
  {
    id: 4,
    title: 'Update documentation for new API endpoints',
    author: { name: 'David Lee', avatar: 'https://avatars.githubusercontent.com/u/890123?v=4' },
    state: 'closed',
    createdAt: '2024-01-10T11:15:00Z',
    updatedAt: '2024-01-12T14:45:00Z',
    comments: 4,
    labels: ['documentation'],
    assignees: [
      { name: 'Sarah Wilson', avatar: 'https://avatars.githubusercontent.com/u/456789?v=4' }
    ],
    milestone: 'v2.0.0',
    reactions: { thumbsUp: 2, thumbsDown: 0, laugh: 0, hooray: 1 }
  },
  {
    id: 5,
    title: 'Implement user authentication system',
    author: { name: 'Emma Thompson', avatar: 'https://avatars.githubusercontent.com/u/678901?v=4' },
    state: 'open',
    createdAt: '2024-01-12T09:30:00Z',
    updatedAt: '2024-01-15T13:15:00Z',
    comments: 23,
    labels: ['enhancement', 'security', 'priority: high', 'good first issue'],
    assignees: [
      { name: 'Tom Harris', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' }
    ],
    milestone: 'v2.0.0',
    reactions: { thumbsUp: 18, thumbsDown: 2, laugh: 1, hooray: 15 }
  },
  {
    id: 6,
    title: 'Fix memory leak in async module',
    author: { name: 'Frank Miller', avatar: 'https://avatars.githubusercontent.com/u/012345?v=4' },
    state: 'closed',
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-11T10:30:00Z',
    comments: 12,
    labels: ['bug', 'performance', 'priority: high'],
    assignees: [
      { name: 'Lisa Anderson', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' }
    ],
    milestone: 'v1.9.0',
    reactions: { thumbsUp: 5, thumbsDown: 0, laugh: 0, hooray: 3 }
  }
])

const filteredIssues = computed(() => {
  let filtered = issues.value

  // Filter by state
  if (selectedState.value !== 'all') {
    filtered = filtered.filter(issue => issue.state === selectedState.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(issue => 
      issue.title.toLowerCase().includes(query) ||
      issue.author.name.toLowerCase().includes(query)
    )
  }

  // Filter by author
  if (selectedAuthor.value === 'me') {
    filtered = filtered.filter(issue => issue.author.name === 'Current User')
  } else if (selectedAuthor.value !== 'all') {
    filtered = filtered.filter(issue => issue.author.name === selectedAuthor.value)
  }

  // Filter by labels
  if (selectedLabels.value.length > 0) {
    filtered = filtered.filter(issue => 
      selectedLabels.value.every(label => issue.labels.includes(label))
    )
  }

  // Sort
  filtered.sort((a, b) => {
    switch (selectedSort.value) {
      case 'created-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'created-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'updated-desc':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'comments-desc':
        return b.comments - a.comments
      default:
        return 0
    }
  })

  return filtered
})

const getLabelInfo = (labelValue: string) => {
  return labels.find(l => l.value === labelValue) || { value: labelValue, label: labelValue, color: 'bg-gray-100 text-gray-800' }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'เมื่อวานนี้'
  if (diffDays <= 7) return `${diffDays} วันที่แล้ว`
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`
  return `${Math.floor(diffDays / 365)} ปีที่แล้ว`
}

const toggleLabel = (labelValue: string) => {
  const index = selectedLabels.value.indexOf(labelValue)
  if (index > -1) {
    selectedLabels.value.splice(index, 1)
  } else {
    selectedLabels.value.push(labelValue)
  }
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
            <h1 class="text-2xl font-bold text-gray-900">Issues</h1>
            <div class="flex items-center space-x-1">
              <button
                v-for="state in states"
                :key="state.value"
                @click="selectedState = state.value"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-md',
                  selectedState === state.value
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                ]"
              >
                {{ state.label }}
                <span class="ml-1 bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full text-xs">
                  {{ state.count }}
                </span>
              </button>
            </div>
          </div>
          <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            สร้าง Issue ใหม่
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="mb-6 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหา issues..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
          <i class="i-heroicons-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
        </div>

        <!-- Filters Row -->
        <div class="flex flex-wrap gap-4">
          <!-- Author Filter -->
          <select
            v-model="selectedAuthor"
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option v-for="author in authors" :key="author.value" :value="author.value">
              {{ author.label }}
            </option>
          </select>

          <!-- Sort Filter -->
          <select
            v-model="selectedSort"
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option v-for="sort in sortOptions" :key="sort.value" :value="sort.value">
              {{ sort.label }}
            </option>
          </select>
        </div>

        <!-- Labels Filter -->
        <div class="flex flex-wrap gap-2">
          <span class="text-sm text-gray-600 py-2">ป้ายกำกับ:</span>
          <button
            v-for="label in labels"
            :key="label.value"
            @click="toggleLabel(label.value)"
            :class="[
              'px-3 py-1 text-sm font-medium rounded-full border',
              selectedLabels.includes(label.value)
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ label.label }}
          </button>
        </div>
      </div>

      <!-- Issues List -->
      <div v-if="filteredIssues.length > 0" class="space-y-4">
        <div
          v-for="issue in filteredIssues"
          :key="issue.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
        >
          <div class="flex items-start space-x-4">
            <!-- Issue Status Icon -->
            <div class="mt-1">
              <i
                :class="[
                  issue.state === 'open' ? 'i-heroicons-exclamation-circle text-green-600' : 'i-heroicons-check-circle text-gray-600',
                  'text-xl'
                ]"
              ></i>
            </div>

            <!-- Issue Content -->
            <div class="flex-1 min-w-0">
              <!-- Title and Labels -->
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                    {{ issue.title }}
                  </h3>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="label in issue.labels"
                      :key="label"
                      :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getLabelInfo(label).color]"
                    >
                      {{ getLabelInfo(label).label }}
                    </span>
                    <span v-if="issue.milestone" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <i class="i-heroicons-flag mr-1"></i>
                      {{ issue.milestone }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Meta Information -->
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <img :src="issue.author.avatar" :alt="issue.author.name" class="w-4 h-4 rounded-full">
                    <span>{{ issue.author.name }}</span>
                  </div>
                  <span>เปิดเมื่อ {{ formatDate(issue.createdAt) }}</span>
                  <span v-if="issue.updatedAt !== issue.createdAt">
                    อัปเดตเมื่อ {{ formatDate(issue.updatedAt) }}
                  </span>
                </div>

                <div class="flex items-center space-x-4">
                  <!-- Assignees -->
                  <div v-if="issue.assignees.length > 0" class="flex items-center space-x-1">
                    <img
                      v-for="assignee in issue.assignees.slice(0, 3)"
                      :key="assignee.name"
                      :src="assignee.avatar"
                      :alt="assignee.name"
                      class="w-5 h-5 rounded-full border-2 border-white"
                      :style="{ marginLeft: assignee === issue.assignees[0] ? '0' : '-8px' }"
                    >
                    <span v-if="issue.assignees.length > 3" class="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                      +{{ issue.assignees.length - 3 }}
                    </span>
                  </div>

                  <!-- Comments -->
                  <span v-if="issue.comments > 0" class="flex items-center">
                    <i class="i-heroicons-chat-bubble-left-right mr-1"></i>
                    {{ issue.comments }}
                  </span>

                  <!-- Reactions -->
                  <div v-if="Object.values(issue.reactions).some(r => r > 0)" class="flex items-center space-x-1">
                    <span v-if="issue.reactions.thumbsUp > 0" class="flex items-center text-xs">
                      👍 {{ issue.reactions.thumbsUp }}
                    </span>
                    <span v-if="issue.reactions.hooray > 0" class="flex items-center text-xs">
                      🎉 {{ issue.reactions.hooray }}
                    </span>
                    <span v-if="issue.reactions.laugh > 0" class="flex items-center text-xs">
                      😄 {{ issue.reactions.laugh }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <i class="i-heroicons-exclamation-circle text-gray-400 text-5xl mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบ Issues</h3>
        <p class="text-gray-500 mb-4">ลองปรับเงื่อนไขการค้นหาหรือสร้าง issue ใหม่</p>
        <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
          สร้าง Issue ใหม่
        </button>
      </div>

      <!-- Results Summary -->
      <div v-if="filteredIssues.length > 0" class="mt-8 text-center text-sm text-gray-500">
        แสดง {{ filteredIssues.length }} จาก {{ issues.length }} issues
      </div>
    </main>
  </div>
</template>