<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const prId = route.params.id as string

const currentView = ref('overview') // 'overview', 'commits', 'files'
const isEditing = ref(false)

const pullRequest = ref({
  id: prId,
  title: 'feat: implement user authentication system',
  description: 'This PR adds a complete authentication system including login, registration, password reset, and user profile management. The implementation uses JWT tokens for authentication and includes proper validation and error handling.',
  state: 'open',
  author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
  baseBranch: 'main',
  headBranch: 'feature/auth',
  assignees: [
    { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' }
  ],
  reviewers: [
    { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4', status: 'approved' },
    { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4', status: 'pending' }
  ],
  labels: ['feature', 'security', 'enhancement'],
  milestone: 'v2.0.0',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T14:20:00Z',
  comments: 15,
  additions: 245,
  deletions: 89,
  changedFiles: 12,
  mergeable: true,
  draft: false,
  conflicts: false,
  projectId: '1',
  projectName: 'project-web'
})

const commits = ref([
  {
    hash: 'a1b2c3d',
    message: 'feat: add authentication components',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '2 นาทีที่แล้ว',
    additions: 89,
    deletions: 12,
    filesChanged: 4
  },
  {
    hash: 'e4f5g6h',
    message: 'feat: implement JWT token service',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '1 ชั่วโมงที่แล้ว',
    additions: 67,
    deletions: 23,
    filesChanged: 3
  },
  {
    hash: 'i7j8k9l',
    message: 'feat: add user profile management',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    time: '3 ชั่วโมงที่แล้ว',
    additions: 89,
    deletions: 54,
    filesChanged: 5
  }
])

const files = ref([
  {
    name: 'src/components/auth/LoginForm.vue',
    status: 'modified',
    additions: 45,
    deletions: 12,
    changes: 57
  },
  {
    name: 'src/components/auth/RegisterForm.vue',
    status: 'added',
    additions: 67,
    deletions: 0,
    changes: 67
  },
  {
    name: 'src/services/auth.ts',
    status: 'added',
    additions: 89,
    deletions: 0,
    changes: 89
  },
  {
    name: 'src/types/auth.ts',
    status: 'added',
    additions: 23,
    deletions: 0,
    changes: 23
  }
])

const comments = ref([
  {
    id: 1,
    author: { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
    content: 'Great work on the authentication system! I\'ve reviewed the code and everything looks good. The JWT implementation is secure and the components are well-structured.',
    createdAt: '2024-01-15T11:00:00Z',
    reactions: { thumbsUp: 3, thumbsDown: 0 }
  },
  {
    id: 2,
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    content: 'I\'ll review this tomorrow. Initial look shows good progress on the auth flow.',
    createdAt: '2024-01-15T12:30:00Z',
    reactions: { thumbsUp: 1, thumbsDown: 0 }
  }
])

const getStateColor = (state: string) => {
  const colors: Record<string, string> = {
    open: 'bg-green-100 text-green-800',
    closed: 'bg-red-100 text-red-800',
    merged: 'bg-purple-100 text-purple-800',
    draft: 'bg-gray-100 text-gray-800'
  }
  return colors[state] || 'bg-gray-100 text-gray-800'
}

const getLabelColor = (label: string) => {
  const colors: Record<string, string> = {
    feature: 'bg-green-100 text-green-800',
    security: 'bg-red-100 text-red-800',
    enhancement: 'bg-blue-100 text-blue-800',
    bug: 'bg-orange-100 text-orange-800'
  }
  return colors[label] || 'bg-gray-100 text-gray-800'
}

const getReviewerStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    approved: 'i-heroicons-check-circle text-green-600',
    pending: 'i-heroicons-clock text-yellow-600',
    changes_requested: 'i-heroicons-x-circle text-red-600'
  }
  return icons[status] || 'i-heroicons-question-mark-circle text-gray-400'
}

const getFileStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    added: 'text-green-600',
    modified: 'text-blue-600',
    deleted: 'text-red-600',
    renamed: 'text-purple-600'
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

const mergePullRequest = () => {
  pullRequest.value.state = 'merged'
}

const closePullRequest = () => {
  pullRequest.value.state = 'closed'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <router-link to="/pull-requests" class="text-gray-600 hover:text-gray-900">
              <i class="i-heroicons-arrow-left mr-2"></i>
              Back to Pull Requests
            </router-link>
            <span class="text-gray-400">•</span>
            <span class="text-sm text-gray-600">PR #{{ prId }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <button
              v-if="pullRequest.state === 'open' && pullRequest.mergeable && !pullRequest.conflicts"
              @click="mergePullRequest"
              class="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              <i class="i-heroicons-merge mr-1"></i>
              Merge Pull Request
            </button>
            <button
              v-if="pullRequest.state === 'open'"
              @click="closePullRequest"
              class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <i class="i-heroicons-x-mark mr-1"></i>
              Close
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
          <!-- PR Details -->
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <!-- PR Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getStateColor(pullRequest.state)]">
                    {{ pullRequest.state }}
                  </span>
                  <span v-if="pullRequest.draft" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Draft
                  </span>
                  <span v-if="!pullRequest.mergeable" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <i class="i-heroicons-exclamation-triangle mr-1"></i>
                    Conflict
                  </span>
                  <h1 class="text-xl font-bold text-gray-900">{{ pullRequest.title }}</h1>
                </div>
                <button
                  @click="isEditing = !isEditing"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <i class="i-heroicons-pencil"></i>
                </button>
              </div>

              <!-- Branch Information -->
              <div class="flex items-center text-sm text-gray-600 mb-4">
                <span class="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{{ pullRequest.baseBranch }}</span>
                <i class="i-heroicons-arrow-right mx-2"></i>
                <span class="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{{ pullRequest.headBranch }}</span>
              </div>

              <!-- Changes Summary -->
              <div class="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span class="flex items-center text-green-600">
                  <i class="i-heroicons-plus mr-1"></i>
                  {{ pullRequest.additions }} additions
                </span>
                <span class="flex items-center text-red-600">
                  <i class="i-heroicons-minus mr-1"></i>
                  {{ pullRequest.deletions }} deletions
                </span>
                <span class="flex items-center">
                  <i class="i-heroicons-document-text mr-1"></i>
                  {{ pullRequest.changedFiles }} files
                </span>
              </div>

              <!-- PR Meta -->
              <div class="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div class="flex items-center space-x-2">
                  <img :src="pullRequest.author.avatar" :alt="pullRequest.author.name" class="w-4 h-4 rounded-full">
                  <span>{{ pullRequest.author.name }}</span>
                </div>
                <span>•</span>
                <span>สร้างเมื่อ {{ formatTime(pullRequest.createdAt) }}</span>
                <span>•</span>
                <span>อัปเดตเมื่อ {{ formatTime(pullRequest.updatedAt) }}</span>
              </div>

              <!-- Labels and Milestone -->
              <div class="flex items-center space-x-3 mb-6">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="label in pullRequest.labels"
                    :key="label"
                    :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getLabelColor(label)]"
                  >
                    {{ label }}
                  </span>
                </div>
                <span v-if="pullRequest.milestone" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <i class="i-heroicons-flag mr-1"></i>
                  {{ pullRequest.milestone }}
                </span>
              </div>

              <!-- Description -->
              <div v-if="!isEditing" class="prose max-w-none text-gray-700">
                <p>{{ pullRequest.description }}</p>
              </div>
              
              <!-- Edit Form -->
              <div v-else class="space-y-4">
                <textarea
                  v-model="pullRequest.description"
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
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="bg-white rounded-lg shadow">
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8 px-6">
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
                <button
                  @click="currentView = 'files'"
                  :class="[
                    'py-4 px-1 border-b-2 text-sm font-medium',
                    currentView === 'files'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  Files Changed ({{ files.length }})
                </button>
              </nav>
            </div>

            <!-- Tab Content -->
            <div class="p-6">
              <!-- Overview Tab -->
              <div v-if="currentView === 'overview'">
                <div class="space-y-6">
                  <!-- Reviewers -->
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Reviewers</h3>
                    <div class="space-y-3">
                      <div v-for="reviewer in pullRequest.reviewers" :key="reviewer.name" class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <img :src="reviewer.avatar" :alt="reviewer.name" class="w-8 h-8 rounded-full">
                          <div>
                            <div class="font-medium text-gray-900">{{ reviewer.name }}</div>
                            <div class="text-sm text-gray-500">{{ reviewer.status }}</div>
                          </div>
                        </div>
                        <i :class="getReviewerStatusIcon(reviewer.status)"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Comments -->
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Comments ({{ comments.length }})</h3>
                    <div class="space-y-4">
                      <div v-for="comment in comments" :key="comment.id" class="flex items-start space-x-3">
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
              </div>

              <!-- Commits Tab -->
              <div v-if="currentView === 'commits'">
                <div class="space-y-4">
                  <div v-for="commit in commits" :key="commit.hash" class="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <img :src="commit.author.avatar" :alt="commit.author.name" class="w-8 h-8 rounded-full">
                      <div>
                        <div class="font-medium text-gray-900">{{ commit.message }}</div>
                        <div class="text-sm text-gray-500">
                          {{ commit.author.name }} • {{ commit.time }}
                        </div>
                        <div class="text-sm text-gray-500">
                          <code class="bg-gray-100 px-1 py-0.5 rounded">{{ commit.hash }}</code>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4 text-xs text-gray-500 ml-auto">
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

              <!-- Files Tab -->
              <div v-if="currentView === 'files'">
                <div class="space-y-2">
                  <div v-for="file in files" :key="file.name" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <i :class="['i-heroicons-document-text', getFileStatusColor(file.status)]"></i>
                      <span class="font-medium text-gray-900">{{ file.name }}</span>
                    </div>
                    <div class="flex items-center space-x-4 text-sm">
                      <span class="text-green-600">+{{ file.additions }}</span>
                      <span class="text-red-600">-{{ file.deletions }}</span>
                      <span class="text-gray-500">{{ file.changes }} changes</span>
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
              <div v-for="assignee in pullRequest.assignees" :key="assignee.name" class="flex items-center space-x-2">
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
              <div v-for="label in pullRequest.labels" :key="label" class="flex items-center justify-between">
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

          <!-- Projects -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Projects</h3>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-700">{{ pullRequest.projectName }}</span>
              <button class="text-gray-400 hover:text-gray-600">
                <i class="i-heroicons-x-mark text-xs"></i>
              </button>
            </div>
          </div>

          <!-- Milestone -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Milestone</h3>
            <div v-if="pullRequest.milestone" class="flex items-center justify-between">
              <span class="text-sm text-gray-700">{{ pullRequest.milestone }}</span>
              <button class="text-gray-400 hover:text-gray-600">
                <i class="i-heroicons-x-mark text-xs"></i>
              </button>
            </div>
            <button v-else class="text-sm text-blue-600 hover:text-blue-800">
              <i class="i-heroicons-plus mr-1"></i>
              Set milestone
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>