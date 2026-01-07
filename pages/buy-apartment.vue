<template>
  <div class="bg-[#1A1A1A] text-white min-h-screen">
    <!-- Hero Section -->
    <BuyApartmentHeroSection />

    <!-- Property Search / Filters Section -->
    <!-- Property Search / Filters Section -->
    <div id="filters">
      <PropertyFilters />
    </div>

    <!-- How To Buy Section (New Design from Image) -->
    <HowToBuySection id="how-to-buy" />

    <!-- Feedback / Callback Section -->
  </div>
</template>

<script setup>
usePageMeta({
  title: 'Купить квартиру в Pobedonoscev GROUP',
  description: 'Купите квартиру в Pobedonoscev GROUP. Продуманные планировки, комфортная инфраструктура и современные решения для жизни.'
})
</script>

<style scoped>
/* Ensure smooth scrolling when navigating to sections */
html {
  scroll-behavior: smooth;
}
</style>
