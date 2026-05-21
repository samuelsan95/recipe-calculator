<template>
  <component :is="tag" :type="type" :class="classes" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger', 'ghost', 'success'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'button'
  }
})

const classes = computed(() => {
  const base = 'font-medium rounded-lg transition inline-flex items-center justify-center gap-1.5'
  
  const variants = {
    primary: 'bg-primary-600 text-white shadow-lg shadow-primary-200 hover:bg-primary-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    success: 'bg-green-600 text-white hover:bg-green-700'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  return [
    base,
    variants[props.variant],
    sizes[props.size],
    props.fullWidth ? 'w-full' : ''
  ].filter(Boolean).join(' ')
})
</script>
