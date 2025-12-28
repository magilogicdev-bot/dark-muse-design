<template>
  <section class="relative w-full bg-[#FF8700] overflow-hidden pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28">
    <!-- Decorative image positioned at bottom-right of section -->
    <div class="absolute bottom-0 right-0 z-0 flex items-end justify-end pointer-events-none">
      <img
        src="/images/mortgage-hero-hand-331f81.webp"
        alt="Ипотека с Pobedonoscev GROUP"
        class="max-w-[70%] md:max-w-[65%] lg:max-w-[80%] max-h-[70%] object-contain scale-x-[-1]"
      />
    </div>
    
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-[57%_43%] gap-0 items-stretch">
        <!-- Left Column: Text Content -->
        <div class="flex flex-col justify-center py-6 md:py-8 lg:py-10 xl:py-12 z-10 order-2 lg:order-1">
          <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight mb-4 md:mb-5 lg:mb-6 xl:mb-8 max-w-[90%] lg:max-w-full text-center lg:text-left mx-auto lg:mx-0">
            Оформи ипотеку с Pobedonoscev GROUP
          </h1>
          
          <p class="text-base md:text-lg text-white opacity-60 leading-relaxed mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-w-[85%] lg:max-w-[75%] text-center lg:text-left mx-auto lg:mx-0">
            Ипотека является одним из самых популярных и доступных способов покупки недвижимости. Это реальный шанс въехать в новую квартиру уже сейчас, не дожидаясь накоплений.
          </p>
          
          <button class="bg-white hover:bg-gray-100 text-black font-normal italic px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 py-2.5 md:py-3 lg:py-4 xl:py-5 rounded-full text-sm md:text-base transition-colors mb-8 md:mb-10 lg:mb-12 xl:mb-16 w-fit mx-auto lg:mx-0">
            Хочу оформить ипотеку
          </button>
          
          <p class="text-sm md:text-base text-white leading-relaxed max-w-[85%] lg:max-w-[75%] text-center lg:text-left mx-auto lg:mx-0">
            Мы работаем только с лидерами страхового рынка. Гарантируем прозрачные условия и официальные полисы.
          </p>
        </div>
        
        <!-- Right Column: Partner Logos -->
        <div class="relative w-full aspect-[2/1] md:aspect-[1524/1310] min-h-[120px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] order-1 lg:order-2 overflow-hidden">
          <!-- Partner Logos Section - Horizontal Layout -->
          <div class="absolute inset-0 flex flex-row items-center justify-center md:items-start md:justify-start md:bottom-0 md:top-auto md:left-0 md:right-0 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 pb-6 md:pb-8 lg:pb-10 xl:pb-12 z-10">
            <!-- Alfa Logo Block -->
            <div class="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
              <img
                src="/images/alfa-logo.webp"
                alt="АЛЬФА СТРАХОВАНИЕ"
                class="h-7 md:h-9 lg:h-10 xl:h-12 w-auto object-contain shrink-0"
              />
              <p class="text-white text-xs md:text-sm leading-relaxed opacity-60 font-arimo text-left">
                возможно оформление<br/>при ипотеке и рассрочке
              </p>
            </div>
            
            <!-- Sber Logo Block -->
            <div class="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
              <img
                src="/images/sber-logo.webp"
                alt="СБЕР"
                class="h-6 md:h-8 lg:h-9 xl:h-11 w-auto object-contain shrink-0"
              />
              <p class="text-white text-xs md:text-sm leading-relaxed opacity-60 font-arimo text-left">
                возможно оформление<br/>при ипотеке
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

