<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20 text-center">
        НАШИ ПАРТНЕРЫ
      </h2>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
        <div
          v-for="(partner, index) in partners"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-6 md:p-8 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="w-full h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = ref([
  { name: 'Партнер 1', logo: '/images/partner-1.webp' },
  { name: 'Партнер 2', logo: '/images/partner-2.webp' },
  { name: 'Партнер 3', logo: '/images/partner-3.webp' },
  { name: 'Партнер 4', logo: '/images/partner-4.webp' },
  { name: 'Партнер 5', logo: '/images/partner-5.webp' },
  { name: 'Партнер 6', logo: '/images/partner-6.webp' }
])
</script>
