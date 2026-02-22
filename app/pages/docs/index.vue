<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = ref([
  { id: 'all', name: 'ทั้งหมด', count: 45 },
  { id: 'getting-started', name: 'Getting Started', count: 8 },
  { id: 'api', name: 'API', count: 12 },
  { id: 'guides', name: 'คู่มือ', count: 15 },
  { id: 'architecture', name: 'สถาปัตยกรรม', count: 10 }
])

const documents = ref([
  {
    id: 1,
    title: 'การเริ่มต้นใช้งาน',
    description: 'คู่มือการติดตั้งและเริ่มต้นใช้งานระบบ ProjectHub',
    category: 'getting-started',
    author: { name: 'John Doe', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
    updatedAt: '2024-01-15T10:30:00Z',
    readTime: '5 นาที',
    views: 1234,
    tags: ['setup', 'installation', 'beginner']
  },
  {
    id: 2,
    title: 'API Reference',
    description: 'เอกสารอ้างอิง API ทั้งหมดสำหรับการพัฒนาแอปพลิเคชัน',
    category: 'api',
    author: { name: 'Jane Smith', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
    updatedAt: '2024-01-14T15:45:00Z',
    readTime: '15 นาที',
    views: 892,
    tags: ['api', 'reference', 'development']
  },
  {
    id: 3,
    title: 'สถาปัตยกรรมระบบ',
    description: 'ภาพรวมของสถาปัตยกรรมและการออกแบบระบบ ProjectHub',
    category: 'architecture',
    author: { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
    updatedAt: '2024-01-13T09:20:00Z',
    readTime: '10 นาที',
    views: 567,
    tags: ['architecture', 'design', 'system']
  },
  {
    id: 4,
    title: 'คู่มือการใช้งาน Dashboard',
    description: 'วิธีการใช้งานหน้า Dashboard และฟีเจอร์ต่างๆ',
    category: 'guides',
    author: { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
    updatedAt: '2024-01-12T14:30:00Z',
    readTime: '8 นาที',
    views: 445,
    tags: ['dashboard', 'ui', 'user-guide']
  },
  {
    id: 5,
    title: 'การจัดการ Projects',
    description: 'วิธีการสร้าง แก้ไข และจัดการโปรเจกต์ในระบบ',
    category: 'guides',
    author: { name: 'Mike Brown', avatar: 'https://avatars.githubusercontent.com/u/234567?v=4' },
    updatedAt: '2024-01-11T11:15:00Z',
    readTime: '12 นาที',
    views: 789,
    tags: ['projects', 'management', 'tutorial']
  }
])

const filteredDocuments = computed(() => {
  let filtered = documents.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(doc => doc.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc => 
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'getting-started': 'bg-green-100 text-green-800',
    'api': 'bg-blue-100 text-blue-800',
    'guides': 'bg-purple-100 text-purple-800',
    'architecture': 'bg-orange-100 text-orange-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'เมื่อวานนี้'
  if (diffDays <= 7) return `${diffDays} วันที่แล้ว`
  return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">เอกสารประกอบ</h1>
            <p class="text-gray-600 mt-1">คู่มือและเอกสารสำหรับการใช้งานระบบ ProjectHub</p>
          </div>
          <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            <i class="i-heroicons-plus mr-1"></i>
            เขียนเอกสาร
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="mb-8 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาเอกสาร..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
          <i class="i-heroicons-magnifying-glass absolute left-3 top-3.5 text-gray-400"></i>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              selectedCategory === category.id
                ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ category.name }}
            <span class="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Documents Grid -->
      <div v-if="filteredDocuments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doc in filteredDocuments"
          :key="doc.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 cursor-pointer"
        >
          <!-- Document Header -->
          <div class="flex items-start justify-between mb-3">
            <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', getCategoryColor(doc.category)]">
              {{ categories.find(c => c.id === doc.category)?.name }}
            </span>
            <button class="text-gray-400 hover:text-gray-600">
              <i class="i-heroicons-bookmark"></i>
            </button>
          </div>

          <!-- Document Content -->
          <h3 class="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600">
            {{ doc.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ doc.description }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="tag in doc.tags"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Document Footer -->
          <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <img :src="doc.author.avatar" :alt="doc.author.name" class="w-5 h-5 rounded-full">
              <span>{{ doc.author.name }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="flex items-center">
                <i class="i-heroicons-clock mr-1"></i>
                {{ doc.readTime }}
              </span>
              <span class="flex items-center">
                <i class="i-heroicons-eye mr-1"></i>
                {{ doc.views }}
              </span>
            </div>
          </div>

          <!-- Updated Time -->
          <div class="mt-2 text-xs text-gray-400">
            อัปเดตเมื่อ {{ formatTime(doc.updatedAt) }}
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <i class="i-heroicons-document-text text-gray-400 text-5xl mx-auto mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบเอกสาร</h3>
        <p class="text-gray-600 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือหมวดหมู่</p>
        <button
          @click="searchQuery = ''; selectedCategory = 'all'"
          class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
        >
          ล้างตัวกรอง
        </button>
      </div>

      <!-- Quick Links -->
      <div class="mt-12 bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">ลิงก์ด่วน</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/docs/getting-started" class="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <i class="i-heroicons-rocket-launch text-green-600 mr-3"></i>
            <div>
              <div class="font-medium">Getting Started</div>
              <div class="text-sm text-gray-500">เริ่มต้นใช้งาน</div>
            </div>
          </a>
          <a href="/docs/api" class="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <i class="i-heroicons-code-bracket text-blue-600 mr-3"></i>
            <div>
              <div class="font-medium">API Reference</div>
              <div class="text-sm text-gray-500">เอกสาร API</div>
            </div>
          </a>
          <a href="/docs/guides" class="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <i class="i-heroicons-book-open text-purple-600 mr-3"></i>
            <div>
              <div class="font-medium">คู่มือ</div>
              <div class="text-sm text-gray-500">วิธีใช้งาน</div>
            </div>
          </a>
          <a href="/docs/architecture" class="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <i class="i-heroicons-building-office text-orange-600 mr-3"></i>
            <div>
              <div class="font-medium">สถาปัตยกรรม</div>
              <div class="text-sm text-gray-500">โครงสร้างระบบ</div>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>