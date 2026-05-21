<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :step="step"
      :min="min"
      :class="inputClasses"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  step: { type: [String, Number], default: undefined },
  min: { type: [String, Number], default: undefined },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md'].includes(v) },
  id: { type: String, default: () => `input-${Math.random().toString(36).slice(2, 9)}` }
})

defineEmits(['update:modelValue'])

const inputClasses = computed(() => {
  const base = 'w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
  const sizes = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2.5'
  }
  return [base, sizes[props.size]].join(' ')
})
</script>
