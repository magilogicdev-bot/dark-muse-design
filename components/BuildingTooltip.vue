<template>
  <Transition name="tooltip">
    <div
      v-if="visible"
      ref="tooltipRef"
      :style="tooltipStyle"
      class="absolute z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 min-w-[280px] md:min-w-[320px] pointer-events-auto"
      @mouseenter="$emit('mouseenter')"
      @mouseleave="$emit('mouseleave')"
    >
      <div class="space-y-2 md:space-y-3">
        <!-- Title -->
        <p class="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">
          {{ title }}
        </p>
        
        <!-- Complex Name -->
        <h3 class="text-lg md:text-xl lg:text-2xl font-medium uppercase text-gray-900 leading-tight">
          {{ complexName }}
        </h3>
        
        <!-- Building Number -->
        <p class="text-sm md:text-base text-gray-700">
          {{ buildingNumber }}
        </p>
        
        <!-- Apartments Count -->
        <p class="text-sm md:text-base text-gray-700">
          {{ apartmentsCount }}
        </p>
        
        <!-- Completion Date -->
        <p class="text-sm md:text-base text-gray-700">
          {{ completionDate }}
        </p>
        
        <!-- Details Button -->
        <NuxtLink
          :to="projectLink"
          class="inline-flex items-center gap-2 mt-3 md:mt-4 px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base font-medium"
        >
          ПОДРОБНЕЕ
          <svg
            class="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const emit = defineEmits(['mouseenter', 'mouseleave'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'ЖИЛОЙ КОМПЛЕКС'
  },
  complexName: {
    type: String,
    default: 'ЭКОГОРОД 3'
  },
  buildingNumber: {
    type: String,
    default: 'ДОМ №000'
  },
  apartmentsCount: {
    type: String,
    default: 'КВАРТИР В ПРОДАЖЕ - 124'
  },
  completionDate: {
    type: String,
    default: 'СРОК СДАЧИ - 2026 ГОД'
  },
  projectLink: {
    type: String,
    default: '/project/ecocity-3'
  }
})

const tooltipRef = ref(null)
const tooltipStyle = computed(() => {
  // Position tooltip near the hotspot
  // Offset to prevent tooltip from covering the hotspot
  const offsetX = 20
  const offsetY = 20
  
  let left = props.x + offsetX
  let top = props.y + offsetY
  
  // Adjust if tooltip would go off-screen (basic check)
  // This will be refined based on actual container bounds if needed
  if (tooltipRef.value && typeof window !== 'undefined') {
    const tooltipWidth = 320 // min-w-[320px] on md
    const tooltipHeight = 300 // approximate height
    
    // Check right edge
    if (left + tooltipWidth > window.innerWidth) {
      left = props.x - tooltipWidth - offsetX // Position to the left of hotspot
    }
    
    // Check bottom edge
    if (top + tooltipHeight > window.innerHeight) {
      top = props.y - tooltipHeight - offsetY // Position above hotspot
    }
    
    // Ensure it doesn't go off left or top
    if (left < 0) left = offsetX
    if (top < 0) top = offsetY
  }
  
  return {
    left: `${left}px`,
    top: `${top}px`,
    transform: 'translate(0, 0)'
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
  transform: translateY(-10px);
}
</style>
