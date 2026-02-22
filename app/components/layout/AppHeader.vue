<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'i-heroicons-home' },
  { name: 'Projects', href: '/projects', icon: 'i-heroicons-folder' },
  { name: 'Issues', href: '/issues', icon: 'i-heroicons-exclamation-circle' },
  { name: 'Pull Requests', href: '/pull-requests', icon: 'i-heroicons-arrow-right-on-rectangle' },
  { name: 'Code', href: '/code', icon: 'i-heroicons-code-bracket' },
  { name: 'Team', href: '/team', icon: 'i-heroicons-users' },
  { name: 'Settings', href: '/settings', icon: 'i-heroicons-cog-6-tooth' }
]

const notifications = ref([
  { id: 1, title: 'New pull request', message: 'Bob Wilson opened PR #42', time: '5 นาทีที่แล้ว', read: false },
  { id: 2, title: 'Issue assigned', message: 'You were assigned to issue #123', time: '1 ชั่วโมงที่แล้ว', read: false },
  { id: 3, title: 'Build failed', message: 'CI/CD pipeline failed for main branch', time: '2 ชั่วโมงที่แล้ว', read: true }
])

const isNotificationOpen = ref(false)
const isProfileOpen = ref(false)

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const currentPath = computed(() => route.path)
</script>

<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left side - Logo and Navigation -->
        <div class="flex items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i class="i-heroicons-cube text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold text-gray-900">ProjectHub</span>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:ml-8 md:flex md:space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                'inline-flex items-center px-1 pt-1 text-sm font-medium',
                currentPath === item.href
                  ? 'border-b-2 border-indigo-500 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <i :class="[item.icon, 'mr-2']"></i>
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Right side - Search, Notifications, Profile -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:block">
            <div class="relative">
              <input
                type="text"
                placeholder="Search projects, issues, or people..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
              <i class="i-heroicons-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          <!-- Create New -->
          <button class="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            <i class="i-heroicons-plus mr-1"></i>
            New
          </button>

          <!-- Notifications -->
          <div class="relative">
            <button
              @click="isNotificationOpen = !isNotificationOpen"
              class="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <i class="i-heroicons-bell text-xl"></i>
              <span
                v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ unreadCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              v-if="isNotificationOpen"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="p-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
                  <button
                    @click="markAllAsRead"
                    class="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  @click="markAsRead(notification.id)"
                  :class="[
                    'p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100',
                    !notification.read ? 'bg-blue-50' : ''
                  ]"
                >
                  <div class="flex items-start">
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
                    </div>
                    <div v-if="!notification.read" class="ml-2">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border-t border-gray-200">
                <button class="w-full text-center text-sm text-indigo-600 hover:text-indigo-800">
                  View all notifications
                </button>
              </div>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="isProfileOpen = !isProfileOpen"
              class="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <img
                src="https://avatars.githubusercontent.com/u/123456?v=4"
                alt="Profile"
                class="w-8 h-8 rounded-full"
              >
              <i class="i-heroicons-chevron-down text-sm"></i>
            </button>

            <!-- Profile Dropdown -->
            <div
              v-if="isProfileOpen"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="p-4 border-b border-gray-200">
                <div class="flex items-center space-x-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/123456?v=4"
                    alt="Profile"
                    class="w-10 h-10 rounded-full"
                  >
                  <div>
                    <p class="text-sm font-medium text-gray-900">John Doe</p>
                    <p class="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                </div>
              </div>
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i class="i-heroicons-user mr-2"></i>
                  Your Profile
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i class="i-heroicons-cog-6-tooth mr-2"></i>
                  Settings
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i class="i-heroicons-credit-card mr-2"></i>
                  Billing
                </a>
                <div class="border-t border-gray-100"></div>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i class="i-heroicons-arrow-right-on-rectangle mr-2"></i>
                  Sign out
                </a>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <i class="i-heroicons-bars-3 text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'flex items-center px-3 py-2 text-base font-medium rounded-md',
              currentPath === item.href
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
            @click="isMobileMenuOpen = false"
          >
            <i :class="[item.icon, 'mr-3']"></i>
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Close dropdowns when clicking outside -->
    <div
      v-if="isNotificationOpen || isProfileOpen"
      class="fixed inset-0 z-40"
      @click="isNotificationOpen = false; isProfileOpen = false"
    ></div>
  </header>
</template>