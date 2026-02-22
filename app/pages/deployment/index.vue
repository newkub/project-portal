<script setup lang="ts">
import { ref, computed } from 'vue'

const currentView = ref('overview') // 'overview', 'pipelines', 'environments', 'history'

const stats = ref([
  { label: 'Deployments วันนี้', value: '12', icon: 'i-heroicons-rocket-launch', color: 'text-green-600' },
  { label: 'สำเร็จ', value: '45', icon: 'i-heroicons-check-circle', color: 'text-green-600' },
  { label: 'ล้มเหลว', value: '3', icon: 'i-heroicons-x-circle', color: 'text-red-600' },
  { label: 'กำลังทำงาน', value: '2', icon: 'i-heroicons-arrow-path', color: 'text-blue-600' }
])

const recentDeployments = ref([
  {
    id: 1,
    environment: 'Production',
    status: 'success',
    commit: 'a1b2c3d',
    branch: 'main',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    startedAt: '2024-01-15T10:30:00Z',
    completedAt: '2024-01-15T10:45:00Z',
    duration: '15 นาที'
  },
  {
    id: 2,
    environment: 'Staging',
    status: 'running',
    commit: 'e4f5g6h',
    branch: 'develop',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    startedAt: '2024-01-15T11:00:00Z',
    completedAt: null,
    duration: null
  },
  {
    id: 3,
    environment: 'Production',
    status: 'failed',
    commit: 'i7j8k9l',
    branch: 'feature/auth',
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    startedAt: '2024-01-15T09:15:00Z',
    completedAt: '2024-01-15T09:25:00Z',
    duration: '10 นาที'
  }
])

const environments = ref([
  {
    name: 'Production',
    url: 'https://app.example.com',
    status: 'healthy',
    lastDeployment: '2024-01-15T10:45:00Z',
    branch: 'main'
  },
  {
    name: 'Staging',
    url: 'https://staging.example.com',
    status: 'deploying',
    lastDeployment: '2024-01-15T11:00:00Z',
    branch: 'develop'
  },
  {
    name: 'Development',
    url: 'https://dev.example.com',
    status: 'healthy',
    lastDeployment: '2024-01-15T08:30:00Z',
    branch: 'develop'
  }
])

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    success: 'bg-green-100 text-green-800',
    running: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
    healthy: 'bg-green-100 text-green-800',
    deploying: 'bg-blue-100 text-blue-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    success: 'i-heroicons-check-circle',
    running: 'i-heroicons-arrow-path',
    failed: 'i-heroicons-x-circle',
    healthy: 'i-heroicons-check-circle',
    deploying: 'i-heroicons-arrow-path'
  }
  return icons[status] || 'i-heroicons-question-mark-circle'
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
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Deployment</h1>
          <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            <i class="i-heroicons-rocket-launch mr-1"></i>
            Deploy Now
          </button>
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
            @click="currentView = 'pipelines'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              currentView === 'pipelines'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Pipelines
          </button>
          <button
            @click="currentView = 'environments'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              currentView === 'environments'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Environments
          </button>
          <button
            @click="currentView = 'history'"
            :class="[
              'py-4 px-1 border-b-2 text-sm font-medium',
              currentView === 'history'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            History
          </button>
        </nav>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Overview View -->
      <div v-if="currentView === 'overview'">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div :class="[stat.icon, stat.color, 'text-2xl mr-4']"></div>
              <div>
                <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Deployments -->
          <div>
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Recent Deployments</h2>
              </div>
              <div class="divide-y divide-gray-200">
                <div v-for="deployment in recentDeployments" :key="deployment.id" class="p-6">
                  <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-3">
                      <img :src="deployment.author.avatar" :alt="deployment.author.name" class="w-8 h-8 rounded-full">
                      <div>
                        <div class="flex items-center space-x-2">
                          <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStatusColor(deployment.status)]">
                            <i :class="[getStatusIcon(deployment.status), 'mr-1']"></i>
                            {{ deployment.status }}
                          </span>
                          <span class="text-sm font-medium text-gray-900">{{ deployment.environment }}</span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                          <code class="bg-gray-100 px-1 py-0.5 rounded text-xs">{{ deployment.commit }}</code>
                          <span class="mx-1">•</span>
                          <span>{{ deployment.branch }}</span>
                        </div>
                        <div class="mt-1 text-xs text-gray-500">
                          {{ deployment.author.name }} • {{ formatTime(deployment.startedAt) }}
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div v-if="deployment.duration" class="text-sm text-gray-900">{{ deployment.duration }}</div>
                      <div v-else class="text-sm text-blue-600">Running...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Environments Status -->
          <div>
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Environments</h2>
              </div>
              <div class="divide-y divide-gray-200">
                <div v-for="env in environments" :key="env.name" class="p-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="flex items-center space-x-2">
                        <h3 class="text-sm font-medium text-gray-900">{{ env.name }}</h3>
                        <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStatusColor(env.status)]">
                          <i :class="[getStatusIcon(env.status), 'mr-1']"></i>
                          {{ env.status }}
                        </span>
                      </div>
                      <div class="mt-1 text-sm text-gray-600">
                        <a :href="env.url" class="text-blue-600 hover:text-blue-800">{{ env.url }}</a>
                      </div>
                      <div class="mt-1 text-xs text-gray-500">
                        Last deploy: {{ formatTime(env.lastDeployment) }} • {{ env.branch }}
                      </div>
                    </div>
                    <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      Deploy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pipelines View -->
      <div v-if="currentView === 'pipelines'">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Deployment Pipelines</h2>
          </div>
          <div class="p-6">
            <div class="text-center py-12">
              <i class="i-heroicons-cube-transparent text-gray-400 text-5xl mx-auto mb-4"></i>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No pipelines configured</h3>
              <p class="text-gray-600 mb-4">Set up your deployment pipelines to automate releases</p>
              <button class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Configure Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Environments View -->
      <div v-if="currentView === 'environments'">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-gray-900">Environments</h2>
              <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                <i class="i-heroicons-plus mr-1"></i>
                Add Environment
              </button>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="env in environments" :key="env.name" class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <h3 class="text-lg font-medium text-gray-900">{{ env.name }}</h3>
                    <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStatusColor(env.status)]">
                      <i :class="[getStatusIcon(env.status), 'mr-1']"></i>
                      {{ env.status }}
                    </span>
                  </div>
                  <div class="mt-2">
                    <a :href="env.url" class="text-blue-600 hover:text-blue-800">{{ env.url }}</a>
                  </div>
                  <div class="mt-2 text-sm text-gray-600">
                    Last deployment: {{ formatTime(env.lastDeployment) }}
                  </div>
                  <div class="mt-1 text-sm text-gray-600">
                    Branch: <code class="bg-gray-100 px-1 py-0.5 rounded">{{ env.branch }}</code>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    <i class="i-heroicons-cog-6-tooth mr-1"></i>
                    Settings
                  </button>
                  <button class="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                    Deploy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- History View -->
      <div v-if="currentView === 'history'">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Deployment History</h2>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="deployment in recentDeployments" :key="deployment.id" class="p-6">
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-4">
                  <div :class="[getStatusIcon(deployment.status), 'text-xl mt-1']"></div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h3 class="text-sm font-medium text-gray-900">{{ deployment.environment }}</h3>
                      <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStatusColor(deployment.status)]">
                        {{ deployment.status }}
                      </span>
                    </div>
                    <div class="mt-1 text-sm text-gray-600">
                      <code class="bg-gray-100 px-1 py-0.5 rounded">{{ deployment.commit }}</code>
                      <span class="mx-1">•</span>
                      <span>{{ deployment.branch }}</span>
                    </div>
                    <div class="mt-1 text-xs text-gray-500">
                      {{ deployment.author.name }} • {{ formatTime(deployment.startedAt) }}
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div v-if="deployment.duration" class="text-sm text-gray-900">{{ deployment.duration }}</div>
                  <div v-else class="text-sm text-blue-600">In progress...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>