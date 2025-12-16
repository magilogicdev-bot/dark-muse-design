<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20">
        ГАЛЕРЕЯ
      </h2>
      
      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <div
          v-for="(image, index) in galleryImages"
          :key="index"
          class="aspect-square rounded-lg md:rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          @click="openLightbox(index)"
        >
          <img
            :src="image"
            :alt="`Галерея ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const galleryImages = ref([
  '/images/gallery-1.webp',
  '/images/gallery-2.webp',
  '/images/gallery-3.webp',
  '/images/gallery-4.webp',
  '/images/gallery-5.webp',
  '/images/gallery-6.webp',
  '/images/gallery-7.webp',
  '/images/gallery-8.webp'
])

const openLightbox = (index) => {
  // Handle lightbox opening
  console.log('Open image:', index)
}
</script>
