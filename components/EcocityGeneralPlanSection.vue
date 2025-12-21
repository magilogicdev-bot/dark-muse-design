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
            Выбрав дом, перемещайтесь по подъездам, узнавайте больше информации о понравившейся вам квартире в ЖК Экогород 3.
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
      <div class="relative w-full rounded-lg md:rounded-xl overflow-hidden">
        <div class="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[2/1]">
          <img
            :src="images.generalPlan"
            alt="Генеральный план ЖК Экогород 3"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <!-- Interactive Markers (if needed) -->
          <!-- Red markers and green markers can be added here as absolute positioned elements -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('visualization')

const tabs = [
  { id: 'visualization', label: 'Визуализация' },
  { id: '3d-plan', label: '3D-генплан' },
  { id: 'yandex-map', label: 'Яндекс Карта' }
]

// Image path - will be updated after downloading from Figma
const images = {
  generalPlan: '/images/ecocity-general-plan.webp'
}
</script>
