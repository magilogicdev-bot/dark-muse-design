<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        <!-- Left Card: КАК ОФОРМИТЬ ИПОТЕКУ -->
        <NuxtLink
          to="/mortgage-guide"
          class="bg-[#FF8700] rounded-lg md:rounded-xl p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden group hover:opacity-95 transition-opacity"
        >
          <div class="relative flex flex-col h-full">
            <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white mb-3 md:mb-4 leading-tight">
              КАК ОФОРМИТЬ ИПОТЕКУ
            </h2>
            <p class="text-base md:text-lg text-white mb-6 md:mb-8 lg:mb-10 leading-relaxed">
              Разбираемся в тонкостях сделки
            </p>
            <!-- Button -->
            <div class="mt-auto">
              <span class="inline-block bg-white text-black rounded-full px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-3.5 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
                Подробнее
              </span>
            </div>
            <!-- Decorative Icon (Hand cursor) -->
            <div class="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 opacity-20 pointer-events-none">
              <img 
                src="/images/mortgage-decorative-vector.svg" 
                alt="" 
                class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        </NuxtLink>

        <!-- Right Card: КАК КУПИТЬ КВАРТИРУ ? -->
        <div class="bg-[#E1E3E1] rounded-lg md:rounded-xl p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden flex flex-col min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          <div class="relative flex flex-col h-full">
            <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#333333] mb-3 md:mb-4 leading-tight">
              КАК КУПИТЬ КВАРТИРУ ?
            </h2>
            <p class="text-base md:text-lg text-[#555555] mb-6 md:mb-8 lg:mb-10 leading-relaxed">
              Оставьте заявку и наш консультант свяжется с вами в ближайшее время
            </p>
            <!-- Button -->
            <div class="mt-auto">
              <button
                @click="openContactForm"
                class="bg-white text-[#333333] rounded-full px-5 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-3.5 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors border border-gray-200"
              >
                Оставить заявку
              </button>
            </div>
            <!-- Decorative Icon (Heart) -->
            <div class="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 opacity-20 pointer-events-none">
              <img 
                src="/images/heart-outline.svg" 
                alt="" 
                class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const openContactForm = () => {
  // Navigate to buy-apartment page or open contact form modal
  navigateTo('/buy-apartment')
}
</script>

