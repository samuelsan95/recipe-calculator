<template>
  <AppModal v-model="visible" :title="isEditing ? 'Editar ingrediente' : 'Nuevo ingrediente'">
    <form @submit.prevent="handleSubmit" class="space-y-3">
      <AppInput v-model="form.name" label="Nombre" placeholder="Ej: Huevos" required />

      <div class="grid grid-cols-2 gap-3">
        <AppInput v-model.number="form.packageQuantity" type="number" step="0.01" min="0" label="Cantidad paquete" required />
        <AppSelect v-model="form.unit" label="Unidad" :options="unitOptions" required />
      </div>

      <AppInput v-model.number="form.packagePrice" type="number" step="0.01" min="0" label="Precio del paquete (€)" placeholder="0.00" required />

      <AppButton type="submit" variant="primary" size="lg" full-width>
        {{ isEditing ? 'Guardar cambios' : 'Añadir y seleccionar' }}
      </AppButton>
    </form>
  </AppModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppModal from './AppModal.vue'
import AppInput from './AppInput.vue'
import AppSelect from './AppSelect.vue'
import AppButton from './AppButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  ingredient: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'save'])

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const isEditing = computed(() => !!props.ingredient)

const unitOptions = [
  { value: 'g', label: 'gramos (g)' },
  { value: 'ml', label: 'mililitros (ml)' },
  { value: 'unidades', label: 'unidades' }
]

const form = ref({
  name: '',
  packageQuantity: 0,
  unit: 'g',
  packagePrice: 0
})

watch(() => props.modelValue, (open) => {
  if (open) {
    if (props.ingredient) {
      form.value = { ...props.ingredient }
    } else {
      form.value = { name: '', packageQuantity: 0, unit: 'g', packagePrice: 0 }
    }
  }
})

function handleSubmit() {
  emit('save', { ...form.value })
  visible.value = false
}
</script>
