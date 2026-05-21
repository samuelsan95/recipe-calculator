<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default', validator: (v) => ['default', 'primary', 'muted'].includes(v) },
  padding: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg', 'none'].includes(v) },
  clickable: { type: Boolean, default: false }
})

const classes = computed(() => {
  const base = 'rounded-xl border'
  
  const variants = {
    default: 'bg-white shadow-sm border-gray-100',
    primary: 'bg-primary-50 border-primary-200',
    muted: 'bg-gray-50 border-gray-200'
  }
  
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    none: ''
  }
  
  return [
    base,
    variants[props.variant],
    paddings[props.padding],
    props.clickable ? 'cursor-pointer hover:shadow-md transition' : ''
  ].filter(Boolean).join(' ')
})
</script>
