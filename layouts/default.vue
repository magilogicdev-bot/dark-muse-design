<template>
  <div class="min-h-screen bg-primary text-white font-sans">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
    <ScrollToTopButton />
  </div>
</template>

<script setup>
// Базовый layout с Header и Footer для всех страниц
// Если нужен другой layout, создайте новый файл в папке layouts/
// Компоненты автоматически импортируются в Nuxt 3
</script>

<style scoped>
.main-content {
  padding-top: var(--header-bar-height, 0px);
}
</style>
