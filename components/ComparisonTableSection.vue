<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20 text-center">
        СРАВНЕНИЕ ПРОЕКТОВ
      </h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-white border-collapse">
          <thead>
            <tr class="border-b-2 border-white/20">
              <th class="text-left py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold">Характеристика</th>
              <th
                v-for="(project, index) in projects"
                :key="index"
                class="text-center py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold"
              >
                {{ project.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(feature, fIndex) in features"
              :key="fIndex"
              class="border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <td class="py-4 md:py-5 px-4 md:px-6 text-base md:text-lg font-medium">{{ feature.name }}</td>
              <td
                v-for="(project, pIndex) in projects"
                :key="pIndex"
                class="py-4 md:py-5 px-4 md:px-6 text-base md:text-lg text-center"
              >
                {{ project.features[fIndex] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = ref([
  'Количество домов',
  'Этажность',
  'Количество квартир',
  'Парковка',
  'Инфраструктура'
])

const projects = ref([
  {
    name: 'ЭКОГОРОД 1',
    features: ['6', '5-10 этажей', '350', 'Да', 'Полная']
  },
  {
    name: 'ЭКОГОРОД 2',
    features: ['8', '7-12 этажей', '480', 'Да', 'Полная']
  },
  {
    name: 'ЭКОГОРОД 3',
    features: ['10', '9-15 этажей', '650', 'Да', 'Полная']
  }
])
</script>
