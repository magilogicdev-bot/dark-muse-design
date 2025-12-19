<template>
  <NuxtLink
    :to="`/apartment/${apartment.id}`"
    class="bg-white rounded-[10px] lg:rounded-[14px] xl:rounded-[18px] overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow flex flex-col block"
  >
    <div class="aspect-[4/5] bg-gray-100 flex-shrink-0">
      <img 
        :src="apartment.image" 
        :alt="apartment.title" 
        class="w-full h-full object-cover" 
      />
    </div>
    <div class="p-3 md:p-4 flex flex-col flex-1">
      <p class="text-[#333333] text-[11px] md:text-[12px] lg:text-[13px] font-medium mb-1">
        {{ apartment.complex }}
      </p>
      <p class="text-[#333333] text-[11px] md:text-[12px] lg:text-[13px] mb-2">
        {{ apartment.title }}
      </p>
      <p class="text-[#5a8c3a] text-[14px] md:text-[16px] lg:text-[18px] font-semibold mb-2">
        {{ apartment.price }} ₽
      </p>
      <p class="text-[#666666] text-[10px] md:text-[11px] lg:text-[12px] mt-auto">
        Полная 100% Этаж {{ apartment.floor }}/{{ apartment.totalFloors }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  apartment: {
    type: Object,
    required: true
  }
})
</script>
