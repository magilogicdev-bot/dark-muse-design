<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-4xl font-medium uppercase leading-tight mb-12 md:mb-16 lg:mb-20">
        ХОД СТРОИТЕЛЬСТВА
      </h2>
      
      <div class="space-y-8 md:space-y-10 lg:space-y-12">
        <div
          v-for="(progress, index) in progressItems"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8"
        >
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h3 class="text-white text-2xl font-semibold">
              {{ progress.title }}
            </h3>
            <span class="text-[#F2994A] text-xl font-bold">
              {{ progress.percentage }}%
            </span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-3 md:h-4 lg:h-5 overflow-hidden">
            <div
              class="bg-[#F2994A] h-full rounded-full transition-all duration-500"
              :style="{ width: progress.percentage + '%' }"
            ></div>
          </div>
          <p class="text-gray-300 text-lg mt-4 md:mt-5">
            {{ progress.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const progressItems = ref([
  {
    title: 'Фундамент',
    percentage: 100,
    description: 'Фундамент полностью готов и прошел все проверки'
  },
  {
    title: 'Каркас здания',
    percentage: 85,
    description: 'Основной каркас здания практически завершен'
  },
  {
    title: 'Внутренние работы',
    percentage: 60,
    description: 'Продолжаются работы по внутренней отделке'
  },
  {
    title: 'Благоустройство',
    percentage: 30,
    description: 'Начаты работы по благоустройству территории'
  }
])
</script>
