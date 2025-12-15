<template>
  <div class="min-h-screen bg-[#252734] text-white font-sans">
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
</script>
