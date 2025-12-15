<template>
  <div class="bg-[#2a2c38] text-white">
    <!-- Hero Section with Header overlay (Header теперь в layout) -->
    <div class="relative">
      <HeroSection />
    </div>

    <PropertyFilters />
    <CurrentProjects />
    <CompletedProjects />
    <MediaSection />
  </div>
</template>

<script setup>
// Пример использования мета-тегов (опционально)
// usePageMeta({
//   title: 'Главная',
//   description: 'Pobedonoscev Group - строительная компания',
//   ogImage: '/images/og-home.jpg'
// })
</script>
