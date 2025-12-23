<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="image-zoom-modal"
        @click.self="close"
        @wheel.prevent="handleWheel"
      >
        <button
          class="image-zoom-modal__close"
          @click="close"
          aria-label="Закрыть"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="image-zoom-modal__container">
          <img
            ref="imageRef"
            :src="imageSrc"
            :alt="imageAlt"
            class="image-zoom-modal__image"
            :style="{
              transform: `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }"
            @mousedown="startDrag"
            @dblclick="resetZoom"
          />
        </div>

        <div class="image-zoom-modal__controls">
          <button
            @click="zoomIn"
            class="image-zoom-modal__control-btn"
            aria-label="Увеличить"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            @click="zoomOut"
            class="image-zoom-modal__control-btn"
            aria-label="Уменьшить"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <button
            @click="resetZoom"
            class="image-zoom-modal__control-btn"
            aria-label="Сбросить масштаб"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: 'Изображение'
  }
})

const emit = defineEmits(['close'])

const imageRef = ref(null)
const zoomLevel = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const MIN_ZOOM = 0.5
const MAX_ZOOM = 5
const ZOOM_STEP = 0.25

const close = () => {
  emit('close')
}

const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + ZOOM_STEP, MAX_ZOOM)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - ZOOM_STEP, MIN_ZOOM)
  if (zoomLevel.value === 1) {
    translateX.value = 0
    translateY.value = 0
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
  translateX.value = 0
  translateY.value = 0
}

const handleWheel = (event) => {
  event.preventDefault()
  const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
  const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel.value + delta))
  
  if (newZoom !== zoomLevel.value) {
    zoomLevel.value = newZoom
    if (zoomLevel.value === 1) {
      translateX.value = 0
      translateY.value = 0
    }
  }
}

const startDrag = (event) => {
  if (zoomLevel.value <= 1) return
  isDragging.value = true
  dragStart.value = {
    x: event.clientX - translateX.value,
    y: event.clientY - translateY.value
  }
}

const handleMouseMove = (event) => {
  if (!isDragging.value) return
  translateX.value = event.clientX - dragStart.value.x
  translateY.value = event.clientY - dragStart.value.y
}

const handleMouseUp = () => {
  isDragging.value = false
}

const handleKeyDown = (event) => {
  if (!props.isOpen) return
  
  if (event.key === 'Escape') {
    close()
  } else if (event.key === '+') {
    zoomIn()
  } else if (event.key === '-') {
    zoomOut()
  } else if (event.key === '0') {
    resetZoom()
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetZoom()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.image-zoom-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: grab;
}

.image-zoom-modal:active {
  cursor: grabbing;
}

.image-zoom-modal__close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-zoom-modal__close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.image-zoom-modal__container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.image-zoom-modal__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  transform-origin: center center;
  cursor: grab;
}

.image-zoom-modal__image:active {
  cursor: grabbing;
}

.image-zoom-modal__controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.75rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);
}

.image-zoom-modal__control-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.image-zoom-modal__control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.image-zoom-modal__control-btn:active {
  transform: scale(0.95);
}

/* Transition animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

