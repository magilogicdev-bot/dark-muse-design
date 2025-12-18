<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12 md:mb-16">
        <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase">
          {{ locationName }}
        </h2>
        <button class="text-white hover:text-[#F2994A] transition-colors">
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>

      <!-- Properties Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(property, index) in properties"
          :key="index"
          class="bg-white rounded-lg md:rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
        >
          <div class="aspect-[4/3] w-full">
            <img
              :src="property.image"
              :alt="property.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-5 md:p-6 flex-1 flex flex-col">
            <h3 class="text-black text-lg md:text-xl lg:text-2xl font-semibold mb-2">
              {{ property.title }}
            </h3>
            <p class="text-gray-600 text-sm md:text-base mb-3">
              {{ property.address }}
            </p>
            <p class="text-[#F2994A] text-xl md:text-2xl font-bold mt-auto">
              {{ property.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  locationName: {
    type: String,
    default: 'ИВАНОВО'
  }
})

const properties = ref([
  {
    title: 'Квартира в центре',
    address: 'ул. Ленина, 10',
    price: '5 470 000 ₽',
    image: '/images/property-1.webp'
  },
  {
    title: 'Современная квартира',
    address: 'пр. Мира, 25',
    price: '6 200 000 ₽',
    image: '/images/property-2.webp'
  },
  {
    title: 'Новая планировка',
    address: 'ул. Победы, 15',
    price: '4 800 000 ₽',
    image: '/images/property-3.webp'
  }
])
</script>
