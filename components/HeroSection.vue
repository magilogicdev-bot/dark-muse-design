<template>
  <section class="relative w-full bg-primary">
    <!-- Hero Background Image -->
    <div
      ref="imageContainer"
      class="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] xl:aspect-[2.2/1] cursor-pointer"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <img
        src="/images/hero-background.webp"
        alt="Вид сверху на жилой комплекс"
        class="absolute inset-0 w-full h-full object-cover"
      />
      
      <!-- Interactive Hotspots -->
      <div
        v-for="(building, index) in buildings"
        :key="index"
        :style="getHotspotStyle(building)"
        class="absolute border-2 border-white/0 hover:border-white transition-all duration-200 rounded cursor-pointer group"
        @mouseenter="handleHotspotEnter(building, $event)"
        @mouseleave="handleHotspotLeave"
        @click="navigateToProject(building.projectLink)"
      >
        <!-- Invisible clickable area -->
        <div class="w-full h-full"></div>
      </div>
      
      <!-- Building Tooltip -->
      <BuildingTooltip
        :visible="tooltipVisible"
        :x="tooltipX"
        :y="tooltipY"
        :title="currentBuilding?.title || 'ЖИЛОЙ КОМПЛЕКС'"
        :complex-name="currentBuilding?.complexName || 'ЭКОГОРОД 3'"
        :building-number="currentBuilding?.buildingNumber || 'ДОМ №000'"
        :apartments-count="currentBuilding?.apartmentsCount || 'КВАРТИР В ПРОДАЖЕ - 124'"
        :completion-date="currentBuilding?.completionDate || 'СРОК СДАЧИ - 2026 ГОД'"
        :project-link="currentBuilding?.projectLink || '/project/ecocity-3'"
        @mouseenter="handleTooltipEnter"
        @mouseleave="handleTooltipLeave"
      />
    </div>
    
    <!-- Action Menu Button -->
    <ActionMenuButton />
  </section>
</template>

<script setup>
const imageContainer = ref(null)
const tooltipVisible = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const currentBuilding = ref(null)
const hideTooltipTimeout = ref(null)
const isTooltipHovered = ref(false)

// Define buildings with their positions (in percentages)
// You can adjust these positions based on the actual image
const buildings = ref([
  {
    // Дом 1 - ЭКОГОРОД 1
    left: '35%',
    top: '30%',
    width: '12%',
    height: '18%',
    title: 'ЖИЛОЙ КОМПЛЕКС',
    complexName: 'ЭКОГОРОД 1',
    buildingNumber: 'ДОМ №001',
    apartmentsCount: 'КВАРТИР В ПРОДАЖЕ - 87',
    completionDate: 'СРОК СДАЧИ - 2025 ГОД',
    projectLink: '/project/ecocity-1'
  },
  {
    // Дом 2 - ЭКОГОРОД 2
    left: '55%',
    top: '40%',
    width: '12%',
    height: '18%',
    title: 'ЖИЛОЙ КОМПЛЕКС',
    complexName: 'ЭКОГОРОД 2',
    buildingNumber: 'ДОМ №005',
    apartmentsCount: 'КВАРТИР В ПРОДАЖЕ - 142',
    completionDate: 'СРОК СДАЧИ - 2025 ГОД',
    projectLink: '/project/ecocity-2'
  },
  {
    // Дом 3 - ЭКОГОРОД 3
    left: '45%',
    top: '55%',
    width: '12%',
    height: '18%',
    title: 'ЖИЛОЙ КОМПЛЕКС',
    complexName: 'ЭКОГОРОД 3',
    buildingNumber: 'ДОМ №003',
    apartmentsCount: 'КВАРТИР В ПРОДАЖЕ - 156',
    completionDate: 'СРОК СДАЧИ - 2026 ГОД',
    projectLink: '/project/ecocity-3'
  }
])

const getHotspotStyle = (building) => {
  return {
    left: building.left,
    top: building.top,
    width: building.width,
    height: building.height
  }
}

const handleHotspotEnter = (building, event) => {
  // Clear any pending hide timeout
  if (hideTooltipTimeout.value) {
    clearTimeout(hideTooltipTimeout.value)
    hideTooltipTimeout.value = null
  }
  
  currentBuilding.value = building
  const rect = imageContainer.value?.getBoundingClientRect()
  if (rect) {
    // Position tooltip relative to the hotspot
    const hotspotLeft = (parseFloat(building.left) / 100) * rect.width
    const hotspotTop = (parseFloat(building.top) / 100) * rect.height
    
    tooltipX.value = hotspotLeft
    tooltipY.value = hotspotTop
    tooltipVisible.value = true
    isTooltipHovered.value = false
  }
}

const handleHotspotLeave = () => {
  // Don't hide immediately - wait a bit in case user moves to tooltip
  if (!isTooltipHovered.value) {
    hideTooltipTimeout.value = setTimeout(() => {
      if (!isTooltipHovered.value) {
        tooltipVisible.value = false
        currentBuilding.value = null
      }
    }, 200) // 200ms delay
  }
}

const handleMouseMove = (event) => {
  // Optional: Update tooltip position on mouse move if needed
  if (tooltipVisible.value && imageContainer.value) {
    const rect = imageContainer.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Keep tooltip near hotspot but allow slight movement
    if (currentBuilding.value) {
      const hotspotLeft = (parseFloat(currentBuilding.value.left) / 100) * rect.width
      const hotspotTop = (parseFloat(currentBuilding.value.top) / 100) * rect.height
      
      tooltipX.value = hotspotLeft
      tooltipY.value = hotspotTop
    }
  }
}

const handleMouseLeave = () => {
  // Only hide if not hovering over tooltip
  if (!isTooltipHovered.value) {
    hideTooltipTimeout.value = setTimeout(() => {
      if (!isTooltipHovered.value) {
        tooltipVisible.value = false
        currentBuilding.value = null
      }
    }, 200)
  }
}

const handleTooltipEnter = () => {
  // Clear hide timeout when hovering over tooltip
  if (hideTooltipTimeout.value) {
    clearTimeout(hideTooltipTimeout.value)
    hideTooltipTimeout.value = null
  }
  isTooltipHovered.value = true
}

const handleTooltipLeave = () => {
  isTooltipHovered.value = false
  // Hide tooltip after leaving it
  hideTooltipTimeout.value = setTimeout(() => {
    tooltipVisible.value = false
    currentBuilding.value = null
  }, 200)
}

const navigateToProject = async (link) => {
  if (link) {
    await navigateTo(link)
  }
}
</script>
