<template>
  <AppCard>
    <div class="flex justify-between items-center mb-3">
      <span class="text-sm font-medium text-gray-600">{{ label }}</span>
      <button @click="$emit('remove')" class="text-red-500 p-1">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="space-y-3">
      <div class="flex gap-2">
        <AppSelect
          v-model="localIngredientId"
          :options="ingredientOptions"
          placeholder="Seleccionar..."
          size="sm"
          class="flex-1"
        />
        <AppButton variant="primary" size="sm" @click="$emit('newIngredient')">
          + Nuevo
        </AppButton>
      </div>

      <AppInput
        v-model.number="localQuantity"
        type="number"
        step="0.01"
        min="0"
        label="Cantidad en la receta"
        size="sm"
      />

      <div v-if="ingredientData" class="bg-gray-50 rounded-lg p-2.5 space-y-1 text-sm">
        <div class="flex justify-between text-gray-600">
          <span>Paquete: {{ ingredientData.packageQuantity }} {{ ingredientData.unit }}</span>
          <span>Precio: {{ ingredientData.packagePrice.toFixed(2) }}€</span>
        </div>
        <div class="flex justify-between font-medium text-primary-700 pt-1 border-t border-gray-200">
          <span>Coste:</span>
          <span>{{ cost.toFixed(2) }}€</span>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import AppCard from './AppCard.vue'
import AppInput from './AppInput.vue'
import AppSelect from './AppSelect.vue'
import AppButton from './AppButton.vue'
import { ingredientStoreKey } from '../composables/keys'

const props = defineProps({
  label: { type: String, default: 'Ingrediente' },
  ingredientId: { type: String, default: null },
  quantity: { type: Number, default: 0 }
})

const emit = defineEmits(['update:ingredientId', 'update:quantity', 'remove', 'newIngredient'])

const { ingredients: ingredientsRef, getIngredient } = inject(ingredientStoreKey, {
  ingredients: ref([]),
  getIngredient: () => null
})

const ingredients = computed(() => ingredientsRef.value || [])

const localIngredientId = computed({
  get: () => props.ingredientId,
  set: (v) => emit('update:ingredientId', v)
})

const localQuantity = computed({
  get: () => props.quantity,
  set: (v) => emit('update:quantity', parseFloat(v) || 0)
})

const ingredientOptions = computed(() =>
  ingredients.value.map(i => ({ value: i.id, label: i.name }))
)

const ingredientData = computed(() => getIngredient(props.ingredientId))

const cost = computed(() => {
  if (!ingredientData.value) return 0
  if (!props.quantity || !ingredientData.value.packagePrice) return 0
  const calculated = (props.quantity / ingredientData.value.packageQuantity) * ingredientData.value.packagePrice
  return Math.round(calculated * 100) / 100
})
</script>
