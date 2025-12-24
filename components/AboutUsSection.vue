<template>
  <section class="bg-primary text-white py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
    <div class="max-w-[1770px] mx-auto">
      
      <!-- Top Section: Text Left, Image Right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        
        <!-- Left: Poetic Text (Italic) -->
        <div class="flex items-center order-2 lg:order-1">
          <p class="quote-text italic text-white/90 leading-[1.4] lg:leading-[1.5]">
            Кажется что потолок уже достигнут... В такие моменты приходит особое чувство. Это не скука, нет. Это скорее предвкушение чего-то нового, зов к неизведанному. Хочется снова почувствовать тот самый азарт первооткрывателя, найти новые горизонты, которые заставят меня работать на полную катушку и вдохнут новую жизнь в творчество.
          </p>
        </div>

        <!-- Right: House Image with Watermark -->
        <div class="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden order-1 lg:order-2">
          <NuxtImg 
            src="/images/render48.webp" 
            alt="Современный дом" 
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
          />
          <!-- Watermark Overlay -->
          <div class="absolute bottom-0 left-0 p-4 lg:p-6 pointer-events-none">
            <p class="text-white/60 text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.1em] font-light">
              POBEDONOSCEV ARCHITECTS
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Image Left with Carousel, Text Right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        
        <!-- Left: Grayscale House Image with Carousel Dots -->
        <div class="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
          <NuxtImg 
            :src="carouselImage" 
            alt="Архитектурный проект" 
            class="w-full h-full object-cover grayscale"
            loading="lazy"
            format="webp"
          />
          <!-- Carousel Dots -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button 
              v-for="(item, index) in carouselItems" 
              :key="index"
              @click="setActiveCarousel(index)"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="activeCarouselIndex === index ? 'bg-white' : 'bg-white/40'"
              :aria-label="`Перейти к изображению ${index + 1}`"
            />
          </div>
        </div>

        <!-- Right: Text Blocks -->
        <div class="flex flex-col gap-4 lg:gap-5 order-1 lg:order-2 justify-center">
          <!-- First Paragraph: Pobedonoscev architects -->
          <p class="content-text text-white/90 leading-[1.65] lg:leading-[1.75] tracking-tight">
            Pobedonoscev architects – студию, рожденную из страсти к совершенству и глубокого понимания того, что такое истинная роскошь в архитектуре.
          </p>

          <!-- Second Paragraph: Mission Statement -->
          <p class="content-text text-white/90 leading-[1.65] lg:leading-[1.75] tracking-tight">
            Мы верим, что современная частная архитектура премиум-класса должна быть не только эстетически безупречной, но и функциональной, комфортной и, главное, отражать уникальный стиль жизни своих владельцев. Наша миссия – создавать пространства, которые вдохновляют, дарят ощущение гармонии и становятся настоящим воплощением вашего видения идеального дома.
          </p>

          <!-- Third Paragraph: Team Goal -->
          <p class="content-text text-white/90 leading-[1.65] lg:leading-[1.75] tracking-tight">
            Команда профессионалов, объединенных общей целью: создавать архитектуру, которая будет восхищать и служить вам долгие годы. Мы стремимся к тому, чтобы ваш дом стал не просто местом проживания, а настоящим произведением искусства, отражающим ваш успех и утонченный вкус.
          </p>

          <!-- Fourth Paragraph: Pobedonoscev Group -->
          <p class="content-text text-white/90 leading-[1.65] lg:leading-[1.75] tracking-tight">
            Pobedonoscev Group команда профессионалов строительной отрасли, чья репутация подкреплена многолетним опытом и многочисленными наградами. Pobedonoscev Group успешно реализует проекты по строительству многоквартирных жилых комплексов, предлагая современные решения и высочайшие стандарты качества. Мы строим не просто дома, а пространства, где будет комфортно жить и развиваться вашим семьям.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Carousel state
const activeCarouselIndex = ref(0)

const carouselItems = [
  '/images/rakurs5.webp',
  '/images/render48.webp',
  '/images/rakurs5.webp',
  '/images/render48.webp',
  '/images/rakurs5.webp',
  '/images/render48.webp'
]

const carouselImage = computed(() => {
  return carouselItems[activeCarouselIndex.value]
})

const setActiveCarousel = (index) => {
  activeCarouselIndex.value = index
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Marck+Script&display=swap');

/* Quote Text - poetic italic style */
.quote-text {
  font-family: 'LeoHand', 'Marck Script', cursive;
  font-size: clamp(18px, 2vw, 28px);
  letter-spacing: 0.02em;
  font-weight: 300;
  font-style: italic;
}

/* Content Text - regular sans-serif */
.content-text {
  font-family: 'Mazzard M', 'Manrope', 'Inter', sans-serif;
  font-size: clamp(11px, 1vw, 14px);
  font-weight: 400;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .quote-text {
    font-size: clamp(16px, 4.5vw, 22px);
  }
  
  .content-text {
    font-size: clamp(12px, 3vw, 14px);
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .quote-text {
    font-size: clamp(18px, 2.5vw, 24px);
  }
  
  .content-text {
    font-size: clamp(11px, 1.5vw, 13px);
  }
}
</style>
