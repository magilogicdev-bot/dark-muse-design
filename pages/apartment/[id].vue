<template>
  <div class="min-h-screen bg-primary text-white">
    <!-- Hero Section -->
    <section class="apartment-hero-section relative">
      <div class="apartment-hero-container">
        <!-- Left Panel: Apartment Details (Dark) -->
        <div class="apartment-info-panel">
          <div class="apartment-info-content">
            <!-- Title -->
            <div class="apartment-title-block">
              <h1 class="apartment-title">
                {{ apartment.rooms }}-КОМН.
              </h1>
              <p class="apartment-subtitle">
                КВАРТИРА, {{ apartment.area }}
              </p>
            </div>

            <!-- Specifications Table -->
            <div class="apartment-specs">
              <div class="spec-row">
                <span class="spec-label">Проект</span>
                <span class="spec-value">{{ apartment.complex }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Корпус</span>
                <span class="spec-value">{{ extraSpecs.building }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Этаж</span>
                <span class="spec-value">{{ apartment.floor }} из {{ apartment.totalFloors }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Выдача ключей</span>
                <span class="spec-value">{{ extraSpecs.keyHandover }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Условный номер</span>
                <span class="spec-value">{{ extraSpecs.conditionalNumber }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Цена за м²</span>
                <span class="spec-value">{{ extraSpecs.pricePerM2 }} руб.</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Стоимость</span>
                <span class="spec-value">{{ apartment.price }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Отделка</span>
                <span class="spec-value">{{ extraSpecs.finish }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">Высота потолков</span>
                <span class="spec-value">{{ extraSpecs.ceilingHeight }} м</span>
              </div>
            </div>

            <!-- Expandable Section -->
            <button 
              @click="showAllParams = !showAllParams"
              class="all-params-btn"
            >
              <span>Все параметры квартиры</span>
              <svg 
                :class="['w-4 h-4 transition-transform duration-300', showAllParams ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Additional Info -->
            <div class="apartment-additional-info">
              <div class="additional-row">
                <span class="additional-label">Расположение</span>
                <span class="additional-value">{{ extraSpecs.location }}</span>
              </div>
              <div class="additional-row">
                <span class="additional-label">Окна выходят</span>
                <span class="additional-value">{{ extraSpecs.windowsView }}</span>
              </div>
            </div>

            <!-- Price Display -->
            <div class="apartment-price-block">
              <p class="price-label">СТОИМОСТЬ КВАРТИРЫ</p>
              <div class="price-row">
                <button 
                  @click="toggleFavorite"
                  class="favorite-btn"
                  aria-label="Добавить в избранное"
                >
                  <img 
                    :src="isFavorite ? '/images/heart-orange-icon.webp' : '/images/heart-outline.svg'" 
                    alt="Избранное"
                    class="favorite-icon"
                    :class="{ 'favorite-icon--active': isFavorite }"
                  />
                </button>
                <p class="price-value">{{ apartment.price }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Floor Plan Viewer (White) -->
        <div class="apartment-plan-panel">
          <!-- Sidebar Controls - Left side -->
          <div class="plan-controls-sidebar">
            <!-- Zoom -->
            <button 
              @click="handleZoom"
              class="plan-control-btn"
              aria-label="Увеличить"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            
            <!-- Favorite -->
            <button 
              @click="toggleFavorite"
              class="plan-control-btn"
              aria-label="Добавить в избранное"
            >
              <svg 
                :class="['w-5 h-5 transition-colors', isFavorite ? 'text-[#ff8700] fill-[#ff8700]' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <!-- Share -->
            <button 
              @click="handleShare"
              class="plan-control-btn"
              aria-label="Поделиться"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            <!-- Print -->
            <button 
              @click="handlePrint"
              class="plan-control-btn"
              aria-label="Печать"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>

          <!-- 3D Compass Control - Bottom left -->
          <div class="compass-control cursor-pointer" @click="toggle3DViewer">
            <img 
              src="/images/3d-control-compass-38362c.webp" 
              alt="3D контрол направления"
              class="w-full h-full object-contain"
            />
          </div>

          <!-- Floor Plan Image Container -->
          <div class="plan-image-container">
            <!-- Furniture View -->
            <img 
              v-if="currentView === 'furniture'"
              :src="apartment.imageFurniture || apartment.image" 
              :alt="`Планировка ${apartment.rooms}-комнатной квартиры с мебелью`"
              class="plan-image"
            />
            
            <!-- Dimensions View -->
            <img 
              v-if="currentView === 'dimensions'"
              :src="apartment.imageDimentions || apartment.image" 
              :alt="`Планировка ${apartment.rooms}-комнатной квартиры с размерами`"
              class="plan-image"
            />
            
            <!-- Design View -->
            <img 
              v-if="currentView === 'design'"
              :src="apartment.imagePicture || apartment.image" 
              :alt="`Дизайн ${apartment.rooms}-комнатной квартиры`"
              class="plan-image"
            />
            
            <!-- Floor View -->
            <img 
              v-if="currentView === 'floor'"
              :src="apartment.imagePicture || apartment.image" 
              :alt="`${apartment.rooms}-комнатная квартира на этаже`"
              class="plan-image"
            />
          </div>

          <!-- Bottom Navigation Tabs -->
          <div class="plan-tabs-container">
            <div class="plan-tabs">
              <button
                @click="currentView = 'furniture'"
                :class="['plan-tab', currentView === 'furniture' ? 'plan-tab--active' : '']"
              >
                С мебелью
              </button>
              <button
                @click="currentView = 'dimensions'"
                :class="['plan-tab', currentView === 'dimensions' ? 'plan-tab--active' : '']"
              >
                С размерами
              </button>
              <button
                @click="currentView = 'design'"
                :class="['plan-tab', currentView === 'design' ? 'plan-tab--active' : '']"
              >
                Дизайн
              </button>
              <button
                @click="currentView = 'floor'"
                :class="['plan-tab', currentView === 'floor' ? 'plan-tab--active' : '']"
              >
                На этаже
              </button>
              
              <!-- Buy Button -->
              <NuxtLink
                to="/buy-apartment"
                class="buy-btn"
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
    </section>

    <!-- White Box Finishing Section -->
    <WhiteBoxFinishingSection />

    <!-- Similar Apartments Section -->
    <SimilarApartmentsSection :current-apartment="apartment" />

    
    <!-- Mortgage Banks Section -->
    <MortgageBanksSection />
    <!-- Contact Form Section -->
    <ContactFormSection />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { apartments } from '~/data/apartments'

const route = useRoute()
const apartmentId = computed(() => route.params.id)

const apartment = computed(() => {
  const id = parseInt(apartmentId.value)
  return apartments.find(a => a.id === id) || apartments[0]
})

// Дополнительные характеристики (моки для примера, так как в основной базе их нет)
const extraSpecs = computed(() => ({
  building: '1',
  keyHandover: 'III кв. 2026 г.',
  conditionalNumber: `${apartment.value.id}`,
  pricePerM2: Math.round(apartment.value.priceNum / apartment.value.areaNum).toLocaleString('ru-RU'),
  finish: 'White box',
  ceilingHeight: '2.72',
  location: 'Ярославль, Заволжский р-н',
  windowsView: 'Во двор / На улицу'
}))

const { isFavorite: checkFavorite, toggleFavorite: toggleGlobalFavorite } = useFavorites()

const isFavorite = computed(() => checkFavorite(apartment.value.id))

const showAllParams = ref(false)
const currentView = ref('furniture')
const is3DViewerOpen = ref(false)

const toggleFavorite = () => {
  toggleGlobalFavorite(apartment.value.id)
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
  window.open('/3d-map', '_blank')
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

<style scoped>
/* Hero Section Layout */
.apartment-hero-section {
  background-color: #2A2C38;
}

.apartment-hero-container {
  display: grid;
  grid-template-columns: minmax(320px, 480px) 1fr;
  height: 90vh;
  max-height: 1080px;
  gap: 0;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

/* Left Panel - Dark Info */
.apartment-info-panel {
  background-color: transparent;
  padding: clamp(24px, 3vw, 48px) 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.apartment-info-content {
  padding-left: clamp(16px, 5vw, 60px);
  padding-right: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Title Block */
.apartment-title-block {
  margin-bottom: clamp(24px, 3vw, 40px);
}

.apartment-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 500;
  line-height: 1.1;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  color: #fff;
}

.apartment-subtitle {
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-transform: uppercase;
}

/* Specifications Table */
.apartment-specs {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(8px, 1vw, 12px) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.spec-label {
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: rgba(255, 255, 255, 0.5);
}

.spec-value {
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  font-weight: 500;
  color: #fff;
}

/* All Params Button */
.all-params-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: clamp(12px, 1.5vw, 16px) 0;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  cursor: pointer;
  transition: color 0.3s ease;
  text-align: left;
}

.all-params-btn:hover {
  color: #fff;
}

/* Additional Info */
.apartment-additional-info {
  padding-top: clamp(16px, 2vw, 24px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: clamp(16px, 2vw, 24px);
}

.additional-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: clamp(8px, 1vw, 12px);
}

.additional-label {
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}

.additional-value {
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  font-weight: 500;
  color: #fff;
  text-align: right;
  max-width: 60%;
}

/* Price Block */
.apartment-price-block {
  margin-top: auto;
  padding-top: clamp(20px, 3vw, 32px);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.price-label {
  font-size: clamp(0.65rem, 0.8vw, 0.75rem);
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 clamp(8px, 1vw, 12px) 0;
}

.price-row {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 24px);
}

.favorite-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-icon {
  width: clamp(28px, 3.5vw, 36px);
  height: clamp(28px, 3.5vw, 36px);
  object-fit: contain;
  display: block;
  transition: all 0.3s ease;
}

.favorite-icon:not(.favorite-icon--active) {
  opacity: 0.6;
}

.price-value {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 500;
  color: #fff;
  margin: 0;
  line-height: 1;
}

.price-currency {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
}

/* Right Panel - White Plan Viewer */
.apartment-plan-panel {
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Sidebar Controls */
.plan-controls-sidebar {
  position: absolute;
  left: clamp(16px, 2vw, 24px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.2vw, 16px);
}

.plan-control-btn {
  width: clamp(36px, 3vw, 44px);
  height: clamp(36px, 3vw, 44px);
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #6b6b6b;
}

.plan-control-btn:hover {
  background: #e8e8e8;
  color: #333;
}

/* Compass Control */
.compass-control {
  position: absolute;
  left: clamp(16px, 2vw, 24px);
  bottom: clamp(80px, 10vw, 100px);
  width: clamp(48px, 4vw, 60px);
  height: clamp(48px, 4vw, 60px);
  z-index: 10;
}

/* Plan Image Container */
.plan-image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(30px, 4vw, 50px);
  background: #fff;
  overflow: hidden;
}

.plan-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Bottom Tabs Container */
.plan-tabs-container {
  position: absolute;
  bottom: clamp(16px, 2vw, 24px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.plan-tabs {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1vw, 10px);
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(6px, 0.8vw, 8px);
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.plan-tab {
  padding: clamp(8px, 1vw, 12px) clamp(14px, 1.5vw, 20px);
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  background: #fff;
  color: #666;
  font-size: clamp(0.7rem, 0.9vw, 0.85rem);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.plan-tab:hover {
  background: #f5f5f5;
  color: #333;
}

.plan-tab--active {
  background: var(--page-bg, #2A2C38);
  color: #fff;
  border-color: var(--page-bg, #2A2C38);
}

.plan-tab--active:hover {
  background: var(--page-bg, #2A2C38);
  color: #fff;
}

/* Buy Button */
.buy-btn {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 10px);
  padding: clamp(8px, 1vw, 12px) clamp(20px, 2.5vw, 32px);
  background: #ff8700;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: clamp(0.7rem, 0.9vw, 0.85rem);
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.buy-btn:hover {
  background: #ff9f34;
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 1024px) {
  .apartment-hero-container {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .apartment-hero-section {
    min-height: auto;
    padding-top: 0; /* Header is fixed, main content has padding-top from layout */
  }

  .apartment-info-panel {
    order: 2; /* Info below plan */
    padding: 32px 20px;
  }

  .apartment-info-content {
    padding-left: 0;
    padding-right: 0;
  }
  
  .apartment-plan-panel {
    order: 1; /* Plan above info */
    min-height: 450px;
    height: 60vh;
  }
  
  .plan-controls-sidebar {
    top: 20px;
    transform: none;
    left: 16px;
    gap: 8px;
  }
  
  .plan-tabs {
    flex-wrap: wrap;
    justify-content: center;
    max-width: 95vw;
    gap: 6px;
    padding: 6px;
  }

  .plan-tab {
    padding: 6px 12px;
    font-size: 11px;
  }

  .buy-btn {
    width: 100%;
    justify-content: center;
    margin-top: 4px;
    padding: 10px;
    font-size: 12px;
  }

  .compass-control {
    bottom: 90px;
  }
}

@media (max-width: 640px) {
  .apartment-title {
    font-size: 24px;
  }
  
  .apartment-subtitle {
    font-size: 18px;
  }

  .apartment-info-panel {
    padding: 30px 16px;
  }
  
  .apartment-plan-panel {
    height: 50vh;
    min-height: 350px;
  }
  
  .plan-tabs-container {
    bottom: 12px;
    width: 92%;
  }
  
  .plan-image-container {
    padding: 40px 20px 80px 20px;
  }

  .price-value {
    font-size: 28px;
  }

  .spec-row {
    padding: 10px 0;
  }

  .spec-label, .spec-value, .additional-label, .additional-value, .all-params-btn {
    font-size: 13px;
  }
}
</style>
