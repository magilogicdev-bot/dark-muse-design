<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white overflow-hidden">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Top Section: Title and Text -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            {{ title }}
          </h2>
        </div>

        <!-- Right: Text Content -->
        <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Features Slider/Grid -->
      <div class="flex flex-col gap-6 md:gap-8 lg:gap-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group relative overflow-hidden rounded-lg md:rounded-xl aspect-[4/5]"
          >
            <img
              :src="feature.image"
              :alt="feature.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-4 md:p-6 lg:p-8">
              <h3 class="text-lg md:text-xl lg:text-2xl font-medium uppercase leading-tight">
                {{ feature.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'ОСОБЕННОСТИ ПРОЕКТА'
  },
  description: {
    type: String,
    default: 'В ландшафтном дизайне применены бионические формы. Мягкие, пластичные элементы успокаивают и создают ощущение слияния с природой. Комплекс разработан с учетом глубокого внимания к деталям и безопасности людей.'
  },
  features: {
    type: Array,
    default: () => [
      {
        title: 'детские и спортивные площадки',
        image: '/images/alfa/1125-16302.webp'
      },
      {
        title: 'свежий воздух и природа',
        image: '/images/alfa/1125-16303.webp'
      },
      {
        title: 'двор без машин',
        image: '/images/alfa/1125-16304.webp'
      },
      {
        title: 'безопасность',
        image: '/images/alfa/1125-16305.webp'
      }
    ]
  }
})
</script>
