<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedMethod = ref('all')

const categories = ref([
  { id: 'all', name: 'ทั้งหมด', count: 45 },
  { id: 'authentication', name: 'Authentication', count: 8 },
  { id: 'users', name: 'Users', count: 12 },
  { id: 'projects', name: 'Projects', count: 15 },
  { id: 'issues', name: 'Issues', count: 10 }
])

const methods = ref([
  { id: 'all', name: 'ทั้งหมด' },
  { id: 'GET', name: 'GET', color: 'bg-green-100 text-green-800' },
  { id: 'POST', name: 'POST', color: 'bg-blue-100 text-blue-800' },
  { id: 'PUT', name: 'PUT', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'DELETE', name: 'DELETE', color: 'bg-red-100 text-red-800' }
])

const endpoints = ref([
  {
    id: 1,
    method: 'POST',
    path: '/api/auth/login',
    category: 'authentication',
    summary: 'User login',
    description: 'Authenticate user with email and password',
    parameters: [
      { name: 'email', type: 'string', required: true, description: 'User email address' },
      { name: 'password', type: 'string', required: true, description: 'User password' }
    ],
    responses: {
      '200': { description: 'Login successful', example: { token: 'jwt_token_here', user: { id: 1, email: 'user@example.com' } } },
      '401': { description: 'Invalid credentials', example: { error: 'Invalid email or password' } }
    },
    examples: [
      { language: 'curl', code: 'curl -X POST https://api.example.com/auth/login -H "Content-Type: application/json" -d \'{"email":"user@example.com","password":"password"}}\'' },
      { language: 'javascript', code: 'fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "user@example.com", password: "password" }) })' }
    ]
  },
  {
    id: 2,
    method: 'GET',
    path: '/api/users',
    category: 'users',
    summary: 'Get all users',
    description: 'Retrieve a list of all users',
    parameters: [
      { name: 'page', type: 'number', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'number', required: false, description: 'Number of users per page (default: 20)' }
    ],
    responses: {
      '200': { description: 'Users retrieved successfully', example: { users: [{ id: 1, email: 'user@example.com' }], pagination: { page: 1, total: 100 } } }
    },
    examples: [
      { language: 'curl', code: 'curl -X GET https://api.example.com/api/users?page=1&limit=20' },
      { language: 'javascript', code: 'fetch("/api/users?page=1&limit=20")' }
    ]
  },
  {
    id: 3,
    method: 'POST',
    path: '/api/projects',
    category: 'projects',
    summary: 'Create project',
    description: 'Create a new project',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Project name' },
      { name: 'description', type: 'string', required: false, description: 'Project description' }
    ],
    responses: {
      '201': { description: 'Project created successfully', example: { id: 1, name: 'New Project', description: 'Project description' } }
    },
    examples: [
      { language: 'curl', code: 'curl -X POST https://api.example.com/api/projects -H "Content-Type: application/json" -d \'{"name":"New Project","description":"Project description"}}\'' },
      { language: 'javascript', code: 'fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "New Project", description: "Project description" }) })' }
    ]
  },
  {
    id: 4,
    method: 'GET',
    path: '/api/issues',
    category: 'issues',
    summary: 'Get issues',
    description: 'Retrieve a list of issues',
    parameters: [
      { name: 'status', type: 'string', required: false, description: 'Filter by status (open, closed)' },
      { name: 'assignee', type: 'number', required: false, description: 'Filter by assignee ID' }
    ],
    responses: {
      '200': { description: 'Issues retrieved successfully', example: { issues: [{ id: 1, title: 'Bug fix', status: 'open' }] } }
    },
    examples: [
      { language: 'curl', code: 'curl -X GET "https://api.example.com/api/issues?status=open"' },
      { language: 'javascript', code: 'fetch("/api/issues?status=open")' }
    ]
  }
])

const filteredEndpoints = computed(() => {
  let filtered = endpoints.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(endpoint => endpoint.category === selectedCategory.value)
  }

  // Filter by method
  if (selectedMethod.value !== 'all') {
    filtered = filtered.filter(endpoint => endpoint.method === selectedMethod.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(endpoint => 
      endpoint.path.toLowerCase().includes(query) ||
      endpoint.summary.toLowerCase().includes(query) ||
      endpoint.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getMethodColor = (method: string) => {
  const colors: Record<string, string> = {
    GET: 'bg-green-100 text-green-800',
    POST: 'bg-blue-100 text-blue-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    DELETE: 'bg-red-100 text-red-800'
  }
  return colors[method] || 'bg-gray-100 text-gray-800'
}

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
  console.log('Code copied:', code)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">API Documentation</h1>
            <p class="text-gray-600 mt-1">Complete API reference for ProjectHub</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-document-arrow-down mr-1"></i>
              Download
            </button>
            <button class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="i-heroicons-link mr-1"></i>
              OpenAPI
            </button>
          </div>
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
            placeholder="Search endpoints..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
          <i class="i-heroicons-magnifying-glass absolute left-3 top-3.5 text-gray-400"></i>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4">
          <!-- Category Filter -->
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Category:</label>
            <select 
              v-model="selectedCategory"
              class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.count }})
              </option>
            </select>
          </div>

          <!-- Method Filter -->
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Method:</label>
            <select 
              v-model="selectedMethod"
              class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option v-for="method in methods" :key="method.id" :value="method.id">
                {{ method.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- API Endpoints -->
      <div v-if="filteredEndpoints.length > 0" class="space-y-8">
        <div v-for="endpoint in filteredEndpoints" :key="endpoint.id" class="bg-white rounded-lg shadow">
          <!-- Endpoint Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <span :class="['px-2 py-1 rounded text-xs font-medium', getMethodColor(endpoint.method)]">
                {{ endpoint.method }}
              </span>
              <code class="text-lg font-mono text-gray-900">{{ endpoint.path }}</code>
              <span class="text-sm text-gray-600">{{ endpoint.summary }}</span>
            </div>
          </div>

          <!-- Endpoint Content -->
          <div class="p-6 space-y-6">
            <!-- Description -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <p class="text-gray-600">{{ endpoint.description }}</p>
            </div>

            <!-- Parameters -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">Parameters</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="param in endpoint.parameters" :key="param.name">
                      <td class="px-4 py-2 text-sm font-mono text-gray-900">{{ param.name }}</td>
                      <td class="px-4 py-2 text-sm text-gray-600">{{ param.type }}</td>
                      <td class="px-4 py-2 text-sm">
                        <span :class="param.required ? 'text-red-600' : 'text-gray-400'">
                          {{ param.required ? 'Required' : 'Optional' }}
                        </span>
                      </td>
                      <td class="px-4 py-2 text-sm text-gray-600">{{ param.description }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Responses -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">Responses</h3>
              <div class="space-y-3">
                <div v-for="(response, status) in endpoint.responses" :key="status" class="border border-gray-200 rounded-lg">
                  <div class="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <div class="flex items-center space-x-2">
                      <span class="font-mono text-sm font-medium">{{ status }}</span>
                      <span class="text-sm text-gray-600">{{ response?.description }}</span>
                    </div>
                  </div>
                  <div class="p-4">
                    <pre class="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto"><code>{{ JSON.stringify(response?.example, null, 2) }}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <!-- Examples -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">Examples</h3>
              <div class="space-y-4">
                <div v-for="example in endpoint.examples" :key="example.language" class="border border-gray-200 rounded-lg">
                  <div class="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-900">{{ example.language }}</span>
                    <button 
                      @click="copyCode(example.code)"
                      class="text-xs text-gray-600 hover:text-gray-900"
                    >
                      <i class="i-heroicons-clipboard-document mr-1"></i>
                      Copy
                    </button>
                  </div>
                  <div class="p-4">
                    <pre class="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto"><code>{{ example.code }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <i class="i-heroicons-code-bracket text-gray-400 text-5xl mx-auto mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">ไม่พบ endpoints</h3>
        <p class="text-gray-600 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหา</p>
        <button
          @click="searchQuery = ''; selectedCategory = 'all'; selectedMethod = 'all'"
          class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
        >
          ล้างตัวกรอง
        </button>
      </div>
    </main>
  </div>
</template>