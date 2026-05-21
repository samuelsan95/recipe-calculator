<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <header class="bg-primary-600 text-white p-4 sticky top-0 z-50 shadow-md">
      <div class="flex items-center justify-between max-w-lg mx-auto">
        <h1 class="text-lg font-semibold">Recipe Calculator</h1>
        <router-link to="/ingredients" class="text-sm bg-primary-700 px-3 py-1.5 rounded-lg">
          Ingredientes
        </router-link>
      </div>
    </header>

    <main class="max-w-lg mx-auto p-4">
      <router-view />
    </main>

    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="max-w-lg mx-auto flex">
        <router-link to="/" class="flex-1 flex flex-col items-center py-2 text-gray-500" active-class="text-primary-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="text-xs mt-0.5">Recetas</span>
        </router-link>
        <router-link to="/recipe/new" class="flex-1 flex flex-col items-center py-2 text-gray-500" active-class="text-primary-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-xs mt-0.5">Nueva</span>
        </router-link>
        <router-link to="/ingredients" class="flex-1 flex flex-col items-center py-2 text-gray-500" active-class="text-primary-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="text-xs mt-0.5">Ingredientes</span>
        </router-link>
      </div>
    </nav>

    <InstallBanner />
  </div>
</template>

<script setup>
import InstallBanner from './components/InstallBanner.vue'
</script>
