<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedBranch = ref('main')
const currentView = ref('list') // 'list', 'graph'

const branches = ref([
  { name: 'main', current: true },
  { name: 'develop', current: false },
  { name: 'feature/auth', current: false },
  { name: 'feature/dashboard', current: false }
])

const commits = ref([
  {
    hash: 'a1b2c3d',
    message: 'feat: add new feature to dashboard',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '2 นาทีที่แล้ว',
    branch: 'main',
    additions: 245,
    deletions: 89,
    filesChanged: 5,
    parents: ['e4f5g6h']
  },
  {
    hash: 'e4f5g6h',
    message: 'fix: resolve bug in authentication',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    time: '1 ชั่วโมงที่แล้ว',
    branch: 'main',
    additions: 67,
    deletions: 134,
    filesChanged: 3,
    parents: ['i7j8k9l']
  },
  {
    hash: 'i7j8k9l',
    message: 'feat: implement user authentication system',
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    time: '3 ชั่วโมงที่แล้ว',
    branch: 'main',
    additions: 189,
    deletions: 45,
    filesChanged: 8,
    parents: ['m0n1o2p']
  },
  {
    hash: 'm0n1o2p',
    message: 'docs: update API documentation',
    author: { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
    time: '5 ชั่วโมงที่แล้ว',
    branch: 'main',
    additions: 34,
    deletions: 12,
    filesChanged: 2,
    parents: ['q3r4s5t']
  },
  {
    hash: 'q3r4s5t',
    message: 'refactor: optimize database queries',
    author: { name: 'Mike Brown', avatar: 'https://avatars.githubusercontent.com/u/234567?v=4' },
    time: '1 วันที่แล้ว',
    branch: 'main',
    additions: 156,
    deletions: 234,
    filesChanged: 6,
    parents: []
  }
])

const filteredCommits = computed(() => {
  let filtered = commits.value

  // Filter by branch
  if (selectedBranch.value !== 'all') {
    filtered = filtered.filter(commit => commit.branch === selectedBranch.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(commit => 
      commit.message.toLowerCase().includes(query) ||
      commit.author.name.toLowerCase().includes(query) ||
      commit.hash.toLowerCase().includes(query)
    )
  }

  return filtered
})

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

const copyCommitHash = (hash: string) => {
  navigator.clipboard.writeText(hash)
  console.log('Copied:', hash)
}

const viewCommit = (hash: string) => {
  console.log('Viewing commit:', hash)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Commits</h1>
            <p class="text-gray-600 mt-1">ประวัติ commits ทั้งหมดใน repository</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-arrow-down-tray mr-1"></i>
              Download
            </button>
            <button class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-ellipsis-horizontal"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="mb-6 space-y-4">
        <!-- Branch Filter -->
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700">Branch:</label>
          <select 
            v-model="selectedBranch"
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All branches</option>
            <option v-for="branch in branches" :key="branch.name" :value="branch.name">
              {{ branch.name }} {{ branch.current ? '(current)' : '' }}
            </option>
          </select>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search commits..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
          <i class="i-heroicons-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
        </div>

        <!-- View Toggle -->
        <div class="flex items-center space-x-2">
          <button
            @click="currentView = 'list'"
            :class="[
              'px-3 py-2 text-sm rounded-md',
              currentView === 'list'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <i class="i-heroicons-list-bullet mr-1"></i>
            List
          </button>
          <button
            @click="currentView = 'graph'"
            :class="[
              'px-3 py-2 text-sm rounded-md',
              currentView === 'graph'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <i class="i-heroicons-squares-2x2 mr-1"></i>
            Graph
          </button>
        </div>
      </div>

      <!-- Commits List -->
      <div v-if="currentView === 'list'" class="bg-white rounded-lg shadow">
        <div class="divide-y divide-gray-200">
          <div v-for="commit in filteredCommits" :key="commit.hash" class="p-6">
            <div class="flex items-start space-x-4">
              <img :src="commit.author.avatar" :alt="commit.author.name" class="w-10 h-10 rounded-full">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer" @click="viewCommit(commit.hash)">
                      {{ commit.message }}
                    </h3>
                    <div class="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span>{{ commit.author.name }}</span>
                      <span>•</span>
                      <span>{{ commit.time }}</span>
                      <span>•</span>
                      <button 
                        @click="copyCommitHash(commit.hash)"
                        class="font-mono bg-gray-100 px-1 py-0.5 rounded hover:bg-gray-200 cursor-pointer"
                      >
                        {{ commit.hash }}
                      </button>
                      <span>•</span>
                      <span>{{ commit.branch }}</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4 text-xs text-gray-500">
                    <span class="flex items-center text-green-600">
                      <i class="i-heroicons-plus mr-1"></i>
                      {{ commit.additions }}
                    </span>
                    <span class="flex items-center text-red-600">
                      <i class="i-heroicons-minus mr-1"></i>
                      {{ commit.deletions }}
                    </span>
                    <span>{{ commit.filesChanged }} files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Commits Graph -->
      <div v-else class="bg-white rounded-lg shadow p-6">
        <div class="text-center py-12">
          <i class="i-heroicons-squares-2x2 text-gray-400 text-5xl mx-auto mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Commit Graph</h3>
          <p class="text-gray-600 mb-4">Visual representation of commit history</p>
          <div class="flex justify-center space-x-2">
            <div v-for="(commit, index) in filteredCommits.slice(0, 5)" :key="commit.hash" class="flex flex-col items-center">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <img :src="commit.author.avatar" :alt="commit.author.name" class="w-8 h-8 rounded-full">
              </div>
              <div class="text-xs text-gray-600 mt-2 text-center max-w-20 truncate">{{ commit.hash }}</div>
              <div v-if="index < 4" class="w-0.5 h-8 bg-gray-300 mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCommits.length === 0" class="text-center py-12">
        <i class="i-heroicons-document-text text-gray-400 text-5xl mx-auto mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบ commits</h3>
        <p class="text-gray-600 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือเลือก branch อื่น</p>
        <button
          @click="searchQuery = ''; selectedBranch = 'all'"
          class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
        >
          ล้างตัวกรอง
        </button>
      </div>
    </main>
  </div>
</template>