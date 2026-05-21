<template>
  <div>
    <AppPageHeader title="Nueva receta" :show-back="true" />

    <form @submit.prevent="saveRecipe" class="space-y-4">
      <AppCard class="space-y-4">
        <AppInput v-model="form.name" label="Nombre de la receta" placeholder="Ej: Tarta de chocolate" required />

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
          <div class="grid grid-cols-3 gap-2">
            <button type="button" v-for="size in sizes" :key="size" @click="form.size = size" :class="[
              'py-2.5 rounded-lg text-sm font-medium border transition',
              form.size === size ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300'
            ]">
              {{ size }}
            </button>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-semibold text-gray-800">Ingredientes</h3>
          <AppButton variant="ghost" size="sm" @click="addIngredient">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Añadir
          </AppButton>
        </div>

        <AppEmptyState v-if="form.ingredients.length === 0" title="Añade ingredientes a la receta" />

        <div v-else class="space-y-3">
          <IngredientCostRow
            v-for="(ing, index) in form.ingredients"
            :key="index"
            :label="`Ingrediente ${index + 1}`"
            :ingredient-id="ing.ingredientId"
            :quantity="ing.quantity"
            :ingredients="ingredients"
            :get-ingredient="getIngredient"
            :calculate-cost="calculateRowCost"
            @update:ingredient-id="ing.ingredientId = $event"
            @update:quantity="ing.quantity = $event"
            @remove="removeIngredient(index)"
            @new-ingredient="openNewIngredient(index)"
          />
        </div>
      </AppCard>

      <AppCard v-if="form.ingredients.length > 0" variant="primary">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-800">Coste total</span>
          <span class="text-2xl font-bold text-primary-600">{{ total.toFixed(2) }}€</span>
        </div>
      </AppCard>

      <AppButton type="submit" variant="primary" size="lg" full-width>
        {{ isEditing ? 'Guardar cambios' : 'Crear receta' }}
      </AppButton>
    </form>

    <IngredientFormModal v-model="showIngredientModal" @save="saveNewIngredient" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'
import { useIngredientStore } from '../stores/ingredientStore'
import AppPageHeader from '../components/AppPageHeader.vue'
import AppCard from '../components/AppCard.vue'
import AppInput from '../components/AppInput.vue'
import AppButton from '../components/AppButton.vue'
import AppEmptyState from '../components/AppEmptyState.vue'
import IngredientCostRow from '../components/IngredientCostRow.vue'
import IngredientFormModal from '../components/IngredientFormModal.vue'

const route = useRoute()
const router = useRouter()
const { getRecipe, addRecipe, updateRecipe, calculateIngredientCost } = useRecipeStore()
const { ingredients, getIngredient, addIngredient: addNewIngredient } = useIngredientStore()

const isEditing = computed(() => !!route.params.id)
const sizes = ['pequeña', 'mediana', 'grande']

const showIngredientModal = ref(false)
const targetIngredientIndex = ref(null)

const form = ref({
  name: '',
  size: 'mediana',
  ingredients: []
})

onMounted(() => {
  if (isEditing.value) {
    const recipe = getRecipe(route.params.id)
    if (recipe) {
      form.value = {
        name: recipe.name,
        size: recipe.size,
        ingredients: [...recipe.ingredients.map(i => ({ ...i }))]
      }
    }
  }
})

function addIngredient() {
  form.value.ingredients.push({ ingredientId: '', quantity: 0 })
}

function removeIngredient(index) {
  form.value.ingredients.splice(index, 1)
}

function calculateRowCost(ingredientId, quantity) {
  const ingredientData = getIngredient(ingredientId)
  return calculateIngredientCost({ quantity }, ingredientData)
}

const total = computed(() => {
  return form.value.ingredients.reduce((sum, ing) => {
    return sum + calculateRowCost(ing.ingredientId, ing.quantity)
  }, 0)
})

function openNewIngredient(index) {
  targetIngredientIndex.value = index
  showIngredientModal.value = true
}

function saveNewIngredient(data) {
  const newIng = addNewIngredient(data)
  if (targetIngredientIndex.value !== null) {
    form.value.ingredients[targetIngredientIndex.value].ingredientId = newIng.id
  }
  targetIngredientIndex.value = null
}

function saveRecipe() {
  const recipeData = {
    name: form.value.name,
    size: form.value.size,
    ingredients: form.value.ingredients.filter(i => i.ingredientId && i.quantity > 0)
  }

  if (isEditing.value) {
    updateRecipe(route.params.id, recipeData)
  } else {
    addRecipe(recipeData)
  }

  router.push('/')
}
</script>
