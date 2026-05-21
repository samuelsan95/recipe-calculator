<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50" @click.self="$emit('update:modelValue', false)">
        <div :class="panelClass">
          <div v-if="title || $slots.header" class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-gray-800">{{ title }}</h3>
            <button @click="$emit('update:modelValue', false)" class="p-1 text-gray-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'sm', validator: (v) => ['sm', 'md', 'lg'].includes(v) }
})

defineEmits(['update:modelValue'])

const panelClass = computed(() => {
  const base = 'bg-white w-full'
  const sizes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg'
  }
  return [base, sizes[props.size], 'rounded-t-2xl sm:rounded-xl p-5 space-y-4'].join(' ')
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
