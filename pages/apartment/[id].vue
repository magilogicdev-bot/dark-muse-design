<template>
  <div class="min-h-screen bg-primary text-white">
    <section class="py-8 md:py-12 lg:py-16 xl:py-20">
      <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
          <!-- Left Panel: Apartment Details -->
          <div class="flex flex-col space-y-6 lg:space-y-8">
            <!-- Title -->
            <div>
              <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight mb-2">
                {{ apartment.rooms }}-КОМН.
              </h1>
              <p class="text-xl md:text-2xl lg:text-3xl text-white/80 uppercase">
                КВАРТИРА, {{ apartment.area }}
              </p>
            </div>

            <!-- Specifications -->
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Проект:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.complex }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Корпус:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.building }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Этаж:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.floor }} из {{ apartment.totalFloors }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Выдача ключей:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.keyHandover }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Условный номер:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.conditionalNumber }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Цена за м²:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.pricePerM2 }} руб.</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Стоимость:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.price }} руб.</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Отделка:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.finish }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-sm md:text-base text-white/70">Высота потолков:</span>
                <span class="text-sm md:text-base font-medium">{{ apartment.ceilingHeight }} м</span>
              </div>
            </div>

            <!-- Expandable Section -->
            <button 
              @click="showAllParams = !showAllParams"
              class="flex items-center justify-between text-sm md:text-base text-white/70 hover:text-white transition-colors py-2"
            >
              <span>Все параметры квартиры</span>
              <svg 
                :class="['w-4 h-4 transition-transform', showAllParams ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Additional Info -->
            <div class="space-y-3 pt-4 border-t border-white/10">
              <div class="flex justify-between items-center">
                <span class="text-sm md:text-base text-white/70">Расположение:</span>
                <span class="text-sm md:text-base font-medium text-right">{{ apartment.location }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm md:text-base text-white/70">Окна выходят:</span>
                <span class="text-sm md:text-base font-medium text-right">{{ apartment.windowsView }}</span>
              </div>
            </div>

            <!-- Price Display -->
            <div class="pt-6 border-t border-white/20 mt-auto">
              <p class="text-xs md:text-sm text-white/60 uppercase mb-2">СТОИМОСТЬ КВАРТИРЫ</p>
              <div class="flex items-center gap-3">
                <button 
                  @click="toggleFavorite"
                  class="flex-shrink-0"
                  aria-label="Добавить в избранное"
                >
                  <svg 
                    :class="['w-6 h-6 transition-colors', isFavorite ? 'text-[#ff8700] fill-[#ff8700]' : 'text-white/60']"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <p class="text-3xl md:text-4xl lg:text-5xl font-medium">{{ apartment.price }} Руб.</p>
              </div>
            </div>
          </div>

          <!-- Right Panel: Floor Plan / 3D Viewer -->
          <div class="relative bg-white rounded-[12px] lg:rounded-[18px] xl:rounded-[22px] overflow-hidden">
            <!-- Sidebar Controls - Left side -->
            <div class="absolute left-4 bottom-20 md:bottom-24 lg:bottom-28 z-10 flex flex-col gap-3">
                <!-- Zoom -->
                <button 
                  @click="handleZoom"
                  class="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
                  aria-label="Увеличить"
                >
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
                
                <!-- Favorite -->
                <button 
                  @click="toggleFavorite"
                  class="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
                  aria-label="Добавить в избранное"
                >
                  <svg 
                    :class="['w-5 h-5 md:w-6 md:h-6 transition-colors', isFavorite ? 'text-[#ff8700] fill-[#ff8700]' : 'text-gray-700']"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <!-- Share -->
                <button 
                  @click="handleShare"
                  class="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
                  aria-label="Поделиться"
                >
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                
                <!-- Print -->
                <button 
                  @click="handlePrint"
                  class="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
                  aria-label="Печать"
                >
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
                
                <!-- 3D Compass Control -->
                <button 
                  @click="toggle3DViewer"
                  class="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200 relative overflow-hidden"
                  aria-label="3D контрол направления"
                >
                  <!-- Compass Icon from Figma -->
                  <img 
                    src="/images/3d-control-compass-38362c.webp" 
                    alt="3D контрол направления"
                    class="w-full h-full object-contain"
                  />
                </button>
            </div>

            <!-- Floor Plan / 3D Viewer Container -->
            <div class="absolute w-full aspect-[2/1] md:aspect-[16/9] bg-gray-50 flex items-center justify-center top-[242px]">
              <!-- Floor Plan Image -->
              <img 
                v-if="currentView === 'plan'"
                :src="apartment.image" 
                :alt="`Планировка ${apartment.rooms}-комнатной квартиры`"
                class="absolute max-w-full max-h-full object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              
              <!-- Design View -->
              <img 
                v-if="currentView === 'design'"
                :src="apartment.designImage || apartment.image" 
                :alt="`Дизайн ${apartment.rooms}-комнатной квартиры`"
                class="absolute max-w-full max-h-full object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              
              <!-- Section View -->
              <img 
                v-if="currentView === 'section'"
                :src="apartment.sectionImage || apartment.image" 
                :alt="`В секции ${apartment.rooms}-комнатной квартиры`"
                class="absolute max-w-full max-h-full object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              
              <!-- 3D Viewer Placeholder -->
              <div 
                v-if="currentView === '3d'"
                class="w-full h-full flex items-center justify-center bg-gray-100"
              >
                <p class="text-gray-500 text-sm">3D просмотр</p>
              </div>
            </div>

            <!-- Bottom Navigation - Full Width -->
            <div class="absolute bottom-4 left-0 right-0 px-4 z-10">
              <div class="flex items-center justify-center gap-2 w-full">
                <!-- View Tabs -->
                <button
                  @click="currentView = 'plan'"
                  :class="[
                    'px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium uppercase transition-colors',
                    currentView === 'plan' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  Планировка
                </button>
                <button
                  @click="currentView = 'design'"
                  :class="[
                    'px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium uppercase transition-colors',
                    currentView === 'design' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  Дизайн
                </button>
                <button
                  @click="currentView = 'section'"
                  :class="[
                    'px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium uppercase transition-colors',
                    currentView === 'section' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  В секции
                </button>
                
                <!-- Buy Button -->
                <NuxtLink
                  to="/buy-apartment"
                  class="px-6 md:px-8 lg:px-10 py-1.5 md:py-2 bg-[#ff8700] text-white text-xs md:text-sm font-medium uppercase rounded-full hover:bg-[#ff9f34] transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  КУПИТЬ
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- White Box Finishing Section -->
    <WhiteBoxFinishingSection />

    <!-- Similar Apartments Section -->
    <SimilarApartmentsSection />

    
    <!-- Mortgage Banks Section -->
    <MortgageBanksSection />
    <!-- Contact Form Section -->
    <ContactFormSection />

    <!-- 3D Viewer Modal -->
    <Model3DViewer 
      :is-open="is3DViewerOpen" 
      :model-path="apartment.model3d"
      @close="is3DViewerOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const apartmentId = computed(() => route.params.id)

// Mock data - в реальном приложении это будет загружаться из API
// Структура данных соответствует PropertyFilters
const apartmentData = {
  1: {
    id: 1,
    rooms: '2',
    area: '54.39 м²',
    complex: 'Экогород 3',
    building: '26/1',
    floor: 1,
    totalFloors: 8,
    keyHandover: 'III кв. 2027 г.',
    conditionalNumber: '26-1-98',
    pricePerM2: '95 000',
    price: '5 167 050',
    finish: 'White box',
    ceilingHeight: '2.72',
    location: 'м. Пятницкое шоссе, Тушинская, Сходненская',
    windowsView: 'На окружающую застройку',
    image: '/images/apartment-plan-3room.webp',
    designImage: '/images/apartment-plan-3room.webp',
    sectionImage: '/images/apartment-plan-3room.webp',
    model3d: '/models/4.gltf'
  },
  2: {
    id: 2,
    rooms: '2',
    area: '54.39 м²',
    complex: 'Экогород 3',
    building: '26/1',
    floor: 1,
    totalFloors: 8,
    keyHandover: 'III кв. 2027 г.',
    conditionalNumber: '26-1-99',
    pricePerM2: '95 000',
    price: '5 167 050',
    finish: 'White box',
    ceilingHeight: '2.72',
    location: 'м. Пятницкое шоссе, Тушинская, Сходненская',
    windowsView: 'На окружающую застройку',
    image: '/images/apartment-plan-3room.webp',
    designImage: '/images/apartment-plan-3room.webp',
    sectionImage: '/images/apartment-plan-3room.webp',
    model3d: '/models/4.gltf'
  },
  3: {
    id: 3,
    rooms: '3',
    area: '71 м²',
    complex: 'Экогород 3',
    building: '26/1',
    floor: 2,
    totalFloors: 6,
    keyHandover: 'III кв. 2027 г.',
    conditionalNumber: '26-1-98',
    pricePerM2: '103 109',
    price: '5 070 752',
    finish: 'White box',
    ceilingHeight: '2.72',
    location: 'м. Пятницкое шоссе, Тушинская, Сходненская',
    windowsView: 'На окружающую застройку',
    image: '/images/apartment-plan-3room.webp',
    designImage: '/images/apartment-plan-3room.webp',
    sectionImage: '/images/apartment-plan-3room.webp',
    model3d: '/models/4.gltf'
  }
}

const apartment = computed(() => {
  const id = parseInt(apartmentId.value)
  return apartmentData[id] || apartmentData[1]
})

const showAllParams = ref(false)
const isFavorite = ref(false)
const currentView = ref('plan')
const is3DViewerOpen = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const handleZoom = () => {
  // Zoom functionality
  console.log('Zoom clicked')
}

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: `${apartment.value.rooms}-комнатная квартира, ${apartment.value.area}`,
      text: `Посмотрите эту квартиру: ${apartment.value.price} руб.`,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Ссылка скопирована в буфер обмена')
  }
}

const handlePrint = () => {
  window.print()
}

const toggle3DViewer = () => {
  is3DViewerOpen.value = !is3DViewerOpen.value
}

// SEO
useHead({
  title: `${apartment.value.rooms}-комнатная квартира, ${apartment.value.area} - ${apartment.value.complex}`,
  meta: [
    {
      name: 'description',
      content: `Квартира ${apartment.value.rooms} комнаты, ${apartment.value.area} в ${apartment.value.complex}. Цена: ${apartment.value.price} руб.`
    }
  ]
})
</script>
