<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const currentBranch = ref('main')

const branches = ref([
  {
    name: 'main',
    protected: true,
    default: true,
    aheadBy: 0,
    behindBy: 0,
    lastCommit: {
      hash: 'a1b2c3d',
      message: 'feat: add new feature',
      author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
      time: '2 นาทีที่แล้ว'
    }
  },
  {
    name: 'develop',
    protected: false,
    default: false,
    aheadBy: 5,
    behindBy: 0,
    lastCommit: {
      hash: 'e4f5g6h',
      message: 'fix: resolve bug in authentication',
      author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
      time: '1 ชั่วโมงที่แล้ว'
    }
  },
  {
    name: 'feature/auth',
    protected: false,
    default: false,
    aheadBy: 3,
    behindBy: 2,
    lastCommit: {
      hash: 'i7j8k9l',
      message: 'feat: implement user authentication',
      author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
      time: '3 ชั่วโมงที่แล้ว'
    }
  },
  {
    name: 'feature/dashboard',
    protected: false,
    default: false,
    aheadBy: 8,
    behindBy: 0,
    lastCommit: {
      hash: 'm0n1o2p',
      message: 'feat: add dashboard components',
      author: { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
      time: '5 ชั่วโมงที่แล้ว'
    }
  },
  {
    name: 'hotfix/security-patch',
    protected: false,
    default: false,
    aheadBy: 1,
    behindBy: 0,
    lastCommit: {
      hash: 'q3r4s5t',
      message: 'fix: security vulnerability in auth',
      author: { name: 'Mike Brown', avatar: 'https://avatars.githubusercontent.com/u/234567?v=4' },
      time: '30 นาทีที่แล้ว'
    }
  }
])

const filteredBranches = computed(() => {
  if (!searchQuery.value) return branches.value
  
  const query = searchQuery.value.toLowerCase()
  return branches.value.filter(branch => 
    branch.name.toLowerCase().includes(query) ||
    branch.lastCommit.message.toLowerCase().includes(query) ||
    branch.lastCommit.author.name.toLowerCase().includes(query)
  )
})

const createBranch = () => {
  console.log('Creating new branch...')
}

const deleteBranch = (branchName: string) => {
  console.log('Deleting branch:', branchName)
}

const mergeBranch = (branchName: string) => {
  console.log('Merging branch:', branchName)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Branches</h1>
            <p class="text-gray-600 mt-1">จัดการ branches ทั้งหมดใน repository</p>
          </div>
          <button @click="createBranch" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            <i class="i-heroicons-plus mr-1"></i>
            New Branch
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search -->
      <div class="mb-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search branches..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
          <i class="i-heroicons-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
        </div>
      </div>

      <!-- Branches List -->
      <div class="bg-white rounded-lg shadow">
        <div class="divide-y divide-gray-200">
          <div v-for="branch in filteredBranches" :key="branch.name" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h3 class="text-lg font-medium text-gray-900">{{ branch.name }}</h3>
                  <span v-if="branch.default" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i class="i-heroicons-star mr-1"></i>
                    Default
                  </span>
                  <span v-if="branch.protected" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <i class="i-heroicons-shield-check mr-1"></i>
                    Protected
                  </span>
                </div>
                
                <!-- Branch Status -->
                <div class="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span v-if="branch.aheadBy > 0" class="text-green-600">
                    {{ branch.aheadBy }} ahead
                  </span>
                  <span v-if="branch.behindBy > 0" class="text-red-600">
                    {{ branch.behindBy }} behind
                  </span>
                  <span v-if="branch.aheadBy === 0 && branch.behindBy === 0" class="text-gray-600">
                    Up to date
                  </span>
                </div>

                <!-- Last Commit -->
                <div class="mt-3">
                  <div class="flex items-center space-x-3">
                    <img :src="branch.lastCommit.author.avatar" :alt="branch.lastCommit.author.name" class="w-6 h-6 rounded-full">
                    <div>
                      <div class="text-sm text-gray-900">{{ branch.lastCommit.message }}</div>
                      <div class="text-xs text-gray-500">
                        {{ branch.lastCommit.author.name }} • {{ branch.lastCommit.time }}
                        <span class="ml-2 font-mono bg-gray-100 px-1 py-0.5 rounded">{{ branch.lastCommit.hash }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-2 ml-4">
                <button 
                  v-if="!branch.default && !branch.protected && branch.name !== currentBranch"
                  @click="mergeBranch(branch.name)"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <i class="i-heroicons-arrow-right-on-rectangle mr-1"></i>
                  Merge
                </button>
                <button 
                  v-if="!branch.default && !branch.protected"
                  @click="deleteBranch(branch.name)"
                  class="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                >
                  <i class="i-heroicons-trash mr-1"></i>
                  Delete
                </button>
                <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                  <i class="i-heroicons-ellipsis-horizontal"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBranches.length === 0" class="text-center py-12">
        <i class="i-heroicons-code-branch text-gray-400 text-5xl mx-auto mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบ branches</h3>
        <p class="text-gray-600 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหา</p>
        <button
          @click="searchQuery = ''"
          class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
        >
          ล้างการค้นหา
        </button>
      </div>
    </main>
  </div>
</template>