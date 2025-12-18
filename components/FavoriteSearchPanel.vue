<template>
  <NuxtLink
    to="/apartments"
    class="relative bg-primary rounded-md md:rounded-lg overflow-hidden group flex flex-col aspect-[4/5] w-full h-full hover:bg-[#353742] transition-colors border border-white/30"
  >
    <!-- Search Icon with Circle (Top Left) -->
    <div class="absolute top-3 left-3 md:top-4 md:left-4 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
      <div class="relative w-full h-full">
        <!-- Circle Outline -->
        <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="1.5" />
        </svg>
        <!-- Magnifying Glass Icon -->
        <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    
    <!-- Text (Bottom Left) -->
    <div class="flex items-end pb-3 md:pb-4 lg:pb-5 px-3 md:px-4 mt-auto">
      <p class="text-sm md:text-base text-white font-medium leading-relaxed">
        Найти другие планировки квартир
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
// Component for "Find other plans" panel in favorites
</script>
