<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 max-w-sm w-full">
          <h3 class="font-semibold text-gray-800 mb-2">{{ title }}</h3>
          <p class="text-gray-600 mb-4">{{ message }}</p>
          <div class="flex gap-3">
            <AppButton variant="secondary" full-width @click="$emit('update:modelValue', false)">
              {{ cancelText }}
            </AppButton>
            <AppButton variant="danger" full-width @click="$emit('confirm')">
              {{ confirmText }}
            </AppButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import AppButton from './AppButton.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmar acción' },
  message: { type: String, required: true },
  cancelText: { type: String, default: 'Cancelar' },
  confirmText: { type: String, default: 'Eliminar' }
})

defineEmits(['update:modelValue', 'confirm'])
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
