<template>
  <div class="min-h-screen bg-primary text-white font-sans overflow-hidden" :class="{ 'overflow-hidden': isMenuOpen }">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <ActionMenuButton />
    <CookieConsent />
  </div>
</template>

<script setup>
import { useMenu } from '~/composables/useMenu'
import { onMounted, onUnmounted } from 'vue'

// Layout для главной страницы без футера
const { isMenuOpen } = useMenu()

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.height = '100%'
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.height = ''
})
</script>

<style scoped>
.main-content {
  padding-top: var(--header-bar-height, 0px);
}
</style>

