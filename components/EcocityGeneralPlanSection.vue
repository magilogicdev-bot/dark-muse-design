<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Top Section: Title and Text -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-6 md:mb-8 lg:mb-10">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ГЕНЕРАЛЬНЫЙ ПЛАН
          </h2>
        </div>

        <!-- Right: Text Content -->
        <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 lg:mb-10">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-3.5 rounded-full text-sm md:text-base font-medium uppercase transition-colors',
            activeTab === tab.id
              ? 'bg-white text-black border border-black'
              : 'bg-transparent text-white border border-white/30 hover:border-white/60'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Main Visualization -->
      <div v-if="activeTab === 'visualization'" class="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl">
        <div 
          class="relative cursor-pointer overflow-hidden group"
          @click="handleBackgroundClick"
        >
          <img
            :src="currentVisualImage || images.generalPlan"
            alt="Генеральный план ЖК Экогород 3"
            class="w-full h-auto block transition-all duration-700 ease-out"
            loading="lazy"
          />
          
          <!-- Interactive Houses overlay -->
          <div v-if="isDefaultView && showHouses" class="absolute inset-0">
            <button
              v-for="(house, index) in houses"
              :key="index"
              @click.stop="handleHouseClick(house)"
              :style="{
                position: 'absolute',
                left: house.left + '%',
                top: house.top + '%',
                width: house.width + '%',
                height: house.height + '%',
                zIndex: house.zIndex
              }" 
              class="group/house cursor-pointer transition-all duration-300 focus:outline-none"
              :aria-label="`Дом ${house.number}`"
            >
              <!-- House Outline -->
              <img
                v-if="house.outlineImage"
                :src="house.outlineImage"
                :alt="`Обводка дома ${house.number}`"
                class="absolute inset-0 w-full h-full object-contain opacity-0 group-hover/house:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
              <div
                v-else
                class="absolute inset-0 border-2 border-white/50 opacity-0 group-hover/house:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm"
              ></div>
            </button>
          </div>

          <!-- Hint Overlay (visible on first load) -->
          <div v-if="isDefaultView" class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span class="text-sm font-medium uppercase tracking-wider">Нажмите на дом для просмотра</span>
          </div>
        </div>
      </div>

      <!-- Yandex Map Placeholder -->
      <div v-else class="relative w-full aspect-[16/9] bg-stone-900 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center">
        <p class="text-white/50 italic capitalize">Интерактивная карта загружается...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Object,
    default: () => ({
      generalPlan: '/images/ecocity-general-plan.webp'
    })
  },
  description: {
    type: String,
    default: 'Выбрав дом, перемещайтесь по подъездам, узнавайте больше информации о понравившейся вам квартире в ЖК.'
  },
  showHouses: {
    type: Boolean,
    default: false
  }
})

const activeTab = ref('visualization')
const currentVisualImage = ref(null)

const tabs = [
  { id: 'visualization', label: 'Визуализация' },
  { id: 'yandex-map', label: 'Яндекс Карта' }
 ]

const houses = [
  {
    number: 1,
    left: 48.5,
    top: 17,
    width: 11.5,
    height: 36,
    zIndex: 10,
    outlineImage: '/images/house-outline-1.webp',
    detailImage: '/images/completed-projects-1.webp'
  },
  {
    number: 2,
    left: 28.2,
    top: 36.5,
    width: 16.2,
    height: 38.5,
    zIndex: 20,
    outlineImage: '/images/house-outline-2.webp',
    detailImage: '/images/completed-projects-2.webp'
  },
  {
    number: 3,
    left: 24.5,
    top: 43,
    width: 50,
    height: 50,
    zIndex: 15,
    outlineImage: '/images/house-outline-3.webp',
    detailImage: '/images/high-life-award.webp'
  }
]

const isDefaultView = computed(() => !currentVisualImage.value || currentVisualImage.value === props.images.generalPlan)

const handleHouseClick = (house) => {
  if (house.detailImage) {
    currentVisualImage.value = house.detailImage
  }
}

const handleBackgroundClick = () => {
  if (!isDefaultView.value) {
    currentVisualImage.value = props.images.generalPlan
  }
}
</script>
