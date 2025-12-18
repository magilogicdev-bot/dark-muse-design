<template>
  <div class="relative bg-white rounded-lg md:rounded-xl overflow-hidden group">
    <!-- Plan Image Container -->
    <div class="aspect-[4/5] w-full relative bg-gray-50">
      <!-- Down Arrow at Top Center -->
      <div class="absolute top-3 left-1/2 -translate-x-1/2 z-20">
        <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Plan Image -->
      <img
        :src="plan.image"
        :alt="`Планировка квартиры ${plan.rooms} комнаты`"
        class="w-full h-full object-contain pt-8"
        @error="handleImageError"
      />
      
      <!-- Action Icons Overlay -->
      <div class="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-2 z-10">
        <!-- Heart Icon (Favorite) -->
        <button
          @click="toggleFavorite"
          class="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full transition-all shadow-md hover:shadow-lg"
          aria-label="Удалить из избранного"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        
        <!-- Download Icon -->
        <button
          @click="downloadPlan"
          class="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full transition-all shadow-md hover:shadow-lg"
          aria-label="Скачать планировку"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
      
      <!-- Delete Icon (Top Left) -->
      <button
        @click="deletePlan"
        class="absolute top-3 left-3 md:top-4 md:left-4 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full transition-all shadow-md hover:shadow-lg z-10"
        aria-label="Удалить"
      >
        <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  plan: {
    type: Object,
    required: true
  }
})

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%239ca3af"%3EПланировка%3C/text%3E%3C/svg%3E'
}

const toggleFavorite = () => {
  console.log('Toggle favorite for plan:', props.plan.id)
}

const downloadPlan = () => {
  console.log('Download plan:', props.plan.id)
}

const deletePlan = () => {
  console.log('Delete plan:', props.plan.id)
}
</script>








