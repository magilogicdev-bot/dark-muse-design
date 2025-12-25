<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
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
            {{ text1 }}
          </p>
          <p v-if="text2" class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            {{ text2 }}
          </p>
        </div>
      </div>

      <!-- Bottom Section: Image Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 items-stretch">
        <!-- Large Image (Left) -->
        <div class="relative h-full overflow-hidden rounded-lg md:rounded-xl">
          <img
            :src="images.main"
            :alt="title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <!-- Right Grid: 2x2 Small Images -->
        <div class="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          <!-- Top Left: Courtyard -->
          <div class="relative aspect-square overflow-hidden rounded-lg md:rounded-xl">
            <img
              :src="images.courtyard"
              alt="Внутренний двор жилого комплекса"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Top Right: Playground -->
          <div class="relative aspect-square overflow-hidden rounded-lg md:rounded-xl">
            <img
              :src="images.playground"
              alt="Детская площадка"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Bottom Left: Facade Detail -->
          <div class="relative aspect-square overflow-hidden rounded-lg md:rounded-xl">
            <img
              :src="images.facade"
              alt="Деталь фасада здания"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Bottom Right: Gallery Link -->
          <NuxtLink
            to="/gallery"
            class="relative aspect-square overflow-hidden rounded-lg md:rounded-xl group cursor-pointer"
          >
            <img
              :src="images.gallery"
              alt="Галерея проекта"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'О ПРОЕКТЕ'
  },
  text1: {
    type: String,
    default: 'Жилой комплекс «Экогород 3» создан в гармонии и уважении к природе и здоровью человека. Проектом предусмотрено размещение шести 8-9 этажных жилых домов, два из которых дополнены общественной функцией. На первых этажах предполагается размещение магазинов и прочих мест досугового назначения, что позволяет жителям находиться в максимальном комфорте и удобстве.'
  },
  text2: {
    type: String,
    default: 'Основной идеей организации территории комплекса является формирование двух закрытых дворовых пространств, объединенных пешеходной зоной и многофункциональной спортивной площадкой. Дворы без машин - это современная тенденция организации жилой застройки для обеспечения безопасности и комфортного проживания.'
  },
  images: {
    type: Object,
    default: () => ({
      main: '/images/alfa/1125-16276.webp',
      courtyard: '/images/alfa/1125-16280.webp',
      playground: '/images/alfa/1125-16283.webp',
      facade: '/images/alfa/1125-16286.webp',
      gallery: '/images/alfa/1125-16289.webp'
    })
  }
})
</script>
