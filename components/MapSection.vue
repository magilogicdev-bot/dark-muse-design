<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight mb-12 md:mb-16 lg:mb-20">
        КАК ДОБРАТЬСЯ
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        <!-- Map -->
        <div class="lg:col-span-2 rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px]">
          <img
            :src="mapImage"
            alt="Карта"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Info -->
        <div class="space-y-6 md:space-y-8">
          <div class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-6 md:p-8">
            <h3 class="text-white text-xl md:text-2xl font-semibold mb-4 md:mb-5">
              Адрес офиса
            </h3>
            <p class="text-gray-300 text-base md:text-lg lg:text-xl mb-4 md:mb-5">
              г. Ярославль<br />
              ул. Примерная, д. 1<br />
              офис 101
            </p>
            <a href="tel:+74852333362" class="text-[#F2994A] text-base md:text-lg hover:underline">
              +7 (4852) 33-33-62
            </a>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-6 md:p-8">
            <h3 class="text-white text-xl md:text-2xl font-semibold mb-4 md:mb-5">
              Время работы
            </h3>
            <p class="text-gray-300 text-base md:text-lg lg:text-xl">
              Пн-Пт: 09:00 - 18:00<br />
              Сб-Вс: Выходной
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  mapImage: {
    type: String,
    default: '/images/ecocity-general-plan.webp' // Fallback to an existing image
  }
})
</script>
