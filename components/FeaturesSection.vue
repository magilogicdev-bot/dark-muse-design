<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20">
        ПРЕИМУЩЕСТВА
      </h2>
      
      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors"
        >
          <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#F2994A] rounded-full flex items-center justify-center mb-6 md:mb-8">
            <component :is="feature.icon" class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
          </div>
          <h3 class="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4">
            {{ feature.title }}
          </h3>
          <p class="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Icons as components
const LocationIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
}

const ShieldIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
}

const HomeIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  `
}

const features = ref([
  {
    title: 'Удобное расположение',
    description: 'Все наши объекты расположены в удобных и развитых районах города',
    icon: LocationIcon
  },
  {
    title: 'Надежность',
    description: 'Гарантия качества и надежности на все наши объекты',
    icon: ShieldIcon
  },
  {
    title: 'Комфорт',
    description: 'Современные планировки и высокое качество строительства',
    icon: HomeIcon
  },
  {
    title: 'Инфраструктура',
    description: 'Развитая инфраструктура рядом с каждым объектом',
    icon: LocationIcon
  },
  {
    title: 'Экология',
    description: 'Экологичные материалы и благоустроенная территория',
    icon: ShieldIcon
  },
  {
    title: 'Инвестиции',
    description: 'Выгодные условия для инвестиций в недвижимость',
    icon: HomeIcon
  }
])
</script>
