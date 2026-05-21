import { createRouter, createWebHashHistory } from 'vue-router'
import RecipeList from '../views/RecipeList.vue'
import RecipeForm from '../views/RecipeForm.vue'
import IngredientManager from '../views/IngredientManager.vue'

const routes = [
  { path: '/', name: 'RecipeList', component: RecipeList },
  { path: '/recipe/new', name: 'RecipeNew', component: RecipeForm },
  { path: '/recipe/:id/edit', name: 'RecipeEdit', component: RecipeForm },
  { path: '/ingredients', name: 'Ingredients', component: IngredientManager },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
