<template>
  <div class="min-h-screen bg-primary text-white font-sans" :class="{ 'overflow-hidden': isMenuOpen }">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
    <ActionMenuButton />
    <CookieConsent />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMenu } from '~/composables/useMenu'
import { useFavorites } from '~/composables/useFavorites'

const { isMenuOpen } = useMenu()
const { initFavorites } = useFavorites()

onMounted(() => {
  initFavorites()
})
</script>

<style scoped>
.main-content {
  padding-top: var(--header-bar-height, 0px);
}
</style>

<style>
/* Скрываем action-menu на мобильных когда открыто меню */
@media (max-width: 1024px) {
  .header--menu-open ~ * .action-menu-container,
  body:has(.header--menu-open) .action-menu-container {
    display: none !important;
  }
}
</style>
