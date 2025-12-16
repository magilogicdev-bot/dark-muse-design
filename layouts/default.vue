<template>
  <div class="min-h-screen bg-primary text-white font-sans">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// Базовый layout с Header и Footer для всех страниц
// Если нужен другой layout, создайте новый файл в папке layouts/
// Компоненты автоматически импортируются в Nuxt 3
</script>
