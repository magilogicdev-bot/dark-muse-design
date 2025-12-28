<template>
  <section class="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section 1: О КВАРТИРЕ -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 mb-6 sm:mb-8 md:mb-12 lg:mb-16">
        <!-- Left: Title -->
        <div>
          <h2 class="text-1xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-medium uppercase leading-tight">
            О КВАРТИРЕ
          </h2>
        </div>
        
        <!-- Right: Description (split into paragraphs) -->
        <div class="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <p class="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
            Продается 1-комнатная квартира комфорт класса в ЖК Экогород 3. Квартира располагается на 1 этаже в 3 подъезде многоквартирного дома. Сдача дома запланирована на 1 кв-л. 2028 года.
          </p>
          <p class="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
            В квартире будут возведены стены и межкомнатные перегородки, разведены коммуникации, выполнена штукатурка и шпаклевка стен, стяжка полов, установлены окна и выполнены откосы, хорошая металлическая входная дверь, а так-же приборы учета.
          </p>
          <p class="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
            В шаговой доступности детские сады, школы, остановки общественного транспорта, торговые центры, сетевые магазины, аптеки, отделения банков и банкоматы.
          </p>
        </div>
      </div>

      <!-- Section 2: ОТДЕЛКА WHITE BOX -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 mb-6 sm:mb-8 md:mb-12 lg:mb-16">
        <!-- Left: Title -->
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-medium uppercase leading-tight">
            ОТДЕЛКА WHITE BOX
          </h2>
        </div>
        
        <!-- Right: Description -->
        <div class="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <p class="text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed text-white/90">
            Отделка White Box — это оптимальный формат для тех, кто ценит время и хочет реализовать собственный дизайн без сложных черновых работ.
          </p>
          <p class="text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed text-white/90">
            В квартире уже выполнены все ключевые инженерные и подготовительные этапы - ровные стены под покраску или декоративные покрытия, подготовленные полы, разведённые коммуникации и установленные инженерные системы. Пространство готово к финишному оформлению — вы начинаете с чистого, качественного основания.
          </p>
        </div>
      </div>

      <!-- Image with Hotspots -->
      <div
        ref="imageContainer"
        class="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] bg-gray-900 rounded-lg overflow-visible"
      >
        <img
          v-if="imageExists"
          src="/images/white-box-room.webp"
          alt="Комната с отделкой White Box"
          class="absolute inset-0 w-full h-full object-cover rounded-lg"
          @error="handleImageError"
        />
        <div
          v-else
          class="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-800 rounded-lg"
        >
          <div class="text-center text-white/60 px-4">
            <p class="text-sm md:text-base mb-2">Изображение не найдено</p>
            <p class="text-xs text-white/40 max-w-md">
              Для загрузки изображения запустите:<br>
              <code class="bg-white/10 px-2 py-1 rounded text-xs">node scripts/download-white-box-room-new.cjs</code>
            </p>
            <p class="text-xs text-white/30 mt-4">
              Или экспортируйте вручную из Figma:<br>
              <a 
                href="https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8387&m=dev" 
                target="_blank"
                class="underline hover:text-white/80"
              >
                Открыть в Figma
              </a>
            </p>
          </div>
        </div>
        
        <svg
          v-if="imageExists && imageContainer"
          ref="svgContainer"
          class="absolute inset-0 w-full h-full pointer-events-none z-10"
          :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
          preserveAspectRatio="none"
        >
          <line
            v-if="currentHotspotIndex !== null"
            :x1="activeLineCoords.x1"
            :y1="activeLineCoords.y1"
            :x2="activeLineCoords.x2"
            :y2="activeLineCoords.y2"
            stroke="white"
            stroke-width="1.5"
            class="stroke-white transition-opacity duration-300"
          />
        </svg>
        
        <!-- Hotspot Points (dark circles) -->
        <div
          v-for="(hotspot, index) in hotspots"
          :key="`point-${index}`"
          :data-hotspot-index="index"
          :style="getHotspotStyle(hotspot)"
          class="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-2 border-gray-800 rounded-full bg-gray-800/80 hover:bg-gray-800 active:bg-gray-700 flex items-center justify-center z-20 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
          @mouseenter="handleHotspotEnter(index)"
          @mouseleave="handleHotspotLeave"
          @click="handleHotspotClick(index)"
          @touchstart="handleHotspotTouch(index, $event)"
        >
          <!-- Hotspot indicator dot -->
          <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
        </div>
        
        <!-- Labels (visible on hover/click) -->
        <Transition
          v-for="(hotspot, index) in hotspots"
          :key="`label-${index}`"
          name="tooltip"
        >
          <div
            v-if="currentHotspotIndex === index"
            :data-label-index="index"
            :style="getLabelStyle(hotspot, index)"
            class="absolute z-30 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 md:p-4 min-w-[140px] sm:min-w-[180px] md:min-w-[220px] max-w-[calc(100vw-2rem)] sm:max-w-[260px] pointer-events-auto"
            @mouseenter="handleLabelEnter"
            @mouseleave="handleLabelLeave"
            @touchstart.stop
          >
            <p class="text-xs sm:text-sm md:text-sm text-gray-900 leading-relaxed whitespace-normal">
              {{ hotspot.text }}
            </p>
            <!-- Close button for mobile -->
            <button
              v-if="isMobile"
              @click.stop="handleCloseLabel"
              class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 md:hidden"
              aria-label="Закрыть"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
const imageContainer = ref(null)
const imageExists = ref(true)
const currentHotspotIndex = ref(null)
const hideTimeout = ref(null)
const isLabelHovered = ref(false)
const isMobile = ref(false)

// Detect mobile device, check if image exists, and setup SVG updates
onMounted(() => {
  if (process.client) {
    // Detect mobile
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768 || ('ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Check if image exists
    const img = new Image()
    img.onload = () => {
      imageExists.value = true
    }
    img.onerror = () => {
      imageExists.value = false
    }
    img.src = '/images/white-box-room.webp'
    
    // Update SVG dimensions
    const updateSvgSize = () => {
      if (imageContainer.value) {
        const rect = imageContainer.value.getBoundingClientRect()
        if (rect) {
          svgWidth.value = rect.width
          svgHeight.value = rect.height
        }
      }
    }
    
    // Initial update
    setTimeout(updateSvgSize, 100)
    window.addEventListener('resize', updateSvgSize)
    
    // Handle click outside to close labels on mobile
    const handleClickOutside = (event) => {
      if (isMobile.value && currentHotspotIndex.value !== null) {
        const target = event.target
        const isClickOnHotspot = target.closest('[data-hotspot-index]')
        const isClickOnLabel = target.closest('[data-label-index]')
        
        if (!isClickOnHotspot && !isClickOnLabel) {
          currentHotspotIndex.value = null
        }
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    // Cleanup
    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('resize', updateSvgSize)
      document.removeEventListener('click', handleClickOutside)
    })
  }
})

// Define hotspots with their positions (in percentages), text, and label positions
// Позиции обновлены согласно точному описанию скриншота из Figma
const hotspots = ref([
  {
    // 1. Окна (верх-слева, у оконной рамы)
    left: '20%',
    top: '25%',
    text: 'Качественные оконные блоки',
    labelLeft: '10%',
    labelTop: '10%'
  },
  {
    // 2. Радиатор (низ-слева, под окном)
    left: '15%',
    top: '75%',
    text: 'Разводка отопления в полу. Установлены биметаллические радиаторы.',
    labelLeft: '10%',
    labelTop: '55%'
  },
  {
    // 3. Розетки (на стене, где видны розетки - ниже и правее)
    left: '45%',
    top: '65%',
    text: 'Установлены розетки и выключатели',
    labelLeft: '45%',
    labelTop: '40%'
  },
  {
    // 4. Водопровод (низ, указывает на водопровод и канализацию)
    left: '55%',
    top: '80%',
    text: 'Выполнена разводка водопровода и канализации, установлены счетчики',
    labelLeft: '60%',
    labelTop: '90%'
  },
  {
    // 5. Стена (нижняя часть правой стены, ниже правого окна, близко к полу - указывает на стену)
    left: '60%',
    top: '50%',
    text: 'Выравнивание стен штукатуркой и шпаклевкой',
    labelLeft: '60%',
    labelTop: '85%'
  },
  {
    // 6. Дверной проем (верх-справа, у дверного проема)
    left: '80%',
    top: '30%',
    text: 'Проемы подготовлены к установке дверей стандартной высоты',
    labelLeft: '85%',
    labelTop: '15%'
  },
  {
    // 7. Перегородка (средний-справа стена, между дверями)
    left: '90%',
    top: '55%',
    text: 'Возведены перегородки из пазогребневых блоков',
    labelLeft: '85%',
    labelTop: '35%'
  },
  {
    // 8. Угол пола (низ-справа, уровень пола)
    left: '95%',
    top: '80%',
    text: 'Выполнена разводка водопровода и канализации, установлены счетчики',
    labelLeft: '65%',
    labelTop: '90%'
  },
  {
    // 9. Потолок (верхняя часть, центр потолка)
    left: '50%',
    top: '15%',
    text: 'Выполнена разводка электрики',
    labelLeft: '55%',
    labelTop: '5%'
  }
])

const getHotspotStyle = (hotspot) => {
  return {
    left: hotspot.left,
    top: hotspot.top,
    transform: 'translate(-50%, -50%)'
  }
}

const svgContainer = ref(null)
const svgWidth = ref(1000)
const svgHeight = ref(600)

const getLabelStyle = (hotspot, index) => {
  const rect = imageContainer.value?.getBoundingClientRect()
  if (!rect) {
    return {
      left: hotspot.labelLeft || '0%',
      top: hotspot.labelTop || '0%'
    }
  }
  
  // Calculate label position in pixels
  let labelLeft = (parseFloat(hotspot.labelLeft || hotspot.left) / 100) * rect.width
  let labelTop = (parseFloat(hotspot.labelTop || hotspot.top) / 100) * rect.height
  
  // On mobile, adjust position to keep label within viewport
  if (isMobile.value && process.client) {
    const labelElement = imageContainer.value?.querySelector(`[data-label-index="${index}"]`)
    if (labelElement) {
      // We need to measure after render, so we'll use nextTick in the caller
      // But we can still apply basic constraints
      const padding = 16 // padding from viewport edge
      const maxWidth = Math.min(260, window.innerWidth - padding * 2)
      
      // Keep label within container bounds
      if (labelLeft < padding) labelLeft = padding
      if (labelLeft + maxWidth > rect.width - padding) {
        labelLeft = rect.width - maxWidth - padding
      }
      
      if (labelTop < padding) labelTop = padding
    }
  }
  
  return {
    left: `${labelLeft}px`,
    top: `${labelTop}px`,
    transform: 'translate(0, 0)'
  }
}

const activeLineCoords = ref({ x1: 0, y1: 0, x2: 0, y2: 0 })

const updateActiveLine = () => {
  if (currentHotspotIndex.value === null) return
  
  const hotspot = hotspots.value[currentHotspotIndex.value]
  const x1 = (parseFloat(hotspot.left) / 100) * svgWidth.value
  const y1 = (parseFloat(hotspot.top) / 100) * svgHeight.value
  
  const labelLeftPercent = parseFloat(hotspot.labelLeft || hotspot.left)
  const labelTopPercent = parseFloat(hotspot.labelTop || hotspot.top)
  const hotspotLeftPercent = parseFloat(hotspot.left)
  const hotspotTopPercent = parseFloat(hotspot.top)
  
  // Base target (fallback)
  let x2 = (labelLeftPercent / 100) * svgWidth.value
  let y2 = (labelTopPercent / 100) * svgHeight.value
  
  const approxWidth = Math.min(220, svgWidth.value * 0.15)
  const approxHeight = Math.min(80, svgHeight.value * 0.08)
  
  if (labelLeftPercent < hotspotLeftPercent - 2) x2 += approxWidth
  else if (Math.abs(labelLeftPercent - hotspotLeftPercent) <= 2) x2 += approxWidth / 2
  
  if (labelTopPercent < hotspotTopPercent - 2) y2 += approxHeight
  else if (Math.abs(labelTopPercent - hotspotTopPercent) <= 2) y2 += approxHeight / 2

  // Try to get real dimensions
  if (imageContainer.value) {
    const labelElement = imageContainer.value.querySelector(`[data-label-index="${currentHotspotIndex.value}"]`)
    if (labelElement) {
      const labelRect = labelElement.getBoundingClientRect()
      const containerRect = imageContainer.value.getBoundingClientRect()
      
      if (containerRect.width > 0 && containerRect.height > 0) {
        const scaleX = svgWidth.value / containerRect.width
        const scaleY = svgHeight.value / containerRect.height
        const labelLeftPx = labelRect.left - containerRect.left
        const labelTopPx = labelRect.top - containerRect.top
        const labelWidth = labelRect.width
        const labelHeight = labelRect.height
        
        // Horizontal
        if (labelLeftPercent < hotspotLeftPercent - 2) x2 = (labelLeftPx + labelWidth) * scaleX
        else if (labelLeftPercent > hotspotLeftPercent + 2) x2 = labelLeftPx * scaleX
        else x2 = (labelLeftPx + labelWidth / 2) * scaleX
        
        // Vertical
        if (labelTopPercent < hotspotTopPercent - 2) y2 = (labelTopPx + labelHeight) * scaleY
        else if (labelTopPercent > hotspotTopPercent + 2) y2 = labelTopPx * scaleY
        else y2 = (labelTopPx + labelHeight / 2) * scaleY
      }
    }
  }
  
  activeLineCoords.value = { x1, y1, x2, y2 }
}

// Watch for changes and update line
watch([currentHotspotIndex, svgWidth, svgHeight], () => {
  updateActiveLine()
  // Tooltip might take a frame to appear/size correctly
  if (currentHotspotIndex.value !== null) {
    nextTick().then(() => {
      updateActiveLine()
      // Adjust label position on mobile after render
      if (isMobile.value) {
        adjustLabelPosition(currentHotspotIndex.value)
      }
    })
    // And another check slightly later for good measure
    setTimeout(() => {
      updateActiveLine()
      if (isMobile.value) {
        adjustLabelPosition(currentHotspotIndex.value)
      }
    }, 50)
    setTimeout(() => {
      updateActiveLine()
      if (isMobile.value) {
        adjustLabelPosition(currentHotspotIndex.value)
      }
    }, 150)
  }
})

// Adjust label position to keep it within viewport on mobile
const adjustLabelPosition = (index) => {
  if (!process.client || !isMobile.value || !imageContainer.value) return
  
  const labelElement = imageContainer.value.querySelector(`[data-label-index="${index}"]`)
  if (!labelElement) return
  
  const containerRect = imageContainer.value.getBoundingClientRect()
  const labelRect = labelElement.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const padding = 16
  
  // Check if label goes outside viewport
  if (labelRect.right > viewportWidth - padding) {
    const overflow = labelRect.right - (viewportWidth - padding)
    const currentLeft = parseFloat(labelElement.style.left) || 0
    labelElement.style.left = `${currentLeft - overflow}px`
  }
  
  if (labelRect.left < padding) {
    labelElement.style.left = `${padding}px`
  }
  
  // Vertical adjustments if needed
  if (labelRect.top < padding) {
    labelElement.style.top = `${padding}px`
  }
  
  const viewportHeight = window.innerHeight
  if (labelRect.bottom > viewportHeight - padding) {
    const overflow = labelRect.bottom - (viewportHeight - padding)
    const currentTop = parseFloat(labelElement.style.top) || 0
    labelElement.style.top = `${currentTop - overflow}px`
  }
}

const handleHotspotEnter = (index) => {
  // Only use hover on desktop
  if (isMobile.value) return
  
  // Clear any pending hide timeout
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
  
  currentHotspotIndex.value = index
  isLabelHovered.value = false
}

const handleHotspotLeave = () => {
  // Only use hover on desktop
  if (isMobile.value) return
  
  // Don't hide immediately - wait a bit in case user moves to label
  if (!isLabelHovered.value) {
    hideTimeout.value = setTimeout(() => {
      if (!isLabelHovered.value) {
        currentHotspotIndex.value = null
      }
    }, 200) // 200ms delay
  }
}

const handleHotspotClick = (index) => {
  // On mobile, toggle label on click
  if (isMobile.value) {
    if (currentHotspotIndex.value === index) {
      currentHotspotIndex.value = null
    } else {
      currentHotspotIndex.value = index
    }
  }
}

const handleHotspotTouch = (index, event) => {
  // Prevent default to avoid scrolling
  event.preventDefault()
  event.stopPropagation()
  
  // On mobile, toggle label on touch
  if (isMobile.value) {
    if (currentHotspotIndex.value === index) {
      currentHotspotIndex.value = null
    } else {
      currentHotspotIndex.value = index
    }
  }
}

const handleCloseLabel = () => {
  currentHotspotIndex.value = null
}

const handleLabelEnter = () => {
  // Clear hide timeout when hovering over label
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
  isLabelHovered.value = true
}

const handleLabelLeave = () => {
  isLabelHovered.value = false
  // Hide label after leaving it
  hideTimeout.value = setTimeout(() => {
    currentHotspotIndex.value = null
  }, 200)
}

const handleImageError = () => {
  imageExists.value = false
}
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Touch optimization */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
</style>

