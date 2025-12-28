<template>
  <section class="bg-[#1A1A1A] py-16 md:py-20 lg:py-24 font-brand">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
      <div class="bg-[#FF8700] rounded-lg p-2.5 md:p-3 lg:p-4 relative overflow-hidden" style="height: 400px;">
        <div class="relative flex flex-col">
          <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-white mb-1 leading-tight">
            КАК ОФОРМИТЬ ИПОТЕКУ
          </h2>
          <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-1.5" style="height: 259px;">
            <p class="text-base md:text-lg font-normal text-white leading-relaxed flex-1 absolute" style="left: 1px; top: 62px;">
              Разбираемся в тонкостях сделки
            </p>
            <!-- Decorative SVG -->
            <div class="flex-shrink-0 w-full md:w-auto md:flex-1 flex items-center justify-end">
              <img 
                src="/images/mortgage-decorative-vector.svg" 
                alt="" 
                class="w-full md:w-auto h-auto object-contain max-w-full absolute"
                style="width: 592px; height: 356px; top: 127px;"
              />
            </div>
          </div>
          <!-- Button -->
          <div class="mt-2 md:mt-3 relative z-10">
            <NuxtLink 
              to="/mortgage-guide"
              class="inline-block bg-[#F7F7F5] text-black rounded-full px-4 md:px-5 py-1.5 md:py-2 text-sm md:text-base font-normal leading-[1.5em] tracking-[-0.02em] hover:bg-[#F0F0F0] transition-colors"
            >
              Узнать больше
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
