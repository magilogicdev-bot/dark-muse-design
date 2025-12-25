<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Top Section: Title and Text -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ОТДЕЛКА WHITE BOX
          </h2>
        </div>

        <!-- Right: Text Content -->
        <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            Отделка White Box — это оптимальный формат для тех, кто ценит время и хочет реализовать собственный дизайн без сложных черновых работ.
          </p>
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            В квартире уже выполнены все ключевые инженерные и подготовительные этапы - ровные стены под покраску или декоративные покрытия, подготовленные полы, разведённые коммуникации и установленные инженерные системы. Пространство готово к финишному оформлению — вы начинаете с чистого, качественного основания.
          </p>
        </div>
      </div>

      <!-- Image with Hotspots -->
      <div
        ref="imageContainer"
        class="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] bg-gray-900 rounded-lg md:rounded-xl overflow-visible"
      >
        <img
          :src="images.whiteBoxRoom"
          alt="Комната с отделкой White Box"
          class="w-full h-full object-cover rounded-lg md:rounded-xl"
          loading="lazy"
        />
        
        <svg
          v-if="imageContainer"
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
        
        <!-- Interactive Markers (Hotspots) -->
        <div
          v-for="(hotspot, index) in hotspots"
          :key="`hotspot-${index}`"
          :style="getHotspotStyle(hotspot)"
          class="absolute w-6 h-6 md:w-8 md:h-8 border-2 border-gray-800 rounded-full bg-gray-800/80 hover:bg-gray-800 flex items-center justify-center z-20 cursor-pointer transition-all duration-300 hover:scale-110"
          @mouseenter="handleHotspotEnter(index)"
          @mouseleave="handleHotspotLeave"
        >
          <!-- Hotspot indicator dot -->
          <div class="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
        </div>
        
        <!-- Labels (visible on hover) -->
        <Transition
          v-for="(hotspot, index) in hotspots"
          :key="`label-${index}`"
          name="tooltip"
        >
          <div
            v-if="currentHotspotIndex === index"
            :data-label-index="index"
            :style="getLabelStyle(hotspot)"
            class="absolute z-30 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 md:p-4 min-w-[180px] md:min-w-[220px] max-w-[260px] pointer-events-auto"
            @mouseenter="handleLabelEnter"
            @mouseleave="handleLabelLeave"
          >
            <p class="text-xs md:text-sm text-gray-900 leading-relaxed whitespace-normal">
              {{ hotspot.text }}
            </p>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const imageContainer = ref(null)
const svgContainer = ref(null)
const svgWidth = ref(1000)
const svgHeight = ref(600)
const currentHotspotIndex = ref(null)
const hideTimeout = ref(null)
const isLabelHovered = ref(false)

// Image path
const images = {
  whiteBoxRoom: '/images/white-box-room.webp'
}

// Define hotspots with their positions (in percentages) and text
const hotspots = ref([
  {
    left: '20%',
    top: '25%',
    text: 'Качественные оконные блоки',
    labelLeft: '10%',
    labelTop: '10%'
  },
  {
    left: '15%',
    top: '75%',
    text: 'Разводка отопления в полу. Установлены биметаллические радиаторы.',
    labelLeft: '10%',
    labelTop: '55%'
  },
  {
    left: '45%',
    top: '65%',
    text: 'Установлены розетки и выключатели',
    labelLeft: '45%',
    labelTop: '40%'
  },
  {
    left: '55%',
    top: '80%',
    text: 'Выполнена разводка водопровода и канализации, установлены счетчики',
    labelLeft: '60%',
    labelTop: '90%'
  },
  {
    left: '60%',
    top: '50%',
    text: 'Выравнивание стен штукатуркой и шпаклевкой',
    labelLeft: '60%',
    labelTop: '85%'
  },
  {
    left: '80%',
    top: '30%',
    text: 'Проемы подготовлены к установке дверей стандартной высоты',
    labelLeft: '85%',
    labelTop: '15%'
  },
  {
    left: '90%',
    top: '55%',
    text: 'Возведены перегородки из пазогребневых блоков',
    labelLeft: '85%',
    labelTop: '35%'
  },
  {
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

const getLabelStyle = (hotspot) => {
  const rect = imageContainer.value?.getBoundingClientRect()
  if (!rect) {
    return {
      left: hotspot.labelLeft || '0%',
      top: hotspot.labelTop || '0%'
    }
  }
  
  // Calculate label position in pixels
  const labelLeft = (parseFloat(hotspot.labelLeft || hotspot.left) / 100) * rect.width
  const labelTop = (parseFloat(hotspot.labelTop || hotspot.top) / 100) * rect.height
  
  return {
    left: `${labelLeft}px`,
    top: `${labelTop}px`,
    transform: 'translate(0, 0)'
  }
}

const handleHotspotEnter = (index) => {
  // Clear any pending hide timeout
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
  
  currentHotspotIndex.value = index
  isLabelHovered.value = false
}

const handleHotspotLeave = () => {
  // Don't hide immediately - wait a bit in case user moves to label
  if (!isLabelHovered.value) {
    hideTimeout.value = setTimeout(() => {
      if (!isLabelHovered.value) {
        currentHotspotIndex.value = null
      }
    }, 200) // 200ms delay
  }
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
  if (currentHotspotIndex.value !== null) {
    nextTick().then(updateActiveLine)
    setTimeout(updateActiveLine, 50)
    setTimeout(updateActiveLine, 150)
  }
})

// Update SVG dimensions when container size changes
onMounted(() => {
  if (process.client) {
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
    
    // Update on resize
    window.addEventListener('resize', updateSvgSize)
    
    // Cleanup
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateSvgSize)
      if (hideTimeout.value) {
        clearTimeout(hideTimeout.value)
      }
    })
  }
})

onBeforeUnmount(() => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
  }
})
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
</style>
