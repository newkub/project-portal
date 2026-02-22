<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const issueId = route.params.id as string

const currentView = ref('overview') // 'overview', 'comments', 'timeline'
const isEditing = ref(false)

const issue = ref({
  id: issueId,
  title: 'Fix: Authentication system not working on mobile devices',
  description: 'Users report that they cannot log in using mobile devices. The login button appears to be unresponsive on iOS and Android browsers.',
  state: 'open',
  author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
  assignees: [
    { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' }
  ],
  labels: ['bug', 'mobile', 'high-priority'],
  milestone: 'v2.0.0',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T14:20:00Z',
  comments: 8,
  reactions: { thumbsUp: 5, thumbsDown: 0, laugh: 1, hooray: 3 },
  projectId: '1',
  projectName: 'project-web'
})

const comments = ref([
  {
    id: 1,
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    content: 'I can reproduce this issue on my iPhone. The login button doesn\'t respond to taps.',
    createdAt: '2024-01-15T11:00:00Z',
    reactions: { thumbsUp: 2, thumbsDown: 0 }
  },
  {
    id: 2,
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    content: 'Same issue on Android Chrome. The button seems to have a z-index problem.',
    createdAt: '2024-01-15T11:30:00Z',
    reactions: { thumbsUp: 1, thumbsDown: 0 }
  }
])

const timeline = ref([
  {
    type: 'created',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    timestamp: '2024-01-15T10:30:00Z',
    description: 'created this issue'
  },
  {
    type: 'labeled',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    timestamp: '2024-01-15T10:35:00Z',
    description: 'added bug, mobile, and high-priority labels'
  },
  {
    type: 'assigned',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    timestamp: '2024-01-15T10:40:00Z',
    description: 'assigned to Jane Smith'
  },
  {
    type: 'commented',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    timestamp: '2024-01-15T11:00:00Z',
    description: 'added a comment'
  }
])

const getStateColor = (state: string) => {
  const colors: Record<string, string> = {
    open: 'bg-green-100 text-green-800',
    closed: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800'
  }
  return colors[state] || 'bg-gray-100 text-gray-800'
}

const getLabelColor = (label: string) => {
  const colors: Record<string, string> = {
    bug: 'bg-red-100 text-red-800',
    enhancement: 'bg-green-100 text-green-800',
    'high-priority': 'bg-orange-100 text-orange-800',
    mobile: 'bg-purple-100 text-purple-800'
  }
  return colors[label] || 'bg-gray-100 text-gray-800'
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

const closeIssue = () => {
  issue.value.state = 'closed'
}

const reopenIssue = () => {
  issue.value.state = 'open'
}

const addComment = (content: string) => {
  // Implementation for adding comment
  console.log('Adding comment:', content)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <router-link to="/issues" class="text-gray-600 hover:text-gray-900">
              <i class="i-heroicons-arrow-left mr-2"></i>
              Back to Issues
            </router-link>
            <span class="text-gray-400">•</span>
            <span class="text-sm text-gray-600">Issue #{{ issueId }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <button
              v-if="issue.state === 'open'"
              @click="closeIssue"
              class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <i class="i-heroicons-x-mark mr-1"></i>
              Close Issue
            </button>
            <button
              v-else
              @click="reopenIssue"
              class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <i class="i-heroicons-arrow-path mr-1"></i>
              Reopen Issue
            </button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-ellipsis-horizontal"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Issue Details -->
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <!-- Issue Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStateColor(issue.state)]">
                    {{ issue.state }}
                  </span>
                  <h1 class="text-xl font-bold text-gray-900">{{ issue.title }}</h1>
                </div>
                <button
                  @click="isEditing = !isEditing"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <i class="i-heroicons-pencil"></i>
                </button>
              </div>

              <!-- Issue Meta -->
              <div class="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div class="flex items-center space-x-2">
                  <img :src="issue.author.avatar" :alt="issue.author.name" class="w-4 h-4 rounded-full">
                  <span>{{ issue.author.name }}</span>
                </div>
                <span>•</span>
                <span>สร้างเมื่อ {{ formatTime(issue.createdAt) }}</span>
                <span>•</span>
                <span>อัปเดตเมื่อ {{ formatTime(issue.updatedAt) }}</span>
              </div>

              <!-- Labels and Milestone -->
              <div class="flex items-center space-x-3 mb-6">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="label in issue.labels"
                    :key="label"
                    :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getLabelColor(label)]"
                  >
                    {{ label }}
                  </span>
                </div>
                <span v-if="issue.milestone" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <i class="i-heroicons-flag mr-1"></i>
                  {{ issue.milestone }}
                </span>
              </div>

              <!-- Description -->
              <div v-if="!isEditing" class="prose max-w-none text-gray-700">
                <p>{{ issue.description }}</p>
              </div>
              
              <!-- Edit Form -->
              <div v-else class="space-y-4">
                <textarea
                  v-model="issue.description"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="6"
                ></textarea>
                <div class="flex space-x-2">
                  <button
                    @click="isEditing = false"
                    class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    @click="isEditing = false"
                    class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Reactions -->
              <div class="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-200">
                <button class="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <i class="i-heroicons-hand-thumb-up"></i>
                  <span class="text-sm">{{ issue.reactions.thumbsUp }}</span>
                </button>
                <button class="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <i class="i-heroicons-hand-thumb-down"></i>
                  <span class="text-sm">{{ issue.reactions.thumbsDown }}</span>
                </button>
                <button class="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <i class="i-heroicons-face-smile"></i>
                  <span class="text-sm">{{ issue.reactions.laugh }}</span>
                </button>
                <button class="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <i class="i-heroicons-trophy"></i>
                  <span class="text-sm">{{ issue.reactions.hooray }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Comments ({{ comments.length }})</h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div v-for="comment in comments" :key="comment.id" class="p-6">
                <div class="flex items-start space-x-3">
                  <img :src="comment.author.avatar" :alt="comment.author.name" class="w-8 h-8 rounded-full">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <span class="font-medium text-gray-900">{{ comment.author.name }}</span>
                      <span class="text-sm text-gray-500">{{ formatTime(comment.createdAt) }}</span>
                    </div>
                    <div class="mt-2 text-gray-700">
                      {{ comment.content }}
                    </div>
                    <div class="flex items-center space-x-4 mt-3">
                      <button class="text-sm text-gray-600 hover:text-gray-900">
                        <i class="i-heroicons-hand-thumb-up mr-1"></i>
                        {{ comment.reactions.thumbsUp }}
                      </button>
                      <button class="text-sm text-gray-600 hover:text-gray-900">
                        <i class="i-heroicons-hand-thumb-down mr-1"></i>
                        {{ comment.reactions.thumbsDown }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Comment -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Add a comment</h3>
            <textarea
              placeholder="Write your comment..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            ></textarea>
            <div class="mt-3 flex justify-end">
              <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                Comment
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Assignees -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Assignees</h3>
            <div class="space-y-2">
              <div v-for="assignee in issue.assignees" :key="assignee.name" class="flex items-center space-x-2">
                <img :src="assignee.avatar" :alt="assignee.name" class="w-6 h-6 rounded-full">
                <span class="text-sm text-gray-700">{{ assignee.name }}</span>
              </div>
              <button class="text-sm text-blue-600 hover:text-blue-800">
                <i class="i-heroicons-plus mr-1"></i>
                Assign someone
              </button>
            </div>
          </div>

          <!-- Labels -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Labels</h3>
            <div class="space-y-2">
              <div v-for="label in issue.labels" :key="label" class="flex items-center justify-between">
                <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getLabelColor(label)]">
                  {{ label }}
                </span>
                <button class="text-gray-400 hover:text-gray-600">
                  <i class="i-heroicons-x-mark text-xs"></i>
                </button>
              </div>
              <button class="text-sm text-blue-600 hover:text-blue-800">
                <i class="i-heroicons-plus mr-1"></i>
                Add label
              </button>
            </div>
          </div>

          <!-- Milestone -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Milestone</h3>
            <div v-if="issue.milestone" class="flex items-center justify-between">
              <span class="text-sm text-gray-700">{{ issue.milestone }}</span>
              <button class="text-gray-400 hover:text-gray-600">
                <i class="i-heroicons-x-mark text-xs"></i>
              </button>
            </div>
            <button v-else class="text-sm text-blue-600 hover:text-blue-800">
              <i class="i-heroicons-plus mr-1"></i>
              Set milestone
            </button>
          </div>

          <!-- Projects -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Projects</h3>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-700">{{ issue.projectName }}</span>
              <button class="text-gray-400 hover:text-gray-600">
                <i class="i-heroicons-x-mark text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>