<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20 text-center">
        ОТЗЫВЫ КЛИЕНТОВ
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8"
        >
          <div class="flex items-center gap-4 md:gap-5 mb-4 md:mb-6">
            <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#F2994A] flex items-center justify-center flex-shrink-0">
              <span class="text-white text-lg md:text-xl lg:text-2xl font-bold">
                {{ testimonial.initials }}
              </span>
            </div>
            <div>
              <h3 class="text-white text-lg md:text-xl lg:text-2xl font-semibold">
                {{ testimonial.name }}
              </h3>
              <p class="text-gray-400 text-sm md:text-base">
                {{ testimonial.location }}
              </p>
            </div>
          </div>
          <p class="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
            "{{ testimonial.text }}"
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = ref([
  {
    name: 'Иван Иванов',
    initials: 'ИИ',
    location: 'г. Ярославль',
    text: 'Отличный сервис, помогли с оформлением ипотеки быстро и без проблем. Квартира превзошла все ожидания!'
  },
  {
    name: 'Мария Петрова',
    initials: 'МП',
    location: 'г. Ярославль',
    text: 'Очень довольна покупкой. Профессиональная команда, всегда готовы помочь и ответить на вопросы.'
  },
  {
    name: 'Сергей Сидоров',
    initials: 'СС',
    location: 'г. Ярославль',
    text: 'Качественное строительство, современные планировки. Рекомендую всем, кто ищет жилье в нашем городе.'
  }
])
</script>
