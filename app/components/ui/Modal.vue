<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  backdrop?: boolean
  centered?: boolean
  showFooter?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  backdrop: true,
  centered: true,
  showFooter: false,
  persistent: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  confirm: []
  cancel: []
}>()

const isVisible = ref(false)
const modalRef = ref<HTMLElement>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }
  return sizes[props.size]
})

const positionClasses = computed(() => {
  return props.centered ? 'items-center' : 'items-start pt-8'
})

const closeModal = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget && props.backdrop && !props.persistent) {
    closeModal()
  }
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  closeModal()
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closable && !props.persistent) {
    closeModal()
  }
}

// Watch for modelValue changes
watch(() => props.modelValue, async (newValue) => {
  if (newValue) {
    await nextTick()
    isVisible.value = true
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
  } else {
    isVisible.value = false
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  }
}, { immediate: true })

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isVisible"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div
          v-if="backdrop"
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        ></div>

        <!-- Modal Container -->
        <div :class="['min-h-screen px-4 text-center', positionClasses]">
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="isVisible"
              ref="modalRef"
              :class="[
                'inline-block w-full text-left align-middle transition-all transform bg-white rounded-lg shadow-xl',
                sizeClasses
              ]"
            >
              <!-- Header -->
              <div v-if="title || closable" class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 v-if="title" class="text-lg font-medium text-gray-900">
                  {{ title }}
                </h3>
                <button
                  v-if="closable"
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <i class="i-heroicons-x-mark text-xl"></i>
                </button>
              </div>

              <!-- Body -->
              <div class="px-6 py-4">
                <slot></slot>
              </div>

              <!-- Footer -->
              <div v-if="showFooter || $slots.footer" class="flex items-center justify-end px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <slot name="footer">
                  <button
                    @click="handleCancel"
                    class="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleConfirm"
                    class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Confirm
                  </button>
                </slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>