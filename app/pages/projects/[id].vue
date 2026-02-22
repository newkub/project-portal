<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClipboard, useToggle } from '@vueuse/core'

const route = useRoute()
const router = useRouter()

const projectId = route.params.id as string
const activeTab = ref('overview')
const [isStarred, toggleStar] = useToggle(false)

const { copy, copied } = useClipboard()

const project = ref({
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
  owner: {
    name: 'wrikka',
    avatar: 'https://avatars.githubusercontent.com/u/123456?v=4'
  },
  topics: ['rust', 'monorepo', 'best-practices'],
  status: 'active',
  readme: '# rust-packages\n\nA comprehensive Rust packages monorepo following strict best practices.\n\n## Features\n\n- 🦀 **Rust**: Modern systems programming\n- 📦 **Monorepo**: Multiple packages in one repository\n- 🏗️ **Best Practices**: Strict coding standards\n- 🔧 **Tooling**: Comprehensive development tools\n\n## Getting Started\n\n```bash\ncargo build\ncargo test\n```\n\n## Packages\n\n- `async`: Async utilities and helpers\n- `cli`: Command line interface tools\n- `ai-platform`: AI and machine learning services\n\n## License\n\nMIT License',
  branches: [
    { name: 'main', protected: true, lastCommit: 'feat: add new dashboard component', author: 'John Doe', time: '2 นาทีที่แล้ว' },
    { name: 'develop', protected: false, lastCommit: 'fix: resolve merge conflicts', author: 'Jane Smith', time: '1 ชั่วโมงที่แล้ว' },
    { name: 'feature/auth', protected: false, lastCommit: 'feat: implement authentication', author: 'Bob Wilson', time: '3 ชั่วโมงที่แล้ว' }
  ],
  contributors: [
    { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4', commits: 45 },
    { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4', commits: 32 },
    { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4', commits: 28 }
  ]
})

const recentCommits = ref([
  { hash: 'a1b2c3d', message: 'feat: add new dashboard component', author: 'John Doe', time: '2 นาทีที่แล้ว', branch: 'main' },
  { hash: 'e4f5g6h', message: 'fix: resolve merge conflicts', author: 'Jane Smith', time: '15 นาทีที่แล้ว', branch: 'main' },
  { hash: 'i7j8k9l', message: 'docs: update README with installation guide', author: 'Bob Wilson', time: '1 ชั่วโมงที่แล้ว', branch: 'develop' },
  { hash: 'm0n1o2p', message: 'refactor: improve error handling', author: 'John Doe', time: '3 ชั่วโมงที่แล้ว', branch: 'feature/auth' },
  { hash: 'q3r4s5t', message: 'chore: update dependencies', author: 'Jane Smith', time: '5 ชั่วโมงที่แล้ว', branch: 'main' }
])

const openIssues = ref([
  { id: 1, title: 'Fix navigation bug on mobile', author: 'Alice Johnson', created: '2 ชั่วโมงที่แล้ว', comments: 3, labels: ['bug', 'mobile'] },
  { id: 2, title: 'Add dark mode support', author: 'Bob Wilson', created: '5 ชั่วโมงที่แล้ว', comments: 7, labels: ['enhancement', 'ui'] },
  { id: 3, title: 'Improve loading performance', author: 'Carol Davis', created: '1 วันที่แล้ว', comments: 2, labels: ['performance'] }
])

const pullRequests = ref([
  { id: 1, title: 'feat: implement authentication system', author: 'Bob Wilson', created: '3 ชั่วโมงที่แล้ว', comments: 5, status: 'open', reviewers: ['John Doe'] },
  { id: 2, title: 'fix: resolve memory leak in async module', author: 'Jane Smith', created: '6 ชั่วโมงที่แล้ว', comments: 3, status: 'open', reviewers: [] },
  { id: 3, title: 'docs: update API documentation', author: 'Alice Johnson', created: '1 วันที่แล้ว', comments: 1, status: 'merged', reviewers: ['John Doe', 'Bob Wilson'] }
])

const tabs = [
  { id: 'overview', label: 'ภาพรวม', icon: 'i-heroicons-home' },
  { id: 'code', label: 'โค้ด', icon: 'i-heroicons-code-bracket' },
  { id: 'issues', label: 'Issues', icon: 'i-heroicons-exclamation-circle' },
  { id: 'pull-requests', label: 'Pull Requests', icon: 'i-heroicons-arrow-right-on-rectangle' },
  { id: 'actions', label: 'Actions', icon: 'i-heroicons-bolt' },
  { id: 'security', label: 'ความปลอดภัย', icon: 'i-heroicons-shield-check' },
  { id: 'insights', label: 'สถิติ', icon: 'i-heroicons-chart-bar' },
  { id: 'settings', label: 'การตั้งค่า', icon: 'i-heroicons-cog-6-tooth' }
]

const getLanguageIcon = (language: string) => {
  const icons: Record<string, string> = {
    'Rust': 'i-simple-icons-rust',
    'TypeScript': 'i-simple-icons-typescript',
    'Python': 'i-simple-icons-python',
    'Go': 'i-simple-icons-go'
  }
  return icons[language] || 'i-heroicons-code-bracket'
}

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    'Rust': 'text-orange-600',
    'TypeScript': 'text-blue-600',
    'Python': 'text-green-600',
    'Go': 'text-cyan-600'
  }
  return colors[language] || 'text-gray-600'
}

const getLabelColor = (label: string) => {
  const colors: Record<string, string> = {
    'bug': 'bg-red-100 text-red-800',
    'enhancement': 'bg-green-100 text-green-800',
    'performance': 'bg-yellow-100 text-yellow-800',
    'ui': 'bg-blue-100 text-blue-800',
    'mobile': 'bg-purple-100 text-purple-800'
  }
  return colors[label] || 'bg-gray-100 text-gray-800'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'open': 'bg-green-100 text-green-800',
    'closed': 'bg-red-100 text-red-800',
    'merged': 'bg-purple-100 text-purple-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const copyRepoUrl = () => {
  const url = `https://github.com/${project.value.owner.name}/${project.value.name}.git`
  copy(url)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Project Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center space-x-4 mb-4 lg:mb-0">
            <i :class="[getLanguageIcon(project.language), getLanguageColor(project.language), 'text-2xl']"></i>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ project.name }}</h1>
              <p class="text-sm text-gray-600">Public • {{ project.language }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              @click="toggleStar()"
              class="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <i :class="[isStarred ? 'i-heroicons-star-solid text-yellow-500' : 'i-heroicons-star', 'mr-1']"></i>
              {{ project.stars }}
            </button>
            
            <button class="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-fork mr-1"></i>
              {{ project.forks }}
            </button>
            
            <button
              @click="copyRepoUrl"
              class="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <i class="i-heroicons-clipboard-document mr-1"></i>
              {{ copied ? 'คัดลอกแล้ว!' : 'คัดลอก URL' }}
            </button>
            
            <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              <i class="i-heroicons-arrow-down-tray mr-1"></i>
              Code
            </button>
          </div>
        </div>
        
        <!-- Project Description -->
        <p class="mt-4 text-gray-700">{{ project.description }}</p>
        
        <!-- Topics -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="topic in project.topics"
            :key="topic"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {{ topic }}
          </span>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex space-x-8 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center px-1 py-4 border-b-2 text-sm font-medium whitespace-nowrap',
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <i :class="[tab.icon, 'mr-2']"></i>
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-8">
        <!-- README -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">README.md</h2>
          </div>
          <div class="p-6">
            <div class="prose max-w-none">
              <div v-html="project.readme.replace(/\n/g, '<br>')"></div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">กิจกรรมล่าสุด</h2>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="commit in recentCommits" :key="commit.hash" class="p-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-white">
                  {{ commit.author.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">
                    <span class="font-medium">{{ commit.author }}</span>
                    <span class="text-gray-600 mx-1">{{ commit.message.toLowerCase() }}</span>
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    <code class="bg-gray-100 px-1 py-0.5 rounded">{{ commit.hash }}</code>
                    {{ commit.time }} • {{ commit.branch }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contributors -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">ผู้มีส่วนร่วม</h2>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap gap-4">
              <div v-for="contributor in project.contributors" :key="contributor.name" class="flex items-center space-x-2">
                <img :src="contributor.avatar" :alt="contributor.name" class="w-8 h-8 rounded-full">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ contributor.name }}</p>
                  <p class="text-xs text-gray-500">{{ contributor.commits }} commits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Tab -->
      <div v-if="activeTab === 'code'" class="space-y-8">
        <!-- Branch Selector -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <select class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option v-for="branch in project.branches" :key="branch.name" :value="branch.name">
                {{ branch.name }}
              </option>
            </select>
            <div class="flex space-x-2">
              <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <i class="i-heroicons-folder mr-1"></i>
                Files
              </button>
              <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <i class="i-heroicons-branch mr-1"></i>
                Branches
              </button>
              <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                <i class="i-heroicons-tag mr-1"></i>
                Tags
              </button>
            </div>
          </div>
        </div>

        <!-- File Tree -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">โครงสร้างไฟล์</h2>
          </div>
          <div class="p-6">
            <div class="font-mono text-sm">
              <div class="flex items-center py-1 hover:bg-gray-50 cursor-pointer">
                <i class="i-heroicons-folder mr-2 text-yellow-500"></i>
                src/
              </div>
              <div class="ml-4 flex items-center py-1 hover:bg-gray-50 cursor-pointer">
                <i class="i-heroicons-folder mr-2 text-yellow-500"></i>
                packages/
              </div>
              <div class="ml-4 flex items-center py-1 hover:bg-gray-50 cursor-pointer">
                <i class="i-heroicons-document-text mr-2 text-blue-500"></i>
                Cargo.toml
              </div>
              <div class="ml-4 flex items-center py-1 hover:bg-gray-50 cursor-pointer">
                <i class="i-heroicons-document-text mr-2 text-blue-500"></i>
                README.md
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Issues Tab -->
      <div v-if="activeTab === 'issues'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">Issues เปิด ({{ openIssues.length }})</h2>
          <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            สร้าง Issue ใหม่
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="issue in openIssues" :key="issue.id" class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    #{{ issue.id }}
                  </span>
                  <span v-for="label in issue.labels" :key="label" :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getLabelColor(label)]">
                    {{ label }}
                  </span>
                </div>
                <h3 class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                  {{ issue.title }}
                </h3>
                <div class="flex items-center text-sm text-gray-500">
                  <span>เปิดโดย {{ issue.author }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ issue.created }}</span>
                  <span class="mx-2">•</span>
                  <span class="flex items-center">
                    <i class="i-heroicons-chat-bubble-left-right mr-1"></i>
                    {{ issue.comments }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pull Requests Tab -->
      <div v-if="activeTab === 'pull-requests'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">Pull Requests ({{ pullRequests.length }})</h2>
          <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            สร้าง Pull Request
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="pr in pullRequests" :key="pr.id" class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStatusColor(pr.status)]">
                    {{ pr.status }}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    #{{ pr.id }}
                  </span>
                </div>
                <h3 class="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                  {{ pr.title }}
                </h3>
                <div class="flex items-center text-sm text-gray-500">
                  <span>โดย {{ pr.author }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ pr.created }}</span>
                  <span class="mx-2">•</span>
                  <span class="flex items-center">
                    <i class="i-heroicons-chat-bubble-left-right mr-1"></i>
                    {{ pr.comments }}
                  </span>
                  <span v-if="pr.reviewers.length > 0" class="mx-2">•</span>
                  <span v-if="pr.reviewers.length > 0" class="flex items-center">
                    <i class="i-heroicons-eye mr-1"></i>
                    {{ pr.reviewers.join(', ') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other tabs placeholder -->
      <div v-else-if="!['overview', 'code', 'issues', 'pull-requests'].includes(activeTab)" class="bg-white rounded-lg shadow p-12 text-center">
        <i class="i-heroicons-cog-6-together text-gray-400 text-5xl mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ tabs.find(t => t.id === activeTab)?.label }}</h3>
        <p class="text-gray-500">คุณสมบัตินี้กำลังพัฒนาอยู่</p>
      </div>
    </main>
  </div>
</template>
