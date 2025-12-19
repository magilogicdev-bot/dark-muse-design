<template>
  <Transition name="tooltip">
    <div
      v-if="visible"
      ref="tooltipRef"
      :style="tooltipStyle"
      class="absolute z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 min-w-[200px] md:min-w-[280px] max-w-[320px] pointer-events-auto"
      @mouseenter="$emit('mouseenter')"
      @mouseleave="$emit('mouseleave')"
    >
      <p class="text-sm md:text-base text-gray-900 leading-relaxed">
        {{ text }}
      </p>
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
  text: {
    type: String,
    default: ''
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
  
  // Adjust if tooltip would go off-screen
  if (tooltipRef.value && typeof window !== 'undefined') {
    const tooltipWidth = 320 // max-w-[320px]
    const tooltipHeight = 200 // approximate height
    
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

