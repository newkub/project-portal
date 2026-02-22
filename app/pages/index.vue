<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'

const now = useNow()
const formattedDate = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss')

const stats = ref([
  { label: 'โปรเจกต์ทั้งหมด', value: '12', icon: 'i-heroicons-folder', color: 'text-blue-600' },
  { label: 'Issues เปิด', value: '24', icon: 'i-heroicons-exclamation-circle', color: 'text-red-600' },
  { label: 'Pull Requests', value: '8', icon: 'i-heroicons-code-bracket', color: 'text-green-600' },
  { label: 'สมาชิก', value: '6', icon: 'i-heroicons-users', color: 'text-purple-600' }
])

const recentProjects = ref([
  { name: 'rust-packages', description: 'Rust packages monorepo', stars: 45, forks: 12, language: 'Rust' },
  { name: 'project-web', description: 'Nuxt.js web application', stars: 23, forks: 8, language: 'TypeScript' },
  { name: 'ai-platform', description: 'AI platform services', stars: 67, forks: 15, language: 'Python' }
])

const recentActivity = ref([
  { type: 'push', message: 'feat: add new dashboard component', repo: 'project-web', time: '2 นาทีที่แล้ว' },
  { type: 'issue', message: 'Fix navigation bug on mobile', repo: 'rust-packages', time: '15 นาทีที่แล้ว' },
  { type: 'pr', message: 'Update dependencies to latest', repo: 'ai-platform', time: '1 ชั่วโมงที่แล้ว' },
  { type: 'merge', message: 'Merge branch feat/auth', repo: 'project-web', time: '3 ชั่วโมงที่แล้ว' }
])

const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    push: 'i-heroicons-arrow-up-circle',
    issue: 'i-heroicons-exclamation-triangle',
    pr: 'i-heroicons-code-bracket-square',
    merge: 'i-heroicons-merge'
  }
  return icons[type] || 'i-heroicons-circle-stack'
}

const getActivityColor = (type: string) => {
  const colors: Record<string, string> = {
    push: 'text-green-600',
    issue: 'text-red-600',
    pr: 'text-blue-600',
    merge: 'text-purple-600'
  }
  return colors[type] || 'text-gray-600'
}

const recentActivityRecord: Record<string, any> = {
  push: { message: 'feat: add new dashboard component', repo: 'project-web', time: '2 นาทีที่แล้ว' },
  issue: { message: 'Fix navigation bug on mobile', repo: 'rust-packages', time: '15 นาทีที่แล้ว' },
  pr: { message: 'Update dependencies to latest', repo: 'ai-platform', time: '1 ชั่วโมงที่แล้ว' },
  merge: { message: 'Merge branch feat/auth', repo: 'project-web', time: '3 ชั่วโมงที่แล้ว' }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900">Project Hub</h1>
            <span class="text-sm text-gray-500">{{ formattedDate }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              สร้างโปรเจกต์ใหม่
            </button>
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Projects -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">โปรเจกต์ล่าสุด</h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div v-for="project in recentProjects" :key="project.name" class="p-6 hover:bg-gray-50">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h3 class="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        {{ project.name }}
                      </h3>
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {{ project.language }}
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-600">{{ project.description }}</p>
                    <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span class="flex items-center">
                        <i class="i-heroicons-star mr-1"></i>
                        {{ project.stars }}
                      </span>
                      <span class="flex items-center">
                        <i class="i-heroicons-fork mr-1"></i>
                        {{ project.forks }}
                      </span>
                    </div>
                  </div>
                  <button class="ml-4 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
            <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button class="text-sm font-medium text-blue-600 hover:text-blue-800">
                ดูโปรเจกต์ทั้งหมด →
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">กิจกรรมล่าสุด</h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div v-for="activity in recentActivity" :key="activity.message" class="p-4">
                <div class="flex items-start space-x-3">
                  <div :class="[getActivityIcon(activity.type), getActivityColor(activity.type), 'text-xl mt-0.5']"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900 truncate">{{ activity.message }}</p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ activity.repo }} • {{ activity.time }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button class="text-sm font-medium text-blue-600 hover:text-blue-800">
                ดูกิจกรรมทั้งหมด →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">การกระทำด่วน</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              <i class="i-heroicons-plus-circle text-blue-600 text-xl mb-2"></i>
              <h3 class="text-sm font-medium text-gray-900">สร้างโปรเจกต์ใหม่</h3>
              <p class="text-xs text-gray-500 mt-1">เริ่มต้นโปรเจกต์ใหม่</p>
            </button>
            <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              <i class="i-heroicons-document-plus text-green-600 text-xl mb-2"></i>
              <h3 class="text-sm font-medium text-gray-900">สร้าง Issue</h3>
              <p class="text-xs text-gray-500 mt-1">รายงานปัญหาหรือข้อเสนอแนะ</p>
            </button>
            <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              <i class="i-heroicons-arrow-right-on-rectangle text-purple-600 text-xl mb-2"></i>
              <h3 class="text-sm font-medium text-gray-900">สร้าง Pull Request</h3>
              <p class="text-xs text-gray-500 mt-1">ส่งโค้ดสำหรับ review</p>
            </button>
            <button class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
              <i class="i-heroicons-user-plus text-orange-600 text-xl mb-2"></i>
              <h3 class="text-sm font-medium text-gray-900">เชิญสมาชิก</h3>
              <p class="text-xs text-gray-500 mt-1">เพิ่มผู้ร่วมทีมใหม่</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>