<template>
  <div class="contacts-page min-h-screen bg-[#2A2C38] text-white relative flex flex-col font-sans">
    <!-- === DESKTOP LAYOUT (Hidden on Mobile) === -->
    <div class="hidden lg:flex flex-col min-h-screen relative w-full items-center justify-center overflow-hidden">
      <!-- Main Content -->
      <main class="w-full max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 flex justify-between items-center gap-12 xl:gap-20">
      <!-- === LEFT COLUMN: Info (3-2 Grouping - Compact) === -->
      <section class="flex flex-col justify-center flex-[0_0_25%]">
        <!-- Title -->
        <h1 class="text-[clamp(32px,4vw,56px)] font-normal tracking-wide leading-none uppercase m-0 mb-6 lg:mb-10">
          КОНТАКТЫ
        </h1>
        
        <!-- TOP GROUP (3 paragraphs) -->
        <div class="space-y-4 lg:space-y-6">
          <!-- 1. Address -->
          <div class="space-y-1">
            <p class="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
              г. Ярославль, пл. Труда, д. 1,
            </p>
            <p class="text-sm md:text-base lg:text-lg text-white/50 leading-relaxed">
              Бизнес-центр Towers, офис 605
            </p>
          </div>

          <!-- 2. Photo -->
          <div class="w-full max-w-[380px] aspect-[16/9] rounded-xl overflow-hidden border border-white/5 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]">
            <img
              src="/images/contacts/building-photo.webp"
              alt="Бизнес-центр"
              class="w-full h-full object-cover grayscale-[0.2] brightness-90"
              onerror="this.src='/images/contacts/image-49.webp'"
            />
          </div>

          <!-- 3. Working Hours -->
          <div class="space-y-1">
            <p class="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.15em] font-medium">
              Время работы отдела продаж:
            </p>
            <p class="text-sm md:text-base lg:text-lg text-[#f8b543] leading-relaxed font-medium">
              Сегодня с 09:00 до 18:00
            </p>
          </div>
        </div>

        <!-- GAP BETWEEN GROUPS -->
        <div class="h-6 lg:h-10"></div>

        <!-- BOTTOM GROUP (2 paragraphs) -->
        <div class="space-y-4 lg:space-y-6">
          <!-- 4. Contact List -->
          <div class="space-y-2">
            <div v-for="(phone, index) in contactList" :key="index" class="flex items-center gap-3 group">
              <a :href="`tel:${phone.href}`" class="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed transition-colors whitespace-nowrap hover:text-white">
                {{ phone.display }}
              </a>
              <div class="w-1 h-1 rounded-full bg-white/20"></div>
              <span class="text-[10px] md:text-xs text-white/40 uppercase tracking-wide">
                {{ phone.label }}
              </span>
            </div>
          </div>

          <!-- 5. CTA Block -->
          <div class="flex flex-col items-start gap-3">
            <button class="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full text-sm font-bold italic transition-all duration-300 shadow-xl active:scale-95">
              Оставить заявку
            </button>
            <p class="text-xs md:text-sm text-white/50 max-w-[340px] leading-relaxed">
              Мы работаем только с лидерами страхового рынка. Гарантируем прозрачные условия и официальные полисы.
            </p>
          </div>
        </div>
      </section>

      <!-- Map Container (blended, no shadow) -->
      <div class="flex-[0_0_62%] aspect-[4/3] relative select-none">
        <img
          src="/images/contacts/screenshot-reference.webp"
          alt="Карта"
          class="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
        
        <!-- Houses Icon Removed as requested -->

        <!-- Dynamic Markers and Lines -->
        <div v-for="marker in markers" :key="marker.id" 
             class="group absolute flex flex-col items-center gap-1 cursor-pointer"
             :style="{ top: marker.top, left: marker.left }"
             @mouseenter="hoveredMarker = marker.id"
             @mouseleave="hoveredMarker = null"
        >
          <!-- Dotted Line (SVG) -->
          <svg 
            v-if="hoveredMarker === marker.id"
            class="absolute pointer-events-none z-0 overflow-visible"
            style="top: 27px; left: 30px;"
            width="1000"
            height="1000"
          >
            <!-- 
                 Calculate the vector from current marker to houses icon.
                 Start point (center of marker): (30, 27) in SVG local space
                 End point (center of houses): (dx, dy)
            -->
            <!-- 
                 Calculate the vector from current marker to houses icon.
                 Start point (center of marker): (30, 27) in SVG local space
                 End point (center of houses): (dx, dy)
            -->
            <template v-if="getLineCoords(marker)">
              <line 
                v-if="getLineCoords(marker).distance > 35 * 2.5"
                :x1="getLineCoords(marker).ux * 35" 
                :y1="getLineCoords(marker).uy * 35" 
                :x2="getLineCoords(marker).dx - (getLineCoords(marker).ux * 35)" 
                :y2="getLineCoords(marker).dy - (getLineCoords(marker).uy * 35)" 
                stroke="white" 
                stroke-width="1.5" 
                stroke-dasharray="6 6"
                stroke-opacity="0.8"
                class="animate-dash"
              />
              
              <!-- Person and Time on Line (at 40% of the shortened line for visual balance) -->
              <foreignObject 
                v-if="getLineCoords(marker).distance > 35 * 2.5"
                :x="(getLineCoords(marker).dx * 0.4) - 30" 
                :y="(getLineCoords(marker).dy * 0.4) - 30" 
                width="60" 
                height="60"
              >
                <div class="flex flex-col items-center justify-center bg-[#2A2C38]/90 backdrop-blur-md rounded-xl p-1.5 border border-white/30 shadow-2xl scale-90">
                  <svg class="w-4 h-4 text-[#f8b543]" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                    <path d="M10 5.5v5.5M7 8.5l3-1.5 3 1.5M8 15l2-4 2 5" stroke-linecap="round"/>
                  </svg>
                  <span class="text-[9px] font-black text-white whitespace-nowrap uppercase tracking-wider">{{ marker.time }}</span>
                </div>
              </foreignObject>
            </template>
          </svg>

          <!-- Marker Icon -->
          <div class="w-[72px] h-[72px] rounded-full border border-white relative overflow-hidden flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg">
            <img
              :src="marker.image"
              :alt="marker.name"
              class="w-full h-full object-cover object-center pointer-events-none rounded-full"
            />
          </div>
          
          <!-- Time under image -->
          <div class="flex items-center gap-1 z-10">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
            </svg>
            <span class="text-white text-xs font-medium">{{ marker.time }}</span>
          </div>
          
          <!-- Marker Name -->
          <div class="text-[12px] leading-[14px] text-white/67 text-center tracking-[-0.96px] font-light font-sans" :style="{ maxWidth: marker.maxWidth || 'none' }">
            {{ marker.name }}
          </div>
        </div>

        <!-- 3D Icon (far right, aligned with map) -->
        <a 
          href="/3d-map"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute bottom-[28%] right-[25%] w-[130px] h-[110px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity z-20" 
        >
          <div class="w-20 h-20 lg:w-24 lg:h-24 relative">
            <img
              src="/images/3d-icon-button.webp"
              alt="3D"
              class="w-full h-full object-contain"
            />
          </div>
        </a>

        <!-- Ecogorod Address with Icon (positioned relative to map) -->
        <div class="absolute top-[75%] right-[10%] flex items-center gap-2 lg:gap-3 z-10 pointer-events-none">
          <img
            src="/images/Group-ecogorod.svg"
            alt=""
            class="w-[45px] h-[45px] lg:w-[60px] lg:h-[60px] flex-shrink-0"
          />
          <p class="text-white text-[13px] lg:text-[15px] leading-tight font-normal font-sans whitespace-nowrap text-shadow">
            Экогород 3, посёлок Красный Бор,<br> Ярославский муниципальный округ, 150518
          </p>
        </div>
      </div>
    </main>

    <!-- Social Icons - Bottom Right (next to menu button) -->
    <div class="fixed z-[999] flex items-center gap-2 social-icons-position">
      <a 
        :href="config.contacts.social.vk" 
        class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="VKontakte"
      >
        <img 
          src="/images/social-vk-bg.svg" 
          alt="VK" 
          class="w-full h-full object-contain"
        />
      </a>
      <a 
        :href="config.contacts.social.telegram" 
        class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="Telegram"
      >
        <img 
          src="/images/social-telegram-bg.svg" 
          alt="Telegram" 
          class="w-full h-full object-contain"
        />
      </a>
      <a 
        :href="config.contacts.social.whatsapp" 
        class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="Viber"
      >
        <img 
          src="/images/ellipse-14.webp" 
          alt="Viber" 
          class="w-full h-full object-contain"
        />
      </a>
    </div>
    </div>

    <!-- === MOBILE LAYOUT (Visible on Mobile) === -->
    <div class="lg:hidden flex flex-col w-full bg-[#2A2C38] px-4 pt-3 pb-20 relative">
      <!-- Mobile Title & Address -->
      <section class="mb-6 px-1">
        <h1 class="text-[36px] leading-tight font-normal uppercase tracking-tight mb-5">КОНТАКТЫ</h1>
        <div class="space-y-0.5 text-sm text-white font-light">
          <p>г. Ярославль, пл. Труда, д. 1,</p>
          <p class="text-white">Бизнес-центр Towers, офис 605</p>
        </div>
      </section>

      <!-- Mobile Contact Cards -->
      <section class="space-y-3 mb-6 px-1">
        <div 
          v-for="(contact, index) in contactList" 
          :key="index"
          class="bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.1)] border border-white/10 rounded-xl p-4 relative group active:scale-[0.98] transition-transform"
        >
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-start">
              <h3 class="text-[10px] font-bold uppercase tracking-widest text-white">{{ contact.label }}</h3>
              <a :href="`tel:${contact.href}`" class="text-base font-medium text-white">{{ contact.display }}</a>
            </div>
            <div class="flex justify-between items-end">
              <p class="text-[8px] leading-relaxed text-white max-w-[160px] uppercase font-medium tracking-wider">Единый телефон по вопросам приобретения недвижимости</p>
              <div class="w-8 h-8 flex items-center justify-center text-white/30">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mobile Social Row -->
      <section class="flex justify-center items-center gap-4 mb-8">
        <a :href="config.contacts.social.vk" class="w-12 h-12 rounded-full overflow-hidden shadow-lg transform active:scale-90 transition-transform">
          <img src="/images/social-vk-bg.svg" alt="VK" class="w-full h-full object-cover" />
        </a>
        <a :href="config.contacts.social.telegram" class="w-12 h-12 rounded-full overflow-hidden shadow-lg transform active:scale-90 transition-transform">
          <img src="/images/social-telegram-bg.svg" alt="Telegram" class="w-full h-full object-cover" />
        </a>
        <a :href="config.contacts.social.whatsapp" class="w-12 h-12 rounded-full overflow-hidden shadow-lg transform active:scale-90 transition-transform">
          <img src="/images/ellipse-14.webp" alt="Viber" class="w-full h-full object-cover" />
        </a>
      </section>

      <!-- Separator Line -->
      <div class="w-full h-px bg-white/20 mb-8"></div>

      <!-- Mobile Footer Action -->
      <div v-if="!isMenuOpen" class="static z-[1004] px-1 mt-1 pointer-events-none">
        <div class="flex flex-col items-end gap-2 pointer-events-auto relative">
          <!-- Action Menu Buttons (shown when toggle is clicked) -->
          <Transition name="menu-fade">
            <div v-if="isActionMenuOpen" class="flex flex-col gap-2 items-end">
              <button 
                @click="handlePhone"
                class="w-12 h-12 rounded-full border border-white/20 bg-[#2A2C38] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                aria-label="Позвонить"
              >
                <img
                  src="/images/menu-icons/menu-icon-3.webp"
                  alt="Позвонить"
                  class="w-full h-full object-contain"
                />
              </button>
              <button 
                @click="handleTelegram"
                class="w-12 h-12 rounded-full border border-white/20 bg-[#2A2C38] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all p-2"
                aria-label="Telegram"
              >
                <img
                  src="/images/menu-icons/menu-icon-2.webp"
                  alt="Telegram"
                  class="w-full h-full object-contain"
                />
              </button>
              <button 
                @click="handleWhatsApp"
                class="w-12 h-12 rounded-full border border-white/20 bg-[#2A2C38] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all p-2"
                aria-label="WhatsApp"
              >
                <img
                  src="/images/menu-icons/menu-icon-1.webp"
                  alt="WhatsApp"
                  class="w-full h-full object-contain"
                />
              </button>
            </div>
          </Transition>

          <!-- Main Action Buttons Row -->
          <div class="flex items-center gap-2 w-full relative z-0">
            <button class="flex-grow min-h-[56px] bg-gradient-to-r from-[#1e4a28] to-[#2d6e3b] border border-white/30 text-white rounded-xl py-3 px-4 text-[10px] font-bold uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
              Оставить заявку на связь
            </button>
            <button 
              @click="scrollToTop"
              class="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-[#2A2C38] shadow-2xl active:scale-95 transition-all relative overflow-hidden flex-shrink-0"
              :class="{ 'rotate-180': isActionMenuOpen }"
            >
              <NuxtImg
                src="/images/icons/scroll-to-top.webp"
                alt="Прокрутить вверх"
                class="w-full h-full object-contain relative z-10 transition-transform duration-300"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'
import { useMenu } from '~/composables/useMenu'

const { isMenuOpen, toggleMenu, closeMenu } = useMenu()
const config = siteConfig

definePageMeta({
  layout: 'home'
})


const hoveredMarker = ref(null)
const isActionMenuOpen = ref(false)

const toggleActionMenu = () => {
  isActionMenuOpen.value = !isActionMenuOpen.value
}

const scrollToTop = () => {
  if (process.client) {
    isActionMenuOpen.value = !isActionMenuOpen.value
    if (!isActionMenuOpen.value) {
      // Если меню закрывается, прокручиваем наверх
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

const handlePhone = () => {
  if (process.client) {
    window.location.href = 'tel:' + config.contacts.phone.formatted
  }
}

const handleTelegram = () => {
  if (process.client && config.contacts.social.telegram) {
    window.open(config.contacts.social.telegram, '_blank')
  }
}

const handleWhatsApp = () => {
  if (process.client && config.contacts.social.whatsapp) {
    window.open(config.contacts.social.whatsapp, '_blank')
  }
}

const getLineCoords = (marker) => {
  const dx = (parseFloat('50.00') - parseFloat(marker.left)) * 7
  const dy = (parseFloat('55.00') - parseFloat(marker.top)) * 7
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  if (distance === 0) return { dx: 0, dy: 0, distance: 0, ux: 0, uy: 0 }
  
  const ux = dx / distance
  const uy = dy / distance
  
  return { dx, dy, distance, ux, uy }
}

const markers = [
  {
    id: 'ecopark',
    name: 'ЭКОПАРК',
    time: '2 мин',
    top: '5.66%',
    left: '44.74%',
    image: '/images/f1f38b64031d15233f024b39314b7eab79d3ddb7.webp'
  },
  {
    id: 'restaurant',
    name: 'Вкусно и точка',
    time: '5 мин',
    top: '15.38%',
    left: '28.75%',
    image: '/images/83e26791ee87bf1ae2be35217a2eebe9e9429a70.webp'
  },
  {
    id: 'polyclinic',
    name: 'Поликлиника',
    time: '5 мин',
    top: '53.75%',
    left: '0.45%',
    image: '/images/04019e2f95b75bd1ea76af66328601902522b470.webp'
  },
  {
    id: 'globus',
    name: 'Тц Глобус',
    time: '10 мин',
    top: '33.83%',
    left: '8.61%',
    image: '/images/93844c73c2bc37792fbb814d0135be1a06aa6900.webp'
  },
  {
    id: 'school',
    name: 'Строительство современной новой школы\nпос. Красный бор',
    time: '3 мин',
    top: '69.31%',
    left: '3.47%',
    image: '/images/4af098352d98e4197170afdcd0d2dbb8517cb0c6.webp',
    maxWidth: '150px'
  }
]

const contactList = [
  { display: '+7 (910) 973–00–99', href: '+79109730099', label: 'ОТДЕЛ ПРОДАЖ' },
  { display: '+7 (980) 650–74–63', href: '+79806507463', label: 'РЕКЛАМА' },
  { display: '+7 (980) 708–16–49', href: '+79807081649', label: 'СНАБЖЕНИЕ' },
  { display: '+7 (910) 973–33–73', href: '+79109733373', label: 'БУХГАЛТЕРИЯ' }
]

</script>

<style scoped>
.contacts-page {
  font-family: 'Manrope', 'Inter', sans-serif;
  overflow: hidden;
  height: 100vh;
}

@media (max-width: 1024px) {
  .contacts-page {
    overflow-y: auto;
    height: 100dvh;
    min-height: -webkit-fill-available;
  }
}

h1 {
  /* Removed custom font to match site-wide typography */
  font-weight: 400; 
}

@keyframes dash {
  to {
    stroke-dashoffset: -24;
  }
}

.animate-dash {
  animation: dash 1s linear infinite;
}

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.98) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

main > div > section {
  animation: fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Social icons positioning - aligned with ActionMenuButton */
.social-icons-position {
  bottom: calc(clamp(24px, 2vw, 32px) + 8px); /* Center vertically with 64px toggle button */
  right: calc(clamp(40px, 5vw, 80px) + 64px + 20px); /* 80px(right) + 64px(width) + 40px(gap) */
}

@media (max-width: 1024px) {
  .social-icons-position {
    bottom: clamp(16px, 2vw, 24px);
    right: calc(clamp(16px, 2vw, 24px) + clamp(44px, 4vw, 56px) + 16px);
  }
}

@media (max-width: 640px) {
  .social-icons-position {
    bottom: clamp(12px, 2vw, 20px);
    right: calc(clamp(12px, 2vw, 20px) + clamp(40px, 4vw, 52px) + 16px);
  }
}

/* Center dropdown menu vertically on mobile */
@media (max-width: 1024px) {
  :deep(.dropdown-menu) {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    border-radius: 20px !important;
    background: rgba(42, 44, 56, 0.95) !important;
    backdrop-filter: blur(10px) !important;
  }
  
  :deep(.dropdown-menu__nav) {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    height: 100% !important;
  }
}

/* Menu fade animation */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

</style>

