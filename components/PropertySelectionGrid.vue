<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight mb-12 md:mb-16 lg:mb-20">
        ВЫБРАТЬ НЕДВИЖИМОСТЬ
      </h2>
      
      <!-- Property Type Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        <div
          v-for="(property, index) in propertyTypes"
          :key="index"
          class="bg-white rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div class="aspect-square w-full">
            <img
              :src="property.image"
              :alt="property.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4 md:p-5">
            <h3 class="text-black text-sm md:text-base lg:text-lg font-medium text-center">
              {{ property.title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const propertyTypes = ref([
  {
    title: 'Квартиры',
    image: '/images/property-type-1.webp'
  },
  {
    title: 'Студии',
    image: '/images/property-type-2.webp'
  },
  {
    title: '1 комната',
    image: '/images/property-type-3.webp'
  },
  {
    title: '2 комнаты',
    image: '/images/property-type-4.webp'
  },
  {
    title: '3 комнаты',
    image: '/images/property-type-5.webp'
  },
  {
    title: '4+ комнаты',
    image: '/images/property-type-6.webp'
  }
])
</script>
