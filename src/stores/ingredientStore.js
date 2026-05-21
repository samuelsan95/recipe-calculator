import { ref } from 'vue'

const STORAGE_KEY = 'recipe-calculator-ingredients'

export function useIngredientStore() {
  const ingredients = ref(loadIngredients())

  function loadIngredients() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients.value))
  }

  function addIngredient(ingredient) {
    const newIngredient = {
      id: Date.now().toString(),
      ...ingredient
    }
    ingredients.value.push(newIngredient)
    save()
    return newIngredient
  }

  function updateIngredient(id, updates) {
    const index = ingredients.value.findIndex(i => i.id === id)
    if (index !== -1) {
      ingredients.value[index] = { ...ingredients.value[index], ...updates }
      save()
    }
  }

  function deleteIngredient(id) {
    ingredients.value = ingredients.value.filter(i => i.id !== id)
    save()
  }

  function getIngredient(id) {
    return ingredients.value.find(i => i.id === id)
  }

  return {
    ingredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredient
  }
}
