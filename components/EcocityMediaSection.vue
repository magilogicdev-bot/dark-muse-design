<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header: Title and Description -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-6 md:mb-8 lg:mb-10">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            МЕДИА
          </h2>
        </div>

        <!-- Right: Description -->
        <div class="flex items-start">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях, изменения в законодательстве и события из жизни нашей компании.
          </p>
        </div>
      </div>

      <!-- Buttons Row: Tabs and Subscribe Button -->
      <div class="flex items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8 lg:mb-10">
        <!-- Tab Navigation -->
        <div class="flex gap-2 md:gap-3">
          <button
            @click="activeTab = 'news'"
            :class="[
              'px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors',
              activeTab === 'news'
                ? 'bg-white text-[#333333]'
                : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
            ]"
          >
            НОВОСТИ
          </button>
          <button
            @click="activeTab = 'promotions'"
            :class="[
              'px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors',
              activeTab === 'promotions'
                ? 'bg-white text-[#333333]'
                : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
            ]"
          >
            АКЦИИ
          </button>
        </div>

        <!-- Subscribe Button -->
        <button
          @click="handleSubscribe"
          class="bg-white text-[#333333] rounded-full px-6 md:px-8 lg:px-10 py-2 md:py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors border border-gray-200"
        >
          ПОДПИСАТЬСЯ НА НОВОСТИ
        </button>
      </div>

      <!-- News Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        <!-- News Card 1 -->
        <div class="bg-white rounded-lg md:rounded-xl overflow-hidden flex flex-col">
          <div class="aspect-[4/3] overflow-hidden p-2 md:p-3">
            <img
              :src="newsItems[0].image"
              :alt="newsItems[0].title"
              class="w-full h-full object-cover rounded"
              loading="lazy"
            />
          </div>
          <div class="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
            <h3 class="text-[#333333] text-base md:text-lg font-medium uppercase mb-2 leading-tight">
              {{ newsItems[0].title }}
            </h3>
            <p class="text-[#555555] text-xs md:text-sm leading-relaxed mb-2 line-clamp-3 flex-1">
              {{ newsItems[0].description }}
            </p>
            <p class="text-[#999999] text-xs mt-auto">
              {{ newsItems[0].date }}
            </p>
          </div>
        </div>

        <!-- News Card 2 -->
        <div class="bg-white rounded-lg md:rounded-xl overflow-hidden flex flex-col">
          <div class="aspect-[4/3] overflow-hidden p-2 md:p-3">
            <img
              :src="newsItems[1].image"
              :alt="newsItems[1].title"
              class="w-full h-full object-cover rounded"
              loading="lazy"
            />
          </div>
          <div class="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
            <h3 class="text-[#333333] text-base md:text-lg font-medium uppercase mb-2 leading-tight">
              {{ newsItems[1].title }}
            </h3>
            <p class="text-[#555555] text-xs md:text-sm leading-relaxed mb-2 line-clamp-3 flex-1">
              {{ newsItems[1].description }}
            </p>
            <p class="text-[#999999] text-xs mt-auto">
              {{ newsItems[1].date }}
            </p>
          </div>
        </div>

        <!-- News Card 3 -->
        <div class="bg-white rounded-lg md:rounded-xl overflow-hidden flex flex-col">
          <div class="aspect-[4/3] overflow-hidden p-2 md:p-3">
            <img
              :src="newsItems[2].image"
              :alt="newsItems[2].title"
              class="w-full h-full object-cover rounded"
              loading="lazy"
            />
          </div>
          <div class="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
            <h3 class="text-[#333333] text-base md:text-lg font-medium uppercase mb-2 leading-tight">
              {{ newsItems[2].title }}
            </h3>
            <p class="text-[#555555] text-xs md:text-sm leading-relaxed mb-2 line-clamp-3 flex-1">
              {{ newsItems[2].description }}
            </p>
            <p class="text-[#999999] text-xs mt-auto">
              {{ newsItems[2].date }}
            </p>
          </div>
        </div>

        <!-- More News Card -->
        <div class="bg-white rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 flex flex-col min-h-[300px]">
          <h3 class="text-[#333333] text-xl md:text-2xl lg:text-3xl font-medium uppercase mb-auto text-left">
            БОЛЬШЕ НОВОСТЕЙ
          </h3>
          <div class="mt-auto">
            <button
              @click="handleAllNews"
              class="bg-[#656565] text-white rounded-lg md:rounded-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 text-sm md:text-base font-medium hover:bg-[#757575] transition-colors"
            >
              ВСЕ НОВОСТИ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('news')

const newsItems = [
  {
    title: 'ОБЪЕКТ ЗАВЕРШЕН',
    description: 'Самые внимательные уже заметили: вокруг ЖК «Экогород 2» не осталось и намёка на строительный забор...',
    date: '03.12.2025',
    image: '/images/ecocity-media-news-1.webp'
  },
  {
    title: 'СТРОИТЕЛЬСТВО ЖК «ЭКОГОРОД 3»',
    description: 'А вот и общий вид на строительную площадку ЖК «Экогород 3» — дом заметно подрос, и вся картина строительства как на ладони...',
    date: '03.12.2025',
    image: '/images/ecocity-media-news-2.webp'
  },
  {
    title: 'НОВОСТИ СО СТРОЙКИ «ЭКОГОРОД 3»',
    description: 'А вот и начало строительства третьего этажа ЖК «Экогород 3» — дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...',
    date: '03.12.2025',
    image: '/images/ecocity-media-news-3.webp'
  }
]

const handleSubscribe = () => {
  // Handle subscribe action
  console.log('Subscribe to news')
}

const handleAllNews = () => {
  // Navigate to all news page
  navigateTo('/news')
}
</script>
