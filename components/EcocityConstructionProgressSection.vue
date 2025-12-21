<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header: Title and Description -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ХОД<br />СТРОИТЕЛЬСТВА
          </h2>
        </div>

        <!-- Right: Description -->
        <div class="flex items-start">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            Покупателям квартир в Экогород 2 доступна возможность наблюдать за процессом строительства. Благодаря прозрачности и открытости проекта, вы можете видеть каждый этап возведения — от закладки фундамента до монтажа внутренних инженерных систем.
          </p>
        </div>
      </div>

      <!-- Progress Cards Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
        <div
          v-for="(item, index) in progressItems"
          :key="index"
          class="relative aspect-[4/3] rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer"
        >
          <img
            :src="item.image"
            :alt="`Ход строительства ${item.month} ${item.year}`"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Show More Button -->
      <div class="flex justify-center">
        <button
          @click="handleShowMore"
          class="px-4 lg:px-8 py-0 lg:py-2 rounded-full bg-[#E1E3E1] border border-gray-300 text-[#333333] text-sm md:text-base font-medium uppercase hover:bg-gray-200 transition-colors"
        >
          ПОКАЗАТЬ ЕЩЁ
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const progressItems = [
  {
    month: 'декабрь',
    year: '2025',
    image: '/images/ecocity-progress-december-2025.png'
  },
  {
    month: 'ноябрь',
    year: '2025',
    image: '/images/ecocity-progress-november-2025.png'
  },
  {
    month: 'октябрь',
    year: '2025',
    image: '/images/ecocity-progress-october-2025.png'
  },
  {
    month: 'сентябрь',
    year: '2025',
    image: '/images/ecocity-progress-september-2025.png'
  },
  {
    month: 'август',
    year: '2025',
    image: '/images/ecocity-progress-august-2025.png'
  },
  {
    month: 'июль',
    year: '2025',
    image: '/images/ecocity-progress-july-2025.png'
  },
  {
    month: 'июнь',
    year: '2025',
    image: '/images/ecocity-progress-june-2025.png'
  },
  {
    month: 'май',
    year: '2025',
    image: '/images/ecocity-progress-may-2025.png'
  }
]

const handleShowMore = () => {
  // Handle "Show More" action - could navigate to a dedicated page or load more items
  console.log('Show more construction progress')
}
</script>
