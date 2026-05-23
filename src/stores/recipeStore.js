import { ref } from 'vue'

const STORAGE_KEY = 'recipe-calculator-recipes'

export function useRecipeStore() {
  const recipes = ref(loadRecipes())

  function loadRecipes() {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes.value))
  }

  function addRecipe(recipe) {
    const newRecipe = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...recipe
    }
    recipes.value.push(newRecipe)
    save()
    return newRecipe
  }

  function updateRecipe(id, updates) {
    const index = recipes.value.findIndex(r => r.id === id)
    if (index !== -1) {
      recipes.value[index] = { ...recipes.value[index], ...updates }
      save()
    }
  }

  function deleteRecipe(id) {
    recipes.value = recipes.value.filter(r => r.id !== id)
    save()
  }

  function copyRecipe(id) {
    const recipe = getRecipe(id)
    if (!recipe) return null

    const copiedRecipe = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      name: `${recipe.name} (copia)`,
      size: recipe.size,
      ingredients: recipe.ingredients.map(i => ({ ...i }))
    }
    recipes.value.push(copiedRecipe)
    save()
    return copiedRecipe
  }

  function getRecipe(id) {
    return recipes.value.find(r => r.id === id)
  }

  function calculateIngredientCost(recipeIngredient, ingredientData) {
    if (!ingredientData || !recipeIngredient.quantity || !ingredientData.packagePrice) return 0

    const cost = (recipeIngredient.quantity / ingredientData.packageQuantity) * ingredientData.packagePrice
    return Math.round(cost * 100) / 100
  }

  function calculateRecipeTotal(recipe, getIngredient) {
    if (!getIngredient) return 0

    return recipe.ingredients.reduce((total, recipeIngredient) => {
      const ingredientData = getIngredient(recipeIngredient.ingredientId)
      return total + calculateIngredientCost(recipeIngredient, ingredientData)
    }, 0)
  }

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    copyRecipe,
    getRecipe,
    calculateIngredientCost,
    calculateRecipeTotal
  }
}
