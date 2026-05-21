<template>
  <div>
    <AppPageHeader title="Ingredientes" :show-back="false">
      <template #action>
        <AppButton variant="primary" size="sm" @click="openNewForm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Añadir
        </AppButton>
      </template>
    </AppPageHeader>

    <AppEmptyState v-if="ingredients.length === 0" title="No hay ingredientes guardados" description="Añade los ingredientes que usas habitualmente">
      <template #icon>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </template>
    </AppEmptyState>

    <div v-else class="space-y-3">
      <AppCard v-for="ingredient in ingredients" :key="ingredient.id">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800">{{ ingredient.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">
              {{ ingredient.packageQuantity }} {{ ingredient.unit }} → {{ ingredient.packagePrice.toFixed(2) }}€
            </p>
          </div>
          <div class="flex gap-2">
            <button @click="openEditForm(ingredient)" class="p-2 bg-gray-100 rounded-lg text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button @click="confirmDelete(ingredient)" class="p-2 bg-red-50 rounded-lg text-red-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </AppCard>
    </div>

    <IngredientFormModal v-model="showForm" :ingredient="editingIngredient" @save="handleSave" />

    <AppConfirmDialog
      v-model="showDeleteConfirm"
      title="Eliminar ingrediente"
      :message="deleteMessage"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIngredientStore } from '../stores/ingredientStore'
import AppPageHeader from '../components/AppPageHeader.vue'
import AppCard from '../components/AppCard.vue'
import AppButton from '../components/AppButton.vue'
import AppEmptyState from '../components/AppEmptyState.vue'
import AppConfirmDialog from '../components/AppConfirmDialog.vue'
import IngredientFormModal from '../components/IngredientFormModal.vue'

const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useIngredientStore()

const showForm = ref(false)
const showDeleteConfirm = ref(false)
const editingIngredient = ref(null)
const ingredientToDelete = ref(null)

const deleteMessage = computed(() =>
  ingredientToDelete.value ? `¿Estás seguro de que quieres eliminar "${ingredientToDelete.value.name}"?` : ''
)

function openNewForm() {
  editingIngredient.value = null
  showForm.value = true
}

function openEditForm(ingredient) {
  editingIngredient.value = ingredient
  showForm.value = true
}

function handleSave(data) {
  if (editingIngredient.value) {
    updateIngredient(editingIngredient.value.id, data)
  } else {
    addIngredient(data)
  }
  editingIngredient.value = null
}

function confirmDelete(ingredient) {
  ingredientToDelete.value = ingredient
  showDeleteConfirm.value = true
}

function handleDelete() {
  if (ingredientToDelete.value) {
    deleteIngredient(ingredientToDelete.value.id)
  }
  showDeleteConfirm.value = false
  ingredientToDelete.value = null
}
</script>
