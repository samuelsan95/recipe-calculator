<template>
  <div class="flex items-center gap-3 mb-4">
    <button v-if="showBack" @click="$router.back()" class="p-1">
      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h2 class="text-xl font-bold text-gray-800 flex-1">{{ title }}</h2>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  showBack: { type: Boolean, default: true }
})
</script>
