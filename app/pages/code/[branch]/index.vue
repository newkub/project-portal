<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const branch = route.params.branch as string

const currentView = ref('overview') // 'overview', 'commits', 'branches', 'tags'
const searchQuery = ref('')

const branchInfo = ref({
  name: branch,
  protected: false,
  default: false,
  aheadBy: 0,
  behindBy: 0,
  lastCommit: {
    hash: 'a1b2c3d',
    message: 'feat: add new feature',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '2 นาทีที่แล้ว'
  }
})

const commits = ref([
  {
    hash: 'a1b2c3d',
    message: 'feat: add new feature',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '2 นาทีที่แล้ว',
    additions: 245,
    deletions: 89,
    filesChanged: 5
  },
  {
    hash: 'e4f5g6h',
    message: 'fix: resolve bug in authentication',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    time: '1 ชั่วโมงที่แล้ว',
    additions: 67,
    deletions: 134,
    filesChanged: 3
  }
])

const filteredCommits = computed(() => {
  if (!searchQuery.value) return commits.value
  
  const query = searchQuery.value.toLowerCase()
  return commits.value.filter(commit => 
    commit.message.toLowerCase().includes(query) ||
    commit.author.name.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900">
              Branch: {{ branch }}
            </h1>
            <span v-if="branchInfo.protected" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <i class="i-heroicons-shield-check mr-1"></i>
              Protected
            </span>
            <span v-if="branchInfo.default" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <i class="i-heroicons-star mr-1"></i>
              Default
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              <i class="i-heroicons-arrow-right-on-rectangle mr-1"></i>
              Create Pull Request
            </button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-ellipsis-horizontal"></i>
            </button>
          </div>
        </div>
        
        <!-- Branch Info -->
        <div class="flex items-center space-x-6 mt-4 text-sm text-gray-600">
          <span v-if="branchInfo.aheadBy > 0" class="text-green-600">
            {{ branchInfo.aheadBy }} commits ahead of main
          </span>
          <span v-if="branchInfo.behindBy > 0" class="text-red-600">
            {{ branchInfo.behindBy }} commits behind main
          </span>
          <span v-if="branchInfo.aheadBy === 0 && branchInfo.behindBy === 0" class="text-gray-600">
            Up to date with main
          </span>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex space-x-8">
          <button
            @click="currentView = 'overview'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              currentView === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Overview
          </button>
          <button
            @click="currentView = 'commits'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              currentView === 'commits'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Commits ({{ commits.length }})
          </button>
        </nav>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Overview View -->
      <div v-if="currentView === 'overview'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Latest Commit -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Latest Commit</h2>
              </div>
              <div class="p-6">
                <div class="flex items-start space-x-4">
                  <img :src="branchInfo.lastCommit.author.avatar" :alt="branchInfo.lastCommit.author.name" class="w-10 h-10 rounded-full">
                  <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900">{{ branchInfo.lastCommit.message }}</h3>
                    <div class="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span>{{ branchInfo.lastCommit.author.name }}</span>
                      <span>•</span>
                      <span>{{ branchInfo.lastCommit.time }}</span>
                      <span>•</span>
                      <code class="bg-gray-100 px-1 py-0.5 rounded">{{ branchInfo.lastCommit.hash }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Branch Actions -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Branch Actions</h2>
              </div>
              <div class="p-6 space-y-3">
                <button class="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  <i class="i-heroicons-arrow-right-on-rectangle mr-1"></i>
                  Create Pull Request
                </button>
                <button class="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <i class="i-heroicons-arrow-down-tray mr-1"></i>
                  Download ZIP
                </button>
                <button class="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <i class="i-heroicons-qr-code mr-1"></i>
                  View on GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Commits View -->
      <div v-if="currentView === 'commits'">
        <!-- Search -->
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search commits..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
            <i class="i-heroicons-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
          </div>
        </div>

        <!-- Commits List -->
        <div class="bg-white rounded-lg shadow">
          <div class="divide-y divide-gray-200">
            <div v-for="commit in filteredCommits" :key="commit.hash" class="p-6">
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
      </div>
    </main>
  </div>
</template>