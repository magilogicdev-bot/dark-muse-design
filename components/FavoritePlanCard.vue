<template>
  <div 
    class="relative bg-[#EBEBEB] rounded-md md:rounded-lg overflow-hidden group flex flex-col aspect-[4/5] border border-white/30"
  >
    <!-- Plan Image Container -->
    <div 
      class="w-full relative bg-[#EBEBEB] flex-1 flex items-center justify-center min-h-0"
    >
      <!-- Plan Image -->
      <img
        :src="plan.image"
        :alt="`Планировка квартиры ${plan.rooms} комнаты`"
        class="w-full h-full max-w-[85%] max-h-full object-contain pt-4"
        @error="handleImageError"
      />
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
</script>
