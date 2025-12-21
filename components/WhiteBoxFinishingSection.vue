<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section 1: О КВАРТИРЕ -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 mb-8 md:mb-12 lg:mb-16">
        <!-- Left: Title -->
        <div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            О КВАРТИРЕ
          </h2>
        </div>
        
        <!-- Right: Description -->
        <div class="flex items-center">
          <p class="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
            1-комнатная квартира комфорт-класса в жилом комплексе «Экогород», расположенная на 1 этаже 3-этажного здания. Срок сдачи — I квартал 2024 года. В квартире возведены стены и внутренние перегородки, проложены коммуникации, оштукатурены и зашпаклеваны стены, выполнена стяжка пола, установлены окна и откосы, качественная металлическая входная дверь, установлены счетчики коммунальных услуг. Рядом расположены детские сады, школы, остановки общественного транспорта, торговые центры, сетевые магазины, аптеки, отделения банков и банкоматы.
          </p>
        </div>
      </div>

      <!-- Section 2: ОТДЕЛКА WHITE BOX -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 mb-8 md:mb-12 lg:mb-16">
        <!-- Left: Title -->
        <div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ОТДЕЛКА WHITE BOX
          </h2>
        </div>
        
        <!-- Right: Description -->
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
        class="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] bg-gray-900 rounded-lg overflow-visible"
      >
        <img
          v-if="imageExists"
          src="/images/white-box-room.png"
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
        
        <!-- SVG Lines connecting hotspots to labels (visible on hover) -->
        <svg
          v-if="imageExists && imageContainer"
          ref="svgContainer"
          class="absolute inset-0 w-full h-full pointer-events-none z-10"
          :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
          preserveAspectRatio="none"
        >
          <line
            v-for="(hotspot, index) in hotspots"
            :key="`line-${index}`"
            :x1="getLineStartX(hotspot)"
            :y1="getLineStartY(hotspot)"
            :x2="getLineEndX(hotspot)"
            :y2="getLineEndY(hotspot)"
            stroke="white"
            stroke-width="1.5"
            :class="['stroke-white transition-opacity duration-200', currentHotspotIndex === index ? 'opacity-100' : 'opacity-0']"
          />
        </svg>
        
        <!-- Hotspot Points (dark circles) -->
        <div
          v-for="(hotspot, index) in hotspots"
          :key="`point-${index}`"
          :style="getHotspotStyle(hotspot)"
          class="absolute w-6 h-6 md:w-8 md:h-8 border-2 border-gray-800 rounded-full bg-gray-800/80 hover:bg-gray-800 flex items-center justify-center z-20 cursor-pointer transition-all duration-200"
          @mouseenter="handleHotspotEnter(hotspot, index)"
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
const imageContainer = ref(null)
const imageExists = ref(true)
const currentHotspotIndex = ref(null)
const hideTimeout = ref(null)
const isLabelHovered = ref(false)

// Check if image exists on client side
onMounted(() => {
  if (process.client) {
    const img = new Image()
    img.onload = () => {
      imageExists.value = true
    }
    img.onerror = () => {
      imageExists.value = false
    }
    img.src = '/images/white-box-room.png'
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
    labelTop: '15%'
  },
  {
    // 2. Радиатор (низ-слева, под окном)
    left: '15%',
    top: '75%',
    text: 'Разводка отопления в полу. Установлены биметаллические радиаторы.',
    labelLeft: '10%',
    labelTop: '65%'
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
    labelTop: '45%'
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
    })
  }
})

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

const getLineStartX = (hotspot) => {
  return (parseFloat(hotspot.left) / 100) * svgWidth.value
}

const getLineStartY = (hotspot) => {
  return (parseFloat(hotspot.top) / 100) * svgHeight.value
}

const getLineEndX = (hotspot) => {
  const labelLeft = hotspot.labelLeft || hotspot.left
  return (parseFloat(labelLeft) / 100) * svgWidth.value
}

const getLineEndY = (hotspot) => {
  const labelTop = hotspot.labelTop || hotspot.top
  return (parseFloat(labelTop) / 100) * svgHeight.value
}

const handleHotspotEnter = (hotspot, index) => {
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
</style>

