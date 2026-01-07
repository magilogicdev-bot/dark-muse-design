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
          <NuxtImg 
            src="/images/current-projects-main.webp" 
            alt="ЭКОГОРОД 3" 
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
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
              to="/project/ecocity-3"
              class="flex items-center justify-center w-full sm:w-auto lg:w-[140px] xl:w-[180px] h-[36px] md:h-[40px] lg:h-[48px] xl:h-[56px] bg-white rounded-[5px] text-black text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-medium uppercase hover:bg-gray-100 transition-colors px-4 cursor-pointer relative z-10"
            >
              ПОДРОБНЕЕ
            </NuxtLink>
          </div>
        </div>
      </article>

      <!-- Filters Row -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-3 lg:gap-4 xl:gap-5 mb-6 md:mb-8 lg:mb-10">
        <!-- Price Filter -->
        <div class="flex-1 w-full md:w-auto min-w-0">
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
            <div class="mt-3 relative h-5">
              <!-- Background track -->
              <div class="absolute w-full h-[2px] bg-black/20 rounded-full top-1/2 -translate-y-1/2"></div>
              
              <!-- Active range -->
              <div 
                class="absolute h-[2px] bg-black rounded-full top-1/2 -translate-y-1/2 z-0"
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
                class="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none z-30 opacity-0 cursor-pointer"
              />
              
              <!-- Max slider -->
              <input
                v-model.number="maxPrice"
                @input="handleMaxPriceChange"
                type="range"
                :min="priceMin"
                :max="priceMax"
                :step="100000"
                class="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none z-30 opacity-0 cursor-pointer"
              />
              
              <!-- Min thumb (visual) -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((minPrice - priceMin) / (priceMax - priceMin)) * 100}%` }"
              ></div>
              
              <!-- Max thumb (visual) -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Rooms Filter - Centered -->
        <div class="flex-1 w-full md:w-auto min-w-0 md:flex md:justify-center">
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
        <div class="flex-1 w-full md:w-auto min-w-0">
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
            <div class="mt-3 relative h-5">
              <!-- Background track -->
              <div class="absolute w-full h-[2px] bg-black/20 rounded-full top-1/2 -translate-y-1/2"></div>
              
              <!-- Active range -->
              <div 
                class="absolute h-[2px] bg-black rounded-full top-1/2 -translate-y-1/2 z-0"
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
                class="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none z-30 opacity-0 cursor-pointer"
              />
              
              <!-- Max slider -->
              <input
                v-model.number="maxArea"
                @input="handleMaxAreaChange"
                type="range"
                :min="areaMin"
                :max="areaMax"
                :step="1"
                class="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none z-30 opacity-0 cursor-pointer"
              />
              
              <!-- Min thumb (visual) -->
              <div 
                class="absolute w-[6px] h-[6px] bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((minArea - areaMin) / (areaMax - areaMin)) * 100}%` }"
              ></div>
              
              <!-- Max thumb (visual) -->
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
          <span class="whitespace-nowrap">ПОКАЗАТЬ {{ filteredProperties.length }} {{ getRussianPlural(filteredProperties.length, 'КВАРТИРУ', 'КВАРТИРЫ', 'КВАРТИР') }}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="md:w-[18px] md:h-[18px]">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- Expandable Project Apartments -->
      <div 
        @click="toggleProjectApartments"
        class="w-full bg-white/10 rounded-[14px] py-3 md:py-4 flex items-center justify-center cursor-pointer hover:bg-white/15 transition-colors mb-6 md:mb-8 lg:mb-10"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          class="text-white/60 transition-transform duration-300"
          :class="{ 'rotate-180': showProjectApartments }"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <Transition name="apartments-fade">
        <div v-if="showProjectApartments" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5 mb-6 md:mb-8 lg:mb-10">
          <ApartmentCard
            v-for="item in projectApartments"
            :key="item.id"
            :apartment="item"
          />
        </div>
      </Transition>

      <!-- Property Cards Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5 mb-6 md:mb-8 lg:mb-10">
        <ApartmentCard
          v-for="item in properties"
          :key="item.id"
          :apartment="item"
        />
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
import { ref, computed } from 'vue'
import { apartments } from '~/data/apartments'

// Project apartments toggle
const showProjectApartments = ref(false)

const toggleProjectApartments = () => {
  showProjectApartments.value = !showProjectApartments.value
}

const planImage = '/images/property-plan.webp'

// Project apartments (4 apartments from current project)
const projectApartments = [
  { 
    id: 1, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная квартира', 
    area: '54.4 м²', 
    areaNum: 54.4,
    price: '5 167 050 ₽', 
    priceNum: 5167050,
    rooms: 2,
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    status: 'В продаже',
    image: '/images/apartments/1/picture.webp',
    imagePicture: '/images/apartments/1/picture.webp',
    imageFurniture: '/images/apartments/1/furniture.webp',
    imageDimentions: '/images/apartments/1/dimentions.webp'
  },
  { 
    id: 2, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '2-комнатная квартира', 
    area: '68.3 м²', 
    areaNum: 68.3,
    price: '6 355 620 ₽', 
    priceNum: 6355620,
    rooms: 2,
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    status: 'В продаже',
    image: '/images/apartments/2/picture.webp',
    imagePicture: '/images/apartments/2/picture.webp',
    imageFurniture: '/images/apartments/2/furniture.webp',
    imageDimentions: '/images/apartments/2/dimentions.webp'
  },
  { 
    id: 3, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '1-комнатная квартира', 
    area: '43.1 м²', 
    areaNum: 43.1,
    price: '4 006 440 ₽', 
    priceNum: 4006440,
    rooms: 1,
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    status: 'В продаже',
    image: '/images/apartments/3/picture.webp',
    imagePicture: '/images/apartments/3/picture.webp',
    imageFurniture: '/images/apartments/3/furniture.webp',
    imageDimentions: '/images/apartments/3/dimentions.webp'
  },
  { 
    id: 5, 
    complex: 'ЖК Экогород 3, д. 1', 
    title: '1-комнатная квартира', 
    area: '42.8 м²', 
    areaNum: 42.8,
    price: '3 976 680 ₽', 
    priceNum: 3976680,
    rooms: 1,
    entrance: 1,
    totalEntrances: 4,
    floor: 1,
    totalFloors: 8,
    status: 'В продаже',
    image: '/images/apartments/5/picture.webp',
    imagePicture: '/images/apartments/5/picture.webp',
    imageFurniture: '/images/apartments/5/furniture.webp',
    imageDimentions: '/images/apartments/5/dimentions.webp'
  }
]

// Price filter
const priceMin = 1000000
const priceMax = 50000000
const minPrice = ref(1000000)
const maxPrice = ref(50000000)
const minPriceInput = ref('1 000 000')
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

// Склонение слов для русского языка
const getRussianPlural = (count, one, few, many) => {
  const mod10 = count % 10
  const mod100 = count % 100
  
  if (mod100 >= 11 && mod100 <= 19) return many
  if (mod10 === 1) return one
  if (mod10 >= 2 && mod10 <= 4) return few
  return many
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

// Фильтрованные квартиры (computed)
const filteredProperties = computed(() => {
  // Получаем активные комнаты
  const activeRooms = roomOptions.value
    .filter(r => r.active)
    .map(r => {
      if (r.isStudio) return 0 // Студия = 0 комнат
      return parseInt(r.label)
    })

  return apartments.filter(apt => {
    // Фильтр по цене
    if (apt.priceNum < minPrice.value || apt.priceNum > maxPrice.value) {
      return false
    }
    
    // Фильтр по площади
    if (apt.areaNum < minArea.value || apt.areaNum > maxArea.value) {
      return false
    }
    
    // Фильтр по комнатам (если выбраны)
    if (activeRooms.length > 0 && !activeRooms.includes(apt.rooms)) {
      return false
    }
    
    return true
  })
})

// Используем filteredProperties в шаблоне
const properties = filteredProperties
</script>

<style scoped>
/* Apartments fade animation */
.apartments-fade-enter-active {
  animation: apartmentsFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.apartments-fade-leave-active {
  animation: apartmentsFadeOut 0.25s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}

@keyframes apartmentsFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes apartmentsFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

/* Range Slider Thumbs Interaction Fix */
input[type=range]::-webkit-slider-thumb {
  pointer-events: auto;
  width: 20px;
  height: 20px;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 50%;
  background: transparent; /* Keep invisible but clickable */
}

input[type=range]::-moz-range-thumb {
  pointer-events: auto;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background: transparent;
}
</style>
