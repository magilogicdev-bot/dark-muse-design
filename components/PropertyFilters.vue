<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header -->
      <div class="mb-6 md:mb-8 lg:mb-10">
        <p class="text-white/60 uppercase text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] tracking-[-0.02em] mb-1 md:mb-2">
          ВЫБОР КВАРТИРЫ
        </p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight">
          АКТУАЛЬНЫЕ ПРОЕКТЫ
        </h2>
      </div>

      <!-- Main Project Card -->
      <article class="relative overflow-hidden rounded-[12px] lg:rounded-[18px] xl:rounded-[22px] shadow-lg bg-black mb-6 md:mb-8 lg:mb-10">
        <div class="aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] xl:aspect-[2.4/1]">
          <img 
            src="/images/current-projects-main.webp" 
            alt="ЭКОГОРОД 3" 
            class="w-full h-full object-cover" 
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/46"></div>
        </div>

        <div class="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 xl:p-10">
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <div class="space-y-1">
              <p class="text-white/80 uppercase text-[10px] md:text-[12px] lg:text-[16px] xl:text-[20px] tracking-[-0.02em]">ЖИЛОЙ КОМПЛЕКС</p>
              <h3 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase leading-tight">ЭКОГОРОД 3</h3>
            </div>
            <NuxtLink 
              to="/project/ecocity"
              class="flex items-center justify-center w-full sm:w-auto lg:w-[140px] xl:w-[180px] h-[36px] md:h-[40px] lg:h-[48px] xl:h-[56px] bg-white rounded-[5px] text-black text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-medium uppercase hover:bg-gray-100 transition-colors px-4 cursor-pointer relative z-10"
            >
              ПОДРОБНЕЕ
            </NuxtLink>
          </div>
        </div>
      </article>

      <!-- Filters Row -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-3 lg:gap-4 xl:gap-5 mb-6 md:mb-8 lg:mb-10">
        <!-- Price Filter -->
        <div class="flex-shrink-0 w-full md:w-auto md:flex-1 md:max-w-[280px] lg:max-w-[300px] xl:max-w-[330px]">
          <p class="text-white/70 text-[11px] font-medium uppercase mb-2">СТОИМОСТЬ, РУБ</p>
          <div class="bg-white rounded-[14px] px-4 md:px-5 py-4">
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3 text-[12px] font-medium text-black">
              <div class="flex items-baseline gap-1 md:gap-2">
                <span class="text-black/35 uppercase whitespace-nowrap">ОТ</span>
                <input
                  v-model="minPriceInput"
                  @blur="updatePriceFromInput"
                  @keyup.enter="updatePriceFromInput"
                  type="text"
                  inputmode="numeric"
                  class="w-full bg-transparent border-none outline-none text-black font-medium p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span class="text-black/70 whitespace-nowrap">РУБ</span>
              </div>
              <div class="w-px h-6 bg-black/20"></div>
              <div class="flex items-baseline gap-1 md:gap-2 justify-end">
                <span class="text-black/35 uppercase whitespace-nowrap">ДО</span>
                <input
                  v-model="maxPriceInput"
                  @blur="updatePriceToInput"
                  @keyup.enter="updatePriceToInput"
                  type="text"
                  inputmode="numeric"
                  class="w-full bg-transparent border-none outline-none text-black/40 font-medium p-0 m-0 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="500+"
                />
              </div>
            </div>
            <div class="mt-3 relative h-[2px]">
              <!-- Background track -->
              <div class="absolute inset-0 h-[2px] bg-black/20 rounded-full"></div>
              
              <!-- Active range -->
              <div 
                class="absolute h-[2px] bg-black rounded-full top-0"
                :style="{ 
                  left: `${((minPrice - priceMin) / (priceMax - priceMin)) * 100}%`, 
                  width: `${((maxPrice - minPrice) / (priceMax - priceMin)) * 100}%` 
                }"
              ></div>
              
              <!-- Min slider -->
              <input
                v-model.number="minPrice"
                @input="handleMinPriceChange"
                type="range"
                :min="priceMin"
                :max="priceMax"
                :step="100000"
                class="absolute inset-0 w-full h-0 opacity-0 cursor-pointer z-10"
                style="pointer-events: auto;"
              />
              
              <!-- Max slider -->
              <input
                v-model.number="maxPrice"
                @input="handleMaxPriceChange"
                type="range"
                :min="priceMin"
                :max="priceMax"
                :step="100000"
                class="absolute inset-0 w-full h-0 opacity-0 cursor-pointer z-10"
                style="pointer-events: auto;"
              />
              
              <!-- Min thumb -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((minPrice - priceMin) / (priceMax - priceMin)) * 100}%` }"
              ></div>
              
              <!-- Max thumb -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Rooms Filter - Centered -->
        <div class="flex-shrink-0 w-full md:w-auto md:flex-1 md:flex md:justify-center">
          <div class="w-full md:w-auto">
            <p class="text-white/70 text-[11px] font-medium uppercase mb-2">КОЛИЧЕСТВО КОМНАТ</p>
            <div class="flex items-end gap-3 md:gap-4 pb-3 border-b border-white/15">
              <div class="inline-flex items-center gap-2 md:gap-3 flex-wrap">
                <button
                  v-for="(room, index) in roomOptions"
                  :key="room.label"
                  @click="selectRoom(index)"
                  :class="[
                    room.isStudio ? 'h-[44px] px-4 md:px-6 rounded-full text-[12px] md:text-[13px]' : 'w-[40px] md:w-[44px] h-[40px] md:h-[44px] rounded-full text-[12px] md:text-[13px]',
                    'font-medium flex items-center justify-center transition-colors border cursor-pointer shadow-sm',
                    room.active 
                      ? 'bg-primary text-white border-white/20' 
                      : 'bg-white text-black border-black/10 hover:border-black/30'
                  ]"
                >
                  {{ room.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Area Filter -->
        <div class="flex-shrink-0 w-full md:w-auto md:flex-1 md:max-w-[240px] lg:max-w-[260px] xl:max-w-[270px]">
          <p class="text-white/70 text-[11px] font-medium uppercase mb-2">ПЛОЩАДЬ, М²</p>
          <div class="bg-white rounded-[14px] px-4 md:px-5 py-4">
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3 text-[12px] font-medium text-black">
              <div class="flex items-baseline gap-1 md:gap-2">
                <span class="text-black/35 uppercase whitespace-nowrap">ОТ</span>
                <input
                  v-model="minAreaInput"
                  @blur="updateAreaFromInput"
                  @keyup.enter="updateAreaFromInput"
                  type="text"
                  inputmode="numeric"
                  class="w-full bg-transparent border-none outline-none text-black font-medium p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div class="w-px h-6 bg-black/20"></div>
              <div class="flex items-baseline gap-1 md:gap-2 justify-end">
                <span class="text-black/35 uppercase whitespace-nowrap">ДО</span>
                <input
                  v-model="maxAreaInput"
                  @blur="updateAreaToInput"
                  @keyup.enter="updateAreaToInput"
                  type="text"
                  inputmode="numeric"
                  class="w-full bg-transparent border-none outline-none text-black/40 font-medium p-0 m-0 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div class="mt-3 relative h-[2px]">
              <!-- Background track -->
              <div class="absolute inset-0 h-[2px] bg-black/20 rounded-full"></div>
              
              <!-- Active range -->
              <div 
                class="absolute h-[2px] bg-black rounded-full top-0"
                :style="{ 
                  left: `${((minArea - areaMin) / (areaMax - areaMin)) * 100}%`, 
                  width: `${((maxArea - minArea) / (areaMax - areaMin)) * 100}%` 
                }"
              ></div>
              
              <!-- Min slider -->
              <input
                v-model.number="minArea"
                @input="handleMinAreaChange"
                type="range"
                :min="areaMin"
                :max="areaMax"
                :step="1"
                class="absolute inset-0 w-full h-0 opacity-0 cursor-pointer z-10"
                style="pointer-events: auto;"
              />
              
              <!-- Max slider -->
              <input
                v-model.number="maxArea"
                @input="handleMaxAreaChange"
                type="range"
                :min="areaMin"
                :max="areaMax"
                :step="1"
                class="absolute inset-0 w-full h-0 opacity-0 cursor-pointer z-10"
                style="pointer-events: auto;"
              />
              
              <!-- Min thumb -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((minArea - areaMin) / (areaMax - areaMin)) * 100}%` }"
              ></div>
              
              <!-- Max thumb -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((maxArea - areaMin) / (areaMax - areaMin)) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          class="relative bg-[#ff8700] text-white text-[11px] md:text-[12px] font-medium uppercase px-5 md:px-7 lg:px-10 h-[48px] md:h-[52px] lg:h-[56px] rounded-full hover:bg-[#ff9f34] transition-colors flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 whitespace-nowrap w-full md:w-auto after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-4 after:h-[2px] after:w-[70%] after:bg-[#ff8700] after:rounded-full"
        >
          <span class="whitespace-nowrap">ПОКАЗАТЬ 482 КВАРТИРЫ</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="md:w-[18px] md:h-[18px]">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- Property Cards Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5 mb-6 md:mb-8 lg:mb-10">
        <NuxtLink
          v-for="item in properties"
          :key="item.id"
          :to="`/apartment/${item.id}`"
          class="bg-white rounded-[10px] lg:rounded-[14px] xl:rounded-[18px] overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow block"
        >
          <div class="aspect-[4/5] bg-gray-100">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover" 
            />
          </div>
        </NuxtLink>
      </div>

      <!-- Load More Button -->
      <div class="flex justify-center mt-6 lg:mt-8">
        <button
          class="px-6 lg:px-8 py-3 lg:py-4 rounded-[5px] bg-white text-black text-[11px] lg:text-[13px] xl:text-[15px] font-medium uppercase hover:bg-gray-100 transition-colors min-w-[160px] lg:min-w-[200px] h-[40px] lg:h-[48px] xl:h-[54px]"
        >
          ПОКАЗАТЬ ЕЩЁ
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

// Price filter
const priceMin = 1000000
const priceMax = 50000000
const minPrice = ref(5470000)
const maxPrice = ref(50000000)
const minPriceInput = ref('5 470 000')
const maxPriceInput = ref('500+')

// Area filter
const areaMin = 18
const areaMax = 501
const minArea = ref(18)
const maxArea = ref(501)
const minAreaInput = ref('18')
const maxAreaInput = ref('501')

// Rooms filter
const roomOptions = ref([
  { label: 'СТУДИЯ', active: true, isStudio: true },
  { label: '1', active: true },
  { label: '2', active: false },
  { label: '3', active: false },
  { label: '4', active: false }
])

const selectRoom = (selectedIndex) => {
  roomOptions.value.forEach((room, index) => {
    room.active = index === selectedIndex
  })
}

// Format number with spaces
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Price handlers
const updatePriceFromInput = () => {
  const inputValue = minPriceInput.value.replace(/\s/g, '')
  let value = Number(inputValue)
  if (isNaN(value) || value < priceMin) {
    value = priceMin
  }
  if (value > maxPrice.value) {
    value = maxPrice.value
  }
  if (value > priceMax) {
    value = priceMax
  }
  minPrice.value = value
  minPriceInput.value = value.toLocaleString('ru-RU')
}

const updatePriceToInput = () => {
  const inputValue = maxPriceInput.value.replace(/\s/g, '').replace('+', '')
  if (inputValue === '' || inputValue === '500') {
    maxPrice.value = priceMax
    maxPriceInput.value = '500+'
    return
  }
  let value = Number(inputValue)
  if (isNaN(value) || value > priceMax) {
    value = priceMax
    maxPriceInput.value = '500+'
  } else if (value < minPrice.value) {
    value = minPrice.value
  } else if (value < priceMin) {
    value = priceMin
  } else {
    maxPriceInput.value = value.toLocaleString('ru-RU')
  }
  maxPrice.value = value
}

const handleMinPriceChange = (e) => {
  const value = Number(e.target.value)
  if (value > maxPrice.value) {
    minPrice.value = maxPrice.value
  } else if (value < priceMin) {
    minPrice.value = priceMin
  } else {
    minPrice.value = value
  }
  minPriceInput.value = minPrice.value.toLocaleString('ru-RU')
}

const handleMaxPriceChange = (e) => {
  const value = Number(e.target.value)
  if (value < minPrice.value) {
    maxPrice.value = minPrice.value
  } else if (value > priceMax) {
    maxPrice.value = priceMax
  } else {
    maxPrice.value = value
  }
  if (maxPrice.value >= priceMax) {
    maxPriceInput.value = '500+'
  } else {
    maxPriceInput.value = maxPrice.value.toLocaleString('ru-RU')
  }
}


// Area handlers
const updateAreaFromInput = () => {
  const inputValue = minAreaInput.value.replace(/\s/g, '')
  let value = Number(inputValue)
  if (isNaN(value) || value < areaMin) {
    value = areaMin
  }
  if (value > maxArea.value) {
    value = maxArea.value
  }
  if (value > areaMax) {
    value = areaMax
  }
  minArea.value = value
  minAreaInput.value = value.toString()
}

const updateAreaToInput = () => {
  const inputValue = maxAreaInput.value.replace(/\s/g, '')
  let value = Number(inputValue)
  if (isNaN(value) || value > areaMax) {
    value = areaMax
  }
  if (value < minArea.value) {
    value = minArea.value
  }
  if (value < areaMin) {
    value = areaMin
  }
  maxArea.value = value
  maxAreaInput.value = value.toString()
}

const handleMinAreaChange = (e) => {
  const value = Number(e.target.value)
  if (value > maxArea.value) {
    minArea.value = maxArea.value
  } else if (value < areaMin) {
    minArea.value = areaMin
  } else {
    minArea.value = value
  }
  minAreaInput.value = minArea.value.toString()
}

const handleMaxAreaChange = (e) => {
  const value = Number(e.target.value)
  if (value < minArea.value) {
    maxArea.value = minArea.value
  } else if (value > areaMax) {
    maxArea.value = areaMax
  } else {
    maxArea.value = value
  }
  maxAreaInput.value = maxArea.value.toString()
}

const planImage = '/images/property-plan.webp'

const properties = [
  { 
    id: 1, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 2, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 3, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 4, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 5, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 6, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 7, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  },
  { 
    id: 8, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная, 54.39 м²', 
    area: '54.39 м²', 
    price: '5 167 050', 
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    image: planImage 
  }
]
</script>
