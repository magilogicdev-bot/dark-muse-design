<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 md:mb-16 flex items-center justify-between">
        <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight">
          АКТУАЛЬНЫЕ ПРОЕКТЫ
        </h2>
        <!-- Pagination Dots -->
        <div class="flex gap-2 md:gap-3">
          <div
            v-for="i in 5"
            :key="i"
            :class="[
              'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all',
              i === 1 ? 'bg-white' : 'bg-white/40'
            ]"
          ></div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-white rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="aspect-[4/3] w-full">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6 md:p-8">
            <h3 class="text-black text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 text-base md:text-lg lg:text-xl mb-4 md:mb-6">
              {{ project.description }}
            </p>
            <button class="text-[#F2994A] text-base md:text-lg lg:text-xl font-semibold hover:underline">
              Подробнее →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = ref([
  {
    title: 'ЖК "ЭКОГОРОД 3"',
    description: 'Современный жилой комплекс с развитой инфраструктурой и экологичным подходом к строительству',
    image: '/images/project-1.webp'
  },
  {
    title: 'ЖК "ЭКОГОРОД 2"',
    description: 'Завершенный проект с благоустроенной территорией и удобной транспортной доступностью',
    image: '/images/project-2.webp'
  }
])
</script>
