<template>
  <div class="bg-primary text-white">
    <!-- Hero Section -->
    <HeroSection />
    
    <PropertyFilters />
    <CurrentProjects />
    <CompletedProjects />
    <MediaSection />
    
    <!-- Floating Action Bar -->
    <FloatingActionBar />
  </div>
</template>

<script setup>
usePageMeta({
  title: 'Выбор квартиры',
  description: 'Выберите квартиру в проектах Pobedonoscev GROUP. Фильтры по цене, количеству комнат и площади.'
})
</script>

