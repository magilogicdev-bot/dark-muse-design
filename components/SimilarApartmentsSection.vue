<template>
  <section class="w-full bg-[#2A2C38] py-12 md:py-16 lg:py-20 xl:py-24">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Title -->
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase tracking-wider mb-8 md:mb-12 lg:mb-16">
        ПОХОЖИЕ КВАРТИРЫ
      </h2>

      <!-- Apartment Cards -->
      <div v-if="similarApartments.length > 0" class="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
        <NuxtLink
          v-for="apartment in similarApartments"
          :key="apartment.id"
          :to="`/apartment/${apartment.id}`"
          class="bg-[#D9D9D9] rounded-lg md:rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-center gap-4 md:gap-6 hover:bg-[#C9C9C9] transition-colors cursor-pointer text-center sm:text-left"
        >
          <!-- Floor Plan Icon (Left) -->
          <div class="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white border border-gray-300 rounded flex items-center justify-center overflow-hidden">
            <img
              :src="apartment.imageFurniture || apartment.image"
              :alt="`Планировка ${apartment.rooms}`"
              class="w-full h-full object-contain p-1"
              loading="lazy"
            />
          </div>

          <!-- Main Apartment Details (Middle) -->
          <div class="flex-1 flex flex-col gap-2 md:gap-3 min-w-0">
            <!-- Complex Name -->
            <p class="text-[#666666] text-xs md:text-sm uppercase font-medium">
              {{ apartment.complex }}
            </p>
            
            <!-- Rooms and Area -->
            <p class="text-[#333333] text-sm md:text-base lg:text-lg font-bold uppercase">
              {{ getRoomsLabel(apartment.rooms) }}, {{ apartment.area }}
            </p>
            
            <!-- Cost Details -->
            <div class="flex flex-col gap-1 w-full max-w-[280px] mx-auto sm:mx-0">
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-[#666666] text-xs md:text-sm uppercase whitespace-nowrap">СТОИМОСТЬ</span>
                <span class="text-[#333333] text-sm md:text-base font-medium">{{ apartment.price }}</span>
              </div>
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-[#666666] text-xs md:text-sm uppercase whitespace-nowrap">ЦЕНА ЗА М²:</span>
                <span class="text-[#333333] text-sm md:text-base font-medium">{{ calcPricePerM2(apartment) }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Information (Right) -->
          <div class="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
            <p class="text-[#333333] text-xs md:text-sm whitespace-nowrap">
              Дом 1, этаж {{ apartment.floor }}, подъезд {{ apartment.entrance }}
            </p>
            <p class="text-[#333333] text-xs md:text-sm whitespace-nowrap">
              Сдача в III кв. 2026
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-white text-center opacity-50 py-12">
        Похожих квартир не найдено
      </div>

      <!-- Show More Button -->
      <!-- <div class="flex justify-center">
        <button class="bg-white border border-gray-400 rounded-full px-6 md:px-8 lg:px-10 py-2 md:py-3 text-[#333333] text-sm md:text-base font-medium uppercase hover:bg-gray-50 transition-colors">
          ПОКАЗАТЬ ЕЩЁ
        </button>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { apartments } from '~/data/apartments'

const props = defineProps({
  currentApartment: {
    type: Object,
    required: true
  }
})

// Находим похожие квартиры: то же количество комнат, исключая текущую
const similarApartments = computed(() => {
  if (!props.currentApartment) return []
  
  return apartments
    .filter(apt => 
      apt.rooms === props.currentApartment.rooms && 
      apt.id !== props.currentApartment.id
    )
    .slice(0, 3) // Берем первые 3
})

// Хелпер для названия комнат
const getRoomsLabel = (rooms) => {
  if (rooms === 0 || rooms === 'студия') return 'СТУДИЯ'
  if (rooms === 1) return '1-КОМНАТНАЯ'
  if (rooms === 2) return '2-КОМНАТНАЯ'
  if (rooms === 3) return '3-КОМНАТНАЯ'
  return `${rooms}-КОМНАТНАЯ`
}

// Расчет цены за метр
const calcPricePerM2 = (apartment) => {
  if (!apartment.priceNum || !apartment.areaNum) return '-'
  const val = Math.round(apartment.priceNum / apartment.areaNum)
  return val.toLocaleString('ru-RU') + ' руб.'
}
</script>

