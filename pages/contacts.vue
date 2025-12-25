<template>
  <div class="contacts-page h-screen max-h-[813px] bg-[#2A2C38] text-white relative flex flex-col justify-center items-start">
    <!-- Main Content -->
    <main class="flex-grow container mx-auto py-0 px-0 relative z-10 flex justify-center items-center">
      <!-- === LEFT COLUMN: Info (1/3 width) === -->
      <section class="flex flex-col space-y-2 lg:space-y-3 w-full lg:w-1/3 lg:pr-8">
        <!-- Title -->
        <h1 class="text-[clamp(24px,4vw,48px)] font-normal tracking-[-0.04em] leading-[0.9] uppercase m-0">
          КОНТАКТЫ
        </h1>
        
        <!-- Address -->
        <div class="space-y-0.5">
          <p class="text-[clamp(13px,1.1vw,18px)] font-medium leading-tight">
            г. Ярославль, пл. Труда, д. 1,
          </p>
          <p class="text-[clamp(13px,1.1vw,18px)] font-medium opacity-50 leading-tight">
            Бизнес-центр Towers, офис 605
          </p>
        </div>

        <!-- Building Photo -->
        <div class="w-full max-w-[400px] aspect-[2/1] rounded-xl overflow-hidden border border-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          <img
            src="/images/contacts/building-photo.webp"
            alt="Бизнес-центр"
            class="w-full h-full object-cover grayscale-[0.2] brightness-90"
            onerror="this.src='/images/contacts/image-49.png'"
          />
        </div>

        <!-- Working Info Group -->
        <div class="space-y-2">
          <!-- Working Hours -->
          <div class="space-y-0.5">
            <p class="text-[8px] opacity-40 uppercase tracking-[0.2em] font-black">
              Время работы отдела продаж:
            </p>
            <p class="text-[13px] lg:text-[15px] font-black">
              Сегодня с 09:00 до 18:00
            </p>
          </div>

          <!-- Contact List -->
          <div class="space-y-4 pt-4">
            <div v-for="(phone, index) in contactList" :key="index" class="flex items-center gap-4 group">
              <a :href="`tel:${phone.href}`" class="text-[clamp(18px,2vw,26px)] font-normal tracking-wide text-white transition-colors whitespace-nowrap">
                {{ phone.display }}
              </a>
              <div class="w-1 h-1 rounded-full bg-white/40"></div>
              <span class="text-[10px] text-white/60 uppercase tracking-[0.05em] font-medium">
                {{ phone.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- CTA Block -->
        <div class="flex flex-col items-start gap-2">
          <button class="bg-white text-[#2A2C38] hover:bg-white/90 px-8 py-3 rounded-full text-[14px] font-medium italic transition-all duration-300 shadow-xl active:scale-95 mb-6">
            Оставить заявку
          </button>
          <p class="text-[11px] text-white max-w-[340px] leading-relaxed font-light">
            Мы работаем только с лидерами страхового рынка. Гарантируем прозрачные условия и официальные полисы.
          </p>
        </div>
      </section>

      <!-- Map Container -->
      <div class="w-full h-full overflow-hidden relative">
        <img
          src="/images/contacts/screenshot-reference.png"
          alt="Карта"
          class="absolute top-0 left-0 w-full h-full object-cover"
        />
        <!-- Houses Icon (Starting point for lines) -->
        <img
          id="houses-icon"
          src="/images/Group.svg"
          alt=""
          class="absolute top-[67.65%] left-[44.30%] w-[45px] h-auto z-20 pointer-events-none"
        />

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
          <div class="w-[60px] h-[55px] rounded-[60px] border border-white relative overflow-hidden flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg">
            <img
              :src="marker.image"
              :alt="marker.name"
              class="w-full h-full object-cover object-center pointer-events-none rounded-[60px]"
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

        <!-- 3D Icon (far right, aligned with Вкусно и точка) -->
        <a 
          href="/3d-map"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute top-[54.82%] left-[86.69%] w-[111px] h-[95px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity z-20" 
          style="left: 620px; top: 497px;"
        >
          <div class="w-20 h-20 lg:w-24 lg:h-24 relative">
            <img
              src="/images/3d-icon-button.png"
              alt="3D"
              class="w-full h-full object-contain"
            />
          </div>
        </a>

        <!-- Ecogorod Icon (under address text) -->
        <!-- TODO: Uncomment when ecogorod-icon.png is exported from Figma -->
        <!-- <div class="absolute top-[680px] left-[775px] w-[85px] h-[81px] flex items-center justify-center" data-node-id="1114:12382">
          <img
            src="/images/contacts/ecogorod-icon.png"
            alt="Экогород"
            class="w-full h-full object-contain"
          />
        </div> -->
      </div>
      <!-- Ecogorod Address with Icon -->
      <div class="absolute top-[650px] left-[989px] flex items-center gap-2 md:gap-2.5 lg:gap-3">
        <img
          src="/images/Group-ecogorod.svg"
          alt=""
          class="w-[50px] h-[50px] flex-shrink-0"
        />
        <p class="text-white text-[14px] leading-[21px] font-normal font-sans whitespace-nowrap">
          Экогород 3, посёлок Красный Бор,<br> Ярославский муниципальный округ, 150518
        </p>
      </div>
      <!-- Social Icons -->
      <!-- Social Icons - Bottom Right Fixed -->
      <div class="fixed bottom-[clamp(28px,2.5vw,38px)] right-[clamp(100px,8vw,120px)] z-50 flex items-center justify-center gap-3 md:gap-4">
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
            src="/images/ellipse-14.png" 
            alt="Viber" 
            class="w-full h-full object-contain"
          />
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const config = siteConfig

definePageMeta({
  layout: 'home'
})

const hoveredMarker = ref(null)

const getLineCoords = (marker) => {
  const dx = (parseFloat('44.30') - parseFloat(marker.left)) * 10
  const dy = (parseFloat('67.65') - parseFloat(marker.top)) * 10
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
    image: '/images/f1f38b64031d15233f024b39314b7eab79d3ddb7.png'
  },
  {
    id: 'restaurant',
    name: 'Вкусно и точка',
    time: '5 мин',
    top: '15.38%',
    left: '28.75%',
    image: '/images/83e26791ee87bf1ae2be35217a2eebe9e9429a70.png'
  },
  {
    id: 'polyclinic',
    name: 'Поликлиника',
    time: '5 мин',
    top: '53.75%',
    left: '0.45%',
    image: '/images/04019e2f95b75bd1ea76af66328601902522b470.png'
  },
  {
    id: 'globus',
    name: 'Тц Глобус',
    time: '10 мин',
    top: '33.83%',
    left: '8.61%',
    image: '/images/93844c73c2bc37792fbb814d0135be1a06aa6900.png'
  },
  {
    id: 'school',
    name: 'Строительство современной новой школы\nпос. Красный бор',
    time: '3 мин',
    top: '69.31%',
    left: '3.47%',
    image: '/images/4af098352d98e4197170afdcd0d2dbb8517cb0c6.png',
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
}

h1 {
  font-family: 'Mazzard H', 'Manrope', sans-serif;
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

</style>

