<script setup lang="ts">
import { ref, computed } from 'vue'

const environments = ref([
  {
    name: 'Production',
    url: 'https://app.example.com',
    status: 'healthy',
    lastDeployment: {
      commit: 'a1b2c3d',
      branch: 'main',
      author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
      time: '2024-01-15T10:45:00Z',
      status: 'success'
    },
    config: {
      autoDeploy: true,
      requireApproval: false,
      healthCheck: '/health',
      notifications: true
    },
    metrics: {
      uptime: '99.9%',
      responseTime: '245ms',
      errorRate: '0.1%',
      lastCheck: '2 นาทีที่แล้ว'
    }
  },
  {
    name: 'Staging',
    url: 'https://staging.example.com',
    status: 'deploying',
    lastDeployment: {
      commit: 'e4f5g6h',
      branch: 'develop',
      author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
      time: '2024-01-15T11:00:00Z',
      status: 'running'
    },
    config: {
      autoDeploy: true,
      requireApproval: true,
      healthCheck: '/health',
      notifications: true
    },
    metrics: {
      uptime: '99.5%',
      responseTime: '320ms',
      errorRate: '0.3%',
      lastCheck: '5 นาทีที่แล้ว'
    }
  },
  {
    name: 'Development',
    url: 'https://dev.example.com',
    status: 'healthy',
    lastDeployment: {
      commit: 'i7j8k9l',
      branch: 'feature/auth',
      author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
      time: '2024-01-15T08:30:00Z',
      status: 'success'
    },
    config: {
      autoDeploy: false,
      requireApproval: false,
      healthCheck: '/health',
      notifications: false
    },
    metrics: {
      uptime: '98.2%',
      responseTime: '450ms',
      errorRate: '1.2%',
      lastCheck: '1 นาทีที่แล้ว'
    }
  }
])

const selectedEnvironment = ref(environments.value[0])
const showConfigModal = ref(false)
const showDeployModal = ref(false)

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    healthy: 'bg-green-100 text-green-800',
    deploying: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
    offline: 'bg-gray-100 text-gray-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    healthy: 'i-heroicons-check-circle',
    deploying: 'i-heroicons-arrow-path',
    failed: 'i-heroicons-x-circle',
    offline: 'i-heroicons-wifi-slash'
  }
  return icons[status] || 'i-heroicons-question-mark-circle'
}

const getDeploymentStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    success: 'text-green-600',
    running: 'text-blue-600',
    failed: 'text-red-600'
  }
  return colors[status] || 'text-gray-600'
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

const deployToEnvironment = (envName: string) => {
  selectedEnvironment.value = environments.value.find(env => env.name === envName) || environments.value[0]
  showDeployModal.value = true
}

const configureEnvironment = (envName: string) => {
  selectedEnvironment.value = environments.value.find(env => env.name === envName) || environments.value[0]
  showConfigModal.value = true
}

const viewLogs = (envName: string) => {
  console.log('Viewing logs for:', envName)
}

const rollbackDeployment = (envName: string) => {
  console.log('Rolling back deployment for:', envName)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Environments</h1>
            <p class="text-gray-600 mt-1">จัดการ environments และการติดตั้งแอปพลิเคชัน</p>
          </div>
          <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            <i class="i-heroicons-plus mr-1"></i>
            Add Environment
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Environment Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div v-for="env in environments" :key="env.name" class="bg-white rounded-lg shadow">
          <!-- Environment Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <h2 class="text-lg font-medium text-gray-900">{{ env.name }}</h2>
                <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStatusColor(env.status)]">
                  <i :class="[getStatusIcon(env.status), 'mr-1']"></i>
                  {{ env.status }}
                </span>
              </div>
              <button class="text-gray-400 hover:text-gray-600">
                <i class="i-heroicons-ellipsis-horizontal"></i>
              </button>
            </div>
            <a :href="env.url" class="text-sm text-blue-600 hover:text-blue-800 mt-1 block">{{ env.url }}</a>
          </div>

          <!-- Environment Content -->
          <div class="p-6 space-y-4">
            <!-- Metrics -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">Metrics</h3>
              <div class="grid grid-cols-2 gap-3">
                <div class="text-center p-2 bg-gray-50 rounded">
                  <div class="text-lg font-bold text-gray-900">{{ env.metrics.uptime }}</div>
                  <div class="text-xs text-gray-500">Uptime</div>
                </div>
                <div class="text-center p-2 bg-gray-50 rounded">
                  <div class="text-lg font-bold text-gray-900">{{ env.metrics.responseTime }}</div>
                  <div class="text-xs text-gray-500">Response</div>
                </div>
                <div class="text-center p-2 bg-gray-50 rounded">
                  <div class="text-lg font-bold text-gray-900">{{ env.metrics.errorRate }}</div>
                  <div class="text-xs text-gray-500">Error Rate</div>
                </div>
                <div class="text-center p-2 bg-gray-50 rounded">
                  <div class="text-lg font-bold text-gray-900">{{ env.metrics.lastCheck }}</div>
                  <div class="text-xs text-gray-500">Last Check</div>
                </div>
              </div>
            </div>

            <!-- Last Deployment -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">Last Deployment</h3>
              <div class="flex items-center space-x-3">
                <img :src="env.lastDeployment.author.avatar" :alt="env.lastDeployment.author.name" class="w-8 h-8 rounded-full">
                <div class="flex-1">
                  <div class="text-sm text-gray-900">
                    <code class="bg-gray-100 px-1 py-0.5 rounded text-xs">{{ env.lastDeployment.commit }}</code>
                    <span class="ml-2">{{ env.lastDeployment.branch }}</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ env.lastDeployment.author.name }} • {{ formatTime(env.lastDeployment.time) }}
                  </div>
                </div>
                <i :class="[getStatusIcon(env.lastDeployment.status), getDeploymentStatusColor(env.lastDeployment.status)]"></i>
              </div>
            </div>

            <!-- Configuration -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">Configuration</h3>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Auto Deploy</span>
                  <span :class="env.config.autoDeploy ? 'text-green-600' : 'text-gray-400'">
                    {{ env.config.autoDeploy ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Require Approval</span>
                  <span :class="env.config.requireApproval ? 'text-orange-600' : 'text-gray-400'">
                    {{ env.config.requireApproval ? 'Required' : 'Not Required' }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Notifications</span>
                  <span :class="env.config.notifications ? 'text-blue-600' : 'text-gray-400'">
                    {{ env.config.notifications ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-gray-200">
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="deployToEnvironment(env.name)"
                  :disabled="env.status === 'deploying'"
                  class="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="i-heroicons-rocket-launch mr-1"></i>
                  Deploy
                </button>
                <button
                  @click="configureEnvironment(env.name)"
                  class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <i class="i-heroicons-cog-6-tooth mr-1"></i>
                  Config
                </button>
                <button
                  @click="viewLogs(env.name)"
                  class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <i class="i-heroicons-document-text mr-1"></i>
                  Logs
                </button>
                <button
                  @click="rollbackDeployment(env.name)"
                  :disabled="env.status === 'deploying'"
                  class="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="i-heroicons-arrow-uturn-left mr-1"></i>
                  Rollback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="environments.length === 0" class="text-center py-12">
        <i class="i-heroicons-server text-gray-400 text-5xl mx-auto mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No environments configured</h3>
        <p class="text-gray-600 mb-4">Set up your first environment to start deploying your application</p>
        <button class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Create Environment
        </button>
      </div>
    </main>

    <!-- Deploy Modal -->
    <div v-if="showDeployModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Deploy to {{ selectedEnvironment?.name || 'Environment' }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>main</option>
              <option>develop</option>
              <option>feature/auth</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Commit Message</label>
            <input type="text" placeholder="Describe your deployment" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-2">
          <button @click="showDeployModal = false" class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button @click="showDeployModal = false" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            Deploy Now
          </button>
        </div>
      </div>
    </div>

    <!-- Config Modal -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Configure {{ selectedEnvironment?.name || 'Environment' }}</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700">Auto Deploy</label>
            <input type="checkbox" v-model="selectedEnvironment?.config?.autoDeploy" class="rounded text-indigo-600 focus:ring-indigo-500">
          </div>
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700">Require Approval</label>
            <input type="checkbox" v-model="selectedEnvironment?.config?.requireApproval" class="rounded text-indigo-600 focus:ring-indigo-500">
          </div>
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700">Notifications</label>
            <input type="checkbox" v-model="selectedEnvironment?.config?.notifications" class="rounded text-indigo-600 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Health Check Path</label>
            <input type="text" v-model="selectedEnvironment?.config?.healthCheck" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-2">
          <button @click="showConfigModal = false" class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button @click="showConfigModal = false" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>