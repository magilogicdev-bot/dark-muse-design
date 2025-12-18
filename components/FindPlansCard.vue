<template>
  <NuxtLink
    to="/apartments"
    class="relative bg-[#2a2c38] rounded-lg md:rounded-xl overflow-hidden group flex flex-col aspect-[4/5] w-full hover:bg-[#353742] transition-colors"
  >
    <!-- Search Icon (Top Left) -->
    <div class="absolute top-4 left-4 md:top-5 md:left-5 lg:top-6 lg:left-6 w-16 h-16 md:w-[72px] md:h-[72px] lg:w-20 lg:h-20 flex items-center justify-center">
      <svg class="w-full h-full text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <!-- Text (Bottom Center) -->
    <div class="flex items-end justify-center pb-6 md:pb-8 lg:pb-10 px-4 md:px-6 mt-auto">
      <p class="text-sm md:text-base lg:text-lg text-white/80 font-medium leading-relaxed text-center">
        Найти другие планировки квартир
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
// Component for "Find other plans" card
</script>






