<template>
  <div class="text-center py-12">
    <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
      <slot name="icon" />
    </div>
    <p class="text-gray-500">{{ title }}</p>
    <p v-if="description" class="text-gray-400 text-sm mt-1">{{ description }}</p>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>
