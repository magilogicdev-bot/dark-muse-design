<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Top Section: Title and Text -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ОСОБЕННОСТИ ПРОЕКТА
          </h2>
        </div>

        <!-- Right: Text Content -->
        <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            В ландшафтном дизайне применены бионические формы. Мягкие, пластичные элементы успокаивают и создают ощущение слияния с природой.
          </p>
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            Комплекс разработан с учетом глубокого внимания к деталям и безопасности людей.
          </p>
        </div>
      </div>

      <!-- Bottom Section: Feature Cards Gallery -->
      <div class="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 2xl:-mx-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div class="flex gap-4 md:gap-5 lg:gap-6">
          <!-- Card 1: ДЕТСКИЕ И СПОРТИВНЫЕ ПЛОЩАДКИ -->
          <div class="relative w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl group cursor-pointer">
            <img
              :src="images.playgrounds"
              alt="Детские и спортивные площадки"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Text Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div class="w-full p-4 md:p-5 lg:p-6">
                <h3 class="text-white text-base md:text-lg lg:text-xl font-medium uppercase leading-tight">
                  ДЕТСКИЕ И СПОРТИВНЫЕ ПЛОЩАДКИ
                </h3>
              </div>
            </div>
          </div>

          <!-- Card 2: СВЕЖИЙ ВОЗДУХ И ПРИРОДА -->
          <div class="relative w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl group cursor-pointer">
            <img
              :src="images.nature"
              alt="Свежий воздух и природа"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Text Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div class="w-full p-4 md:p-5 lg:p-6">
                <h3 class="text-white text-base md:text-lg lg:text-xl font-medium uppercase leading-tight">
                  СВЕЖИЙ ВОЗДУХ И ПРИРОДА
                </h3>
              </div>
            </div>
          </div>

          <!-- Card 3: ДВОР БЕЗ МАШИН -->
          <div class="relative w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl group cursor-pointer">
            <img
              :src="images.carFree"
              alt="Двор без машин"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Text Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div class="w-full p-4 md:p-5 lg:p-6">
                <h3 class="text-white text-base md:text-lg lg:text-xl font-medium uppercase leading-tight">
                  ДВОР БЕЗ МАШИН
                </h3>
              </div>
            </div>
          </div>

          <!-- Card 4: БЕЗОПАСНОСТЬ -->
          <div class="relative w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl group cursor-pointer">
            <img
              :src="images.safety"
              alt="Безопасность"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Text Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div class="w-full p-4 md:p-5 lg:p-6">
                <h3 class="text-white text-base md:text-lg lg:text-xl font-medium uppercase leading-tight">
                  БЕЗОПАСНОСТЬ
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Image paths - will be updated after downloading from Figma
const images = {
  playgrounds: '/images/ecocity-features-playgrounds.png',
  nature: '/images/ecocity-features-nature.png',
  carFree: '/images/ecocity-features-car-free.png',
  safety: '/images/ecocity-features-safety.png'
}
</script>

