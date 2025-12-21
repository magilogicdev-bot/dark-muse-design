<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header: Title and Description -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ЭКСКУРСИИ
          </h2>
        </div>

        <!-- Right: Description -->
        <div class="flex items-start">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            Знакомьтесь с проектами Pobedonoscev GROUP в удобном для вас формате. Можно посетить строящийся или уже готовый проект.
          </p>
        </div>
      </div>

      <!-- Main Image Section -->
      <div class="mb-8 md:mb-10 lg:mb-12">
        <div class="relative rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden mb-6 md:mb-8 lg:mb-10">
          <div class="aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] xl:aspect-[3/1]">
            <img
              :src="excursionImage"
              alt="Жилой комплекс Экогород 3"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <!-- CTA Button -->
        <div class="flex justify-end">
          <button
            @click="handleSignUp"
            class="bg-[#FF8700] text-white rounded-full px-6 md:px-8 lg:px-10 xl:px-12 py-3 md:py-4 lg:py-5 text-sm md:text-base lg:text-lg font-medium uppercase hover:bg-[#ff9f34] transition-colors flex items-center gap-2 md:gap-3"
          >
            <span>ЗАПИСАТЬСЯ НА ЭКСКУРСИЮ</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5">
              <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const excursionImage = '/images/ecocity-excursions.png'

const handleSignUp = () => {
  // Navigate to contact form or open modal
  navigateTo('/contacts')
  // Or open a modal with sign-up form
}
</script>
