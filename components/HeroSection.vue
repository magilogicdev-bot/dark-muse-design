<template>
  <section class="relative w-full bg-primary overflow-hidden">
    <!-- Hero Background Image -->
    <div
      ref="imageContainer"
      class="relative w-full cursor-pointer overflow-hidden"
      @click="handleBackgroundClick"
    >
      <img
        :src="currentHeroImage"
        alt="Вид жилого комплекса"
        class="w-full h-auto block transition-opacity duration-500"
      />
      
      <!-- Interactive Houses (Only visible on main view) -->
      <div v-if="isDefaultView" class="absolute inset-0 overflow-hidden">
        <button
          v-for="(house, index) in computedHouses"
          :key="index"
          @click.stop="handleHouseClick(house)"
          :style="{
            position: 'absolute',
            left: house.computedLeft + '%',
            top: house.computedTop + '%',
            width: house.computedWidth + '%',
            height: house.computedHeight + '%',
            zIndex: house.zIndex
          }" 
          class="group cursor-pointer transition-all duration-300 focus:outline-none"
          :aria-label="`Дом ${house.number}`"
        >
          <!-- House Outline Image (Standard img for reliable production paths) -->
          <img
            v-if="house.outlineImage"
            :src="house.outlineImage"
            :alt="`Обводка дома ${house.number}`"
            class="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
          <!-- Fallback: CSS border outline -->
          <div
            v-else
            class="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          ></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const imageContainer = ref(null)
const baseWidth = ref(1460) // Базовый размер для конвертации px в %
const baseHeight = ref(915) // Базовый размер для конвертации px в %
const defaultImage = '/images/hero-background.webp'
const currentHeroImage = ref(defaultImage)

const houses = ref([
  {
    // Левый жилой комплекс (светлый/серый)
    number: 1,
    left: 48.5,
    top: 23.5,
    width: 11.5,
    height: 36,
    zIndex: 1,
    outlineImage: '/images/house-outline-1.png',
    detailImage: '/images/completed-projects-1.webp'
  },
  {
    // Центральные башни (две высотки)
    number: 2,
    left: 28.2,
    top: 38.5,
    width: 16.2,
    height: 38.5,
    zIndex: 55,
    outlineImage: '/images/house-outline-2.png',
    detailImage: '/images/completed-projects-2.webp'
  },
  {
    // Правый жилой комплекс (большой П-образный)
    number: 3,
    left: 34.7,
    zIndex: 50,
    top: 46.8,
    width: 30,
    height: 41.5,
    outlineImage: '/images/house-outline-3.png',
    detailImage: '/images/high-life-award.png'
  }
])

const computedHouses = computed(() => {
  return houses.value.map(house => {
    // Если значения уже в процентах (меньше 100), используем как есть
    if (house.left < 100 && house.top < 100 && house.width < 100 && house.height < 100) {
      return {
        ...house,
        computedLeft: house.left,
        computedTop: house.top,
        computedWidth: house.width,
        computedHeight: house.height
      }
    }
    
    // Если значения в пикселях (>= 100), конвертируем в проценты
    return {
      ...house,
      computedLeft: (house.left / baseWidth.value) * 100,
      computedTop: (house.top / baseHeight.value) * 100,
      computedWidth: (house.width / baseWidth.value) * 100,
      computedHeight: (house.height / baseHeight.value) * 100
    }
  })
})

const isDefaultView = computed(() => currentHeroImage.value === defaultImage)

const handleHouseClick = (house) => {
  if (house.detailImage) {
    currentHeroImage.value = house.detailImage
  }
}

const handleBackgroundClick = () => {
  if (!isDefaultView.value) {
    currentHeroImage.value = defaultImage
  }
}
</script>
