<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :class="selectClasses"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Seleccionar...' },
  required: { type: Boolean, default: false },
  options: { type: Array, default: () => [] },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md'].includes(v) },
  id: { type: String, default: () => `select-${Math.random().toString(36).slice(2, 9)}` }
})

defineEmits(['update:modelValue'])

const selectClasses = computed(() => {
  const base = 'w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
  const sizes = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2.5'
  }
  return [base, sizes[props.size]].join(' ')
})
</script>
