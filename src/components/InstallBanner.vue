<template>
  <div v-if="showBanner" class="fixed bottom-20 left-4 right-4 z-50">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center gap-3">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-800">Instalar Recetas</p>
        <p class="text-xs text-gray-500">Disponible sin conexión</p>
      </div>
      <button @click="dismiss" class="p-2 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <AppButton variant="primary" size="sm" @click="install">Instalar</AppButton>
    </div>
  </div>

  <div v-if="showUpdate" class="fixed bottom-20 left-4 right-4 z-50">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center gap-3">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-800">Nueva versión disponible</p>
        <p class="text-xs text-gray-500">Actualiza para tener lo último</p>
      </div>
      <button @click="showUpdate = false" class="p-2 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <AppButton variant="primary" size="sm" @click="updateApp">Actualizar</AppButton>
    </div>
  </div>

  <div v-if="showInstallHint" class="fixed bottom-20 left-4 right-4 z-50">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      <div class="flex justify-between items-start mb-2">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800">Instalar la app</p>
          <p class="text-xs text-gray-500 mt-1">
            <template v-if="isIOS">Pulsa compartir → "Añadir a pantalla de inicio"</template>
            <template v-else>Pulsa ⋮ → "Instalar aplicación" o "Añadir a pantalla de inicio"</template>
          </p>
        </div>
        <button @click="showInstallHint = false" class="p-1 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppButton from './AppButton.vue'

const showBanner = ref(false)
const showUpdate = ref(false)
const showInstallHint = ref(false)
const deferredPrompt = ref(null)
const isIOS = ref(false)

function handleBeforeInstallPrompt(e) {
  e.preventDefault()
  deferredPrompt.value = e
  showBanner.value = true
}

function handleSwUpdated() {
  showUpdate.value = true
}

function handleAppInstalled() {
  showBanner.value = false
  deferredPrompt.value = null
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    checkForUpdates()
  }
}

function handleWindowFocus() {
  checkForUpdates()
}

async function checkForUpdates() {
  try {
    const registration = await navigator.serviceWorker?.getRegistration()
    if (registration?.waiting) {
      showUpdate.value = true
    }
  } catch {
  }
}

onMounted(() => {
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent)

  if (window.matchMedia('(display-mode: standalone)').matches) {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleWindowFocus)
    checkForUpdates()
    return
  }

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('swUpdated', handleSwUpdated)
  window.addEventListener('appinstalled', handleAppInstalled)

  setTimeout(() => {
    if (!showBanner.value && !isIOS.value) {
      showInstallHint.value = true
    }
  }, 2000)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('swUpdated', handleSwUpdated)
  window.removeEventListener('appinstalled', handleAppInstalled)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('focus', handleWindowFocus)
})

async function install() {
  if (!deferredPrompt.value) return
  
  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  
  if (outcome === 'accepted') {
    showBanner.value = false
  }
  deferredPrompt.value = null
}

function dismiss() {
  showBanner.value = false
}

function updateApp() {
  showUpdate.value = false
  window.location.reload()
}
</script>
