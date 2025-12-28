<template>
  <section class="w-full bg-[#1A1A1A] py-12 md:py-20 lg:py-24 relative overflow-hidden">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Premium Content Block -->
      <div class="bg-[#E2E4E3] rounded-[15px] md:rounded-[15px] p-10 md:p-12 lg:p-14 relative overflow-hidden flex items-center min-h-[460px] md:min-h-[520px]">
        
        <div class="relative z-10 w-full lg:w-3/5 min-h-[300px] md:min-h-[350px] flex flex-col justify-between py-2">
          <div class="flex flex-col items-start">
            <!-- Main Heading -->
            <h2 class="text-1xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-[#1A1A1A] leading-[1.1] uppercase tracking-tighter mb-4">
              КАК КУПИТЬ КВАРТИРУ ?
            </h2>

            <!-- Description Text -->
            <p class="text-lg md:text-xl lg:text-1xl text-[#1A1A1A]/80 leading-relaxed font-normal max-w-[540px]">
              Оставьте заявку и наш консультант свяжется с вами в ближайшее время
            </p>
          </div>

          <!-- Call-to-Action Button -->
          <div class="mt-8 lg:mt-0">
            <button class="px-12 py-5 bg-white text-[#1A1A1A] rounded-full text-lg font-bold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg active:scale-95">
              Оставить заявку
            </button>
          </div>
        </div>

        <!-- Decorative Heart Icon -->
        <div class="absolute -right-[10%] md:-right-[5%] top-[75%] -translate-y-1/2 w-[70%] md:w-[60%] lg:w-[70%] h-[70%] pointer-events-none flex items-center justify-end">
          <img 
            src="/images/heart-outline.svg" 
            alt="" 
            class="w-full h-full object-contain opacity-40 filter brightness-0 invert"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* Optional: ensure smooth transitions for hover effects */
button {
  transition: all 0.3s ease;
}
</style>



