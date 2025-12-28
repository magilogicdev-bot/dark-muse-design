<template>
  <div class="bg-[#1A1A1A] text-white min-h-screen">
    <!-- Hero Section -->
    <BuyApartmentHeroSection />

    <!-- Property Search / Filters Section -->
    <section id="filters" class="py-12 md:py-20 bg-[#1A1A1A]">
      <PropertyFilters />
    </section>

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
