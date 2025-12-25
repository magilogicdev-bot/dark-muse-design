<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12 md:mb-16">
        <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase">
          НОВОСТИ
        </h2>
        <button class="text-white hover:text-[#F2994A] transition-colors">
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>

      <!-- News Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(news, index) in newsItems"
          :key="index"
          class="rounded-lg md:rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          @click="handleNewsClick(news)"
        >
          <div class="aspect-[4/3] w-full overflow-hidden bg-black">
            <img
              :src="getNewsImage(news.image)"
              :alt="news.title"
              class="w-full h-full object-cover scale-[1.03]"
            />
          </div>
          <div class="p-5 md:p-6 flex-1 flex flex-col">
            <h3 class="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4">
              {{ news.title }}
            </h3>
            <p class="text-white/70 text-sm md:text-base lg:text-lg mb-4 flex-1">
              {{ news.excerpt }}
            </p>
            <p class="text-white/40 text-xs md:text-sm">
              {{ news.date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const newsItems = ref([
  {
    title: 'ОБЬЕКТ ЗАВЕРШЕН',
    excerpt: 'Самые внимательные уже заметили: вокруг ЖК «Экогород 2» не осталось и намёка на строительный забор...',
    date: '03.12.2025',
    image: '862380c6a45e4b98f2e16ebf7c002544376e73e3.webp'
  },
  {
    title: 'СТРОИТЕЛЬСТВО ЖК «ЭКОГОРОД 3»',
    excerpt: 'А вот и общий вид на строительную площадку ЖК «Экогород 3» – дом заметно подрос, и вся картина строительства как на ладони...',
    date: '03.12.2025',
    image: '2b9684c1a6e3c0c1e76a766bf50c58725cf367fa.webp'
  },
  {
    title: 'НОВОСТИ СО СТРОЙКИ «ЭКОГОРОД 3»',
    excerpt: 'А вот и начало строительства третьего этажа ЖК «Экогород 3» – дом уверенно набирает высоту и меняется буквально на глазах.',
    date: '03.12.2025',
    image: '7496c16a6da114fc6abc42b48703c38411c89fd8.webp'
  }
])

const getNewsImage = (imageName) => {
  if (!imageName) return ''
  return `/assets/${imageName}`
}

const handleNewsClick = (news) => {
  // Handle news item click
  console.log('News clicked:', news)
}
</script>
