<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClipboard, useToggle } from '@vueuse/core'

const route = useRoute()
const owner = route.params.owner as string
const repo = route.params.repo as string

const selectedBranch = ref('main')
const selectedPath = ref('')
const currentView = ref('code') // 'code', 'commits', 'branches', 'tags'
const searchQuery = ref('')

const { copy, copied } = useClipboard()
const [isStarred, toggleStar] = useToggle(false)

const branches = ref([
  { name: 'main', protected: true, lastCommit: 'feat: add new dashboard component', author: 'John Doe', time: '2 นาทีที่แล้ว' },
  { name: 'develop', protected: false, lastCommit: 'fix: resolve merge conflicts', author: 'Jane Smith', time: '1 ชั่วโมงที่แล้ว' },
  { name: 'feature/auth', protected: false, lastCommit: 'feat: implement authentication', author: 'Bob Wilson', time: '3 ชั่วโมงที่แล้ว' },
  { name: 'feature/ui-redesign', protected: false, lastCommit: 'refactor: update component styles', author: 'Alice Johnson', time: '5 ชั่วโมงที่แล้ว' }
])

const tags = ref([
  { name: 'v2.0.0', message: 'Release v2.0.0', author: 'John Doe', date: '2024-01-10' },
  { name: 'v1.9.0', message: 'Release v1.9.0', author: 'Jane Smith', date: '2023-12-15' },
  { name: 'v1.8.5', message: 'Release v1.8.5', author: 'Bob Wilson', date: '2023-11-20' }
])

const fileTree = ref([
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Button.vue', type: 'file', size: 2345, language: 'Vue' },
          { name: 'Modal.vue', type: 'file', size: 3892, language: 'Vue' },
          { name: 'Table.vue', type: 'file', size: 4567, language: 'Vue' }
        ]
      },
      {
        name: 'composables',
        type: 'folder',
        children: [
          { name: 'useAuth.ts', type: 'file', size: 1234, language: 'TypeScript' },
          { name: 'useApi.ts', type: 'file', size: 2345, language: 'TypeScript' }
        ]
      },
      {
        name: 'pages',
        type: 'folder',
        children: [
          { name: 'index.vue', type: 'file', size: 3456, language: 'Vue' },
          { name: 'about.vue', type: 'file', size: 1234, language: 'Vue' }
        ]
      },
      { name: 'app.vue', type: 'file', size: 890, language: 'Vue' },
      { name: 'main.ts', type: 'file', size: 456, language: 'TypeScript' }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'favicon.ico', type: 'file', size: 4256, language: 'Binary' },
      { name: 'robots.txt', type: 'file', size: 234, language: 'Text' }
    ]
  },
  { name: 'package.json', type: 'file', size: 1234, language: 'JSON' },
  { name: 'README.md', type: 'file', size: 3456, language: 'Markdown' },
  { name: '.gitignore', type: 'file', size: 234, language: 'Text' },
  { name: 'nuxt.config.ts', type: 'file', size: 567, language: 'TypeScript' }
])

const recentCommits = ref([
  {
    hash: 'a1b2c3d',
    message: 'feat: add new dashboard component',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '2 นาทีที่แล้ว',
    branch: 'main',
    filesChanged: 5,
    additions: 245,
    deletions: 89
  },
  {
    hash: 'e4f5g6h',
    message: 'fix: resolve merge conflicts',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    time: '15 นาทีที่แล้ว',
    branch: 'main',
    filesChanged: 3,
    additions: 67,
    deletions: 134
  },
  {
    hash: 'i7j8k9l',
    message: 'docs: update README with installation guide',
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    time: '1 ชั่วโมงที่แล้ว',
    branch: 'develop',
    filesChanged: 2,
    additions: 156,
    deletions: 45
  }
])

const repoInfo = ref({
  name: repo,
  owner: { name: owner, avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
  description: 'Modern web application built with Nuxt.js and TypeScript',
  language: 'TypeScript',
  stars: 45,
  forks: 12,
  issues: 8,
  pullRequests: 3,
  visibility: 'public',
  defaultBranch: 'main',
  createdAt: '2023-06-01',
  updatedAt: '2024-01-15',
  size: '2.3 MB',
  license: 'MIT'
})

const getFileIcon = (fileName: string, fileType: string) => {
  if (fileType === 'folder') return 'i-heroicons-folder text-yellow-500'
  
  const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
  const icons: Record<string, string> = {
    'vue': 'i-simple-icons-vuedotjs text-green-600',
    'ts': 'i-simple-icons-typescript text-blue-600',
    'js': 'i-simple-icons-javascript text-yellow-600',
    'json': 'i-heroicons-document-text text-gray-600',
    'md': 'i-heroicons-document-text text-blue-500',
    'txt': 'i-heroicons-document-text text-gray-500',
    'ico': 'i-heroicons-photo text-purple-600'
  }
  return icons[ext] || 'i-heroicons-document-text text-gray-600'
}

const getLanguageIcon = (language: string) => {
  const icons: Record<string, string> = {
    'TypeScript': 'i-simple-icons-typescript text-blue-600',
    'Vue': 'i-simple-icons-vuedotjs text-green-600',
    'JavaScript': 'i-simple-icons-javascript text-yellow-600',
    'JSON': 'i-heroicons-document-text text-gray-600',
    'Markdown': 'i-heroicons-document-text text-blue-500',
    'Text': 'i-heroicons-document-text text-gray-500',
    'Binary': 'i-heroicons-photo text-purple-600'
  }
  return icons[language] || 'i-heroicons-document-text text-gray-600'
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const copyRepoUrl = () => {
  const url = `https://github.com/${owner}/${repo}.git`
  copy(url)
}

const filteredFileTree = computed(() => {
  if (!searchQuery.value) return fileTree.value
  
  const filterFiles = (items: any[]) => {
    return items.filter(item => {
      if (item.type === 'folder') {
        const filteredChildren = filterFiles(item.children || [])
        if (filteredChildren.length > 0) {
          item.children = filteredChildren
          return true
        }
        return item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      }
      return item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  }
  
  return filterFiles(JSON.parse(JSON.stringify(fileTree.value)))
})

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Repository Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center space-x-4 mb-4 lg:mb-0">
            <div class="flex items-center space-x-2">
              <i :class="[getLanguageIcon(repoInfo.language), 'text-xl']"></i>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  <span class="hover:text-blue-600 cursor-pointer">{{ owner }}</span>
                  <span class="text-gray-500 mx-1">/</span>
                  <span class="hover:text-blue-600 cursor-pointer">{{ repo }}</span>
                </h1>
                <p class="text-sm text-gray-600">{{ repoInfo.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              @click="toggleStar()"
              class="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <i :class="[isStarred ? 'i-heroicons-star-solid text-yellow-500' : 'i-heroicons-star', 'mr-1']"></i>
              {{ repoInfo.stars }}
            </button>
            
            <button class="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-fork mr-1"></i>
              {{ repoInfo.forks }}
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
        
        <!-- Repository Stats -->
        <div class="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
          <span class="flex items-center">
            <i :class="[getLanguageIcon(repoInfo.language), 'mr-1']"></i>
            {{ repoInfo.language }}
          </span>
          <span class="flex items-center">
            <i class="i-heroicons-star mr-1"></i>
            {{ repoInfo.stars }} stars
          </span>
          <span class="flex items-center">
            <i class="i-heroicons-fork mr-1"></i>
            {{ repoInfo.forks }} forks
          </span>
          <span class="flex items-center">
            <i class="i-heroicons-exclamation-circle mr-1"></i>
            {{ repoInfo.issues }} issues
          </span>
          <span class="flex items-center">
            <i class="i-heroicons-arrow-right-on-rectangle mr-1"></i>
            {{ repoInfo.pullRequests }} pull requests
          </span>
          <span>{{ repoInfo.size }}</span>
          <span v-if="repoInfo.license">{{ repoInfo.license }} license</span>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <nav class="flex space-x-8 overflow-x-auto">
            <button
              @click="currentView = 'code'"
              :class="[
                'flex items-center px-1 py-4 border-b-2 text-sm font-medium whitespace-nowrap',
                currentView === 'code'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="i-heroicons-code-bracket mr-2"></i>
              Code
            </button>
            <button
              @click="currentView = 'commits'"
              :class="[
                'flex items-center px-1 py-4 border-b-2 text-sm font-medium whitespace-nowrap',
                currentView === 'commits'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="i-heroicons-document-text mr-2"></i>
              Commits
            </button>
            <button
              @click="currentView = 'branches'"
              :class="[
                'flex items-center px-1 py-4 border-b-2 text-sm font-medium whitespace-nowrap',
                currentView === 'branches'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="i-heroicons-branch mr-2"></i>
              Branches ({{ branches.length }})
            </button>
            <button
              @click="currentView = 'tags'"
              :class="[
                'flex items-center px-1 py-4 border-b-2 text-sm font-medium whitespace-nowrap',
                currentView === 'tags'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i class="i-heroicons-tag mr-2"></i>
              Tags ({{ tags.length }})
            </button>
          </nav>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Code View -->
      <div v-if="currentView === 'code'" class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- File Tree -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow">
            <div class="px-4 py-3 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Files</h3>
                <button class="text-xs text-blue-600 hover:text-blue-800">
                  <i class="i-heroicons-arrow-down-tray mr-1"></i>
                  Download
                </button>
              </div>
            </div>
            <div class="p-4">
              <!-- Search -->
              <div class="mb-3">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Filter files..."
                  class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
              
              <!-- File Tree -->
              <div class="font-mono text-sm">
                <div v-for="item in filteredFileTree" :key="item.name">
                  <div v-if="item.type === 'folder'" class="select-none">
                    <div class="flex items-center py-1 hover:bg-gray-50 cursor-pointer">
                      <i :class="[getFileIcon(item.name, item.type), 'mr-2']"></i>
                      <span class="font-medium">{{ item.name }}</span>
                      <span class="ml-2 text-xs text-gray-500">({{ item.children?.length || 0 }})</span>
                    </div>
                    <div v-for="child in item.children" :key="child.name" class="ml-4">
                      <div v-if="child.type === 'folder'" class="select-none">
                        <div class="flex items-center py-1 hover:bg-gray-50 cursor-pointer">
                          <i :class="[getFileIcon(child.name, child.type), 'mr-2']"></i>
                          <span class="font-medium">{{ child.name }}</span>
                          <span class="ml-2 text-xs text-gray-500">({{ child.children?.length || 0 }})</span>
                        </div>
                        <div v-for="grandchild in child.children" :key="grandchild.name" class="ml-4">
                          <div class="flex items-center justify-between py-1 hover:bg-gray-50 cursor-pointer">
                            <div class="flex items-center">
                              <i :class="[getFileIcon(grandchild.name, grandchild.type), 'mr-2']"></i>
                              <span>{{ grandchild.name }}</span>
                            </div>
                            <span class="text-xs text-gray-500">{{ formatFileSize(grandchild.size) }}</span>
                          </div>
                        </div>
                      </div>
                      <div v-else class="flex items-center justify-between py-1 hover:bg-gray-50 cursor-pointer">
                        <div class="flex items-center">
                          <i :class="[getFileIcon(child.name, child.type), 'mr-2']"></i>
                          <span>{{ child.name }}</span>
                        </div>
                        <span class="text-xs text-gray-500">{{ formatFileSize(child.size) }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="flex items-center justify-between py-1 hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center">
                      <i :class="[getFileIcon(item.name, item.type), 'mr-2']"></i>
                      <span>{{ item.name }}</span>
                    </div>
                    <span class="text-xs text-gray-500">{{ formatFileSize(item.size) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <select v-model="selectedBranch" class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <option v-for="branch in branches" :key="branch.name" :value="branch.name">
                      {{ branch.name }}
                    </option>
                  </select>
                  <span class="text-sm text-gray-500">{{ repoInfo.owner.name }}/{{ repoInfo.name }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    <i class="i-heroicons-document-plus mr-1"></i>
                    Add file
                  </button>
                  <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    <i class="i-heroicons-arrow-up-tray mr-1"></i>
                    Upload files
                  </button>
                </div>
              </div>
            </div>
            
            <!-- README Content -->
            <div class="p-6">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">README.md</h2>
                <div class="prose max-w-none">
                  <h1>{{ repoInfo.name }}</h1>
                  <p>{{ repoInfo.description }}</p>
                  
                  <h2>Installation</h2>
                  <pre><code>npm install
npm run dev</code></pre>
                  
                  <h2>Features</h2>
                  <ul>
                    <li>Modern web application with Nuxt.js</li>
                    <li>TypeScript for type safety</li>
                    <li>Responsive design with Tailwind CSS</li>
                    <li>Component-based architecture</li>
                  </ul>
                  
                  <h2>Usage</h2>
                  <p>Start the development server:</p>
                  <pre><code>npm run dev</code></pre>
                  
                  <h2>Contributing</h2>
                  <p>Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.</p>
                  
                  <h2>License</h2>
                  <p>{{ repoInfo.license }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Commits View -->
      <div v-if="currentView === 'commits'" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Commits</h2>
            <div class="flex items-center space-x-2">
              <select v-model="selectedBranch" class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                <option v-for="branch in branches" :key="branch.name" :value="branch.name">
                  {{ branch.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="commit in recentCommits" :key="commit.hash" class="p-6">
            <div class="flex items-start space-x-4">
              <img :src="commit.author.avatar" :alt="commit.author.name" class="w-10 h-10 rounded-full">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">{{ commit.message }}</h3>
                    <div class="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span>{{ commit.author.name }}</span>
                      <span>•</span>
                      <span>{{ commit.time }}</span>
                      <span>•</span>
                      <code class="bg-gray-100 px-1 py-0.5 rounded">{{ commit.hash }}</code>
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

      <!-- Branches View -->
      <div v-if="currentView === 'branches'" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Branches</h2>
            <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-plus mr-1"></i>
              New branch
            </button>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="branch in branches" :key="branch.name" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <i class="i-heroicons-branch text-gray-600"></i>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-gray-900">{{ branch.name }}</span>
                    <span v-if="branch.protected" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <i class="i-heroicons-shield-check mr-1"></i>
                      Protected
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">{{ branch.lastCommit }}</p>
                  <div class="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <span>{{ branch.author }}</span>
                    <span>•</span>
                    <span>{{ branch.time }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <i class="i-heroicons-code-bracket mr-1"></i>
                  Code
                </button>
                <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <i class="i-heroicons-arrow-right-on-rectangle mr-1"></i>
                  PR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tags View -->
      <div v-if="currentView === 'tags'" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Tags</h2>
            <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-plus mr-1"></i>
              Create tag
            </button>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="tag in tags" :key="tag.name" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <i class="i-heroicons-tag text-gray-600"></i>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-gray-900">{{ tag.name }}</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">{{ tag.message }}</p>
                  <div class="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <span>{{ tag.author }}</span>
                    <span>•</span>
                    <span>{{ tag.date }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <i class="i-heroicons-document-download mr-1"></i>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
