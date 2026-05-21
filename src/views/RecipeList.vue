<template>
  <div>
    <AppPageHeader title="Mis Recetas" :show-back="false" />

    <AppEmptyState v-if="recipes.length === 0" title="No hay recetas todavía">
      <template #icon>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </template>
      <template #action>
        <router-link to="/recipe/new">
          <AppButton variant="primary" class="mt-4">Crear primera receta</AppButton>
        </router-link>
      </template>
    </AppEmptyState>

    <div v-else class="space-y-3">
      <AppCard v-for="recipe in recipes" :key="recipe.id" clickable>
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800">{{ recipe.name }}</h3>
            <span class="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">
              {{ recipe.size }}
            </span>
          </div>
          <p class="text-lg font-bold text-primary-600">{{ calculateRecipeTotal(recipe).toFixed(2) }}€</p>
        </div>
        <p class="text-sm text-gray-500 mt-2">{{ recipe.ingredients.length }} ingrediente{{ recipe.ingredients.length !== 1 ? 's' : '' }}</p>
        <div class="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <router-link :to="`/recipe/${recipe.id}/edit`" class="flex-1">
            <AppButton variant="secondary" size="sm" full-width>Editar</AppButton>
          </router-link>
          <AppButton variant="danger" size="sm" @click="confirmDelete(recipe)">Eliminar</AppButton>
        </div>
      </AppCard>
    </div>

    <AppConfirmDialog
      v-model="showDeleteConfirm"
      title="Eliminar receta"
      :message="deleteMessage"
      confirm-text="Eliminar"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'
import AppPageHeader from '../components/AppPageHeader.vue'
import AppCard from '../components/AppCard.vue'
import AppButton from '../components/AppButton.vue'
import AppEmptyState from '../components/AppEmptyState.vue'
import AppConfirmDialog from '../components/AppConfirmDialog.vue'

const { recipes, deleteRecipe, calculateRecipeTotal } = useRecipeStore()

const showDeleteConfirm = ref(false)
const recipeToDelete = ref(null)

const deleteMessage = computed(() =>
  recipeToDelete.value ? `¿Estás seguro de que quieres eliminar "${recipeToDelete.value.name}"?` : ''
)

function confirmDelete(recipe) {
  recipeToDelete.value = recipe
  showDeleteConfirm.value = true
}

function handleDelete() {
  if (recipeToDelete.value) {
    deleteRecipe(recipeToDelete.value.id)
  }
  showDeleteConfirm.value = false
  recipeToDelete.value = null
}
</script>
