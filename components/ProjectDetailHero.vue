<template>
  <section class="relative w-full h-screen overflow-hidden">
    <div class="relative w-full h-full">
      <img
        :src="heroImage"
        :alt="projectTitle"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-6 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
      <div
        v-for="i in 4"
        :key="i"
        :class="[
          'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all cursor-pointer',
          i === 1 ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
        ]"
      ></div>
    </div>

    <!-- Content Overlay -->
    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 z-10">
      <div class="container max-w-7xl mx-auto">
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
          {{ projectTitle }}
        </h1>
        <p class="text-white text-lg md:text-xl lg:text-2xl max-w-3xl">
          {{ projectDescription }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  heroImage: {
    type: String,
    default: '/images/project-hero.webp'
  },
  projectTitle: {
    type: String,
    default: 'ЖК "ЭКОГОРОД 3"'
  },
  projectDescription: {
    type: String,
    default: 'Современный жилой комплекс с развитой инфраструктурой'
  }
})
</script>
