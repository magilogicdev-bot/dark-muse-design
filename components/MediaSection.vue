<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Header Row - 2 columns on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 mb-6 md:mb-8 lg:mb-10">
        <!-- Left: Section title + Filter Buttons -->
        <div class="flex flex-col justify-between gap-4 md:gap-5 lg:gap-6">
          <h2 class="text-[18px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] font-medium uppercase leading-tight">МЕДИА</h2>
          
          <!-- Filter Buttons -->
          <div class="flex flex-wrap gap-2 lg:gap-3">
            <button class="px-3 md:px-4 lg:px-5 xl:px-6 h-[32px] md:h-[36px] lg:h-[40px] xl:h-[44px] rounded-[5px] bg-white text-black text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-medium uppercase hover:bg-gray-100 transition-colors flex items-center gap-1.5 md:gap-2">
              <svg class="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              новости
            </button>
            <button class="px-3 md:px-4 lg:px-5 xl:px-6 h-[32px] md:h-[36px] lg:h-[40px] xl:h-[44px] rounded-[5px] bg-white text-black text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-medium uppercase hover:bg-gray-100 transition-colors flex items-center gap-1.5 md:gap-2">
              <svg class="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              АКЦИИ
            </button>
          </div>
        </div>
        
        <!-- Right: Description + Subscribe Button -->
        <div class="space-y-3 lg:space-y-4">
          <p class="text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] text-white leading-relaxed tracking-[0.08em]">
            Село Любилки украшает величественный белокаменный храм, словно жемчужина, посвященный Пресвятой Богородице и святому Феодосию Тотемскому. Его золотой купол,
          </p>
          
          <!-- Subscribe Button -->
          <div class="flex justify-start lg:justify-end">
            <button class="px-3 md:px-4 lg:px-5 xl:px-6 h-[32px] md:h-[36px] lg:h-[40px] xl:h-[44px] rounded-[5px] bg-white text-black text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-medium uppercase hover:bg-gray-100 transition-colors flex items-center gap-1.5 md:gap-2">
              <svg class="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              подписаться на новости
            </button>
          </div>
        </div>
      </div>

      <!-- News Cards Grid - equal height cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5">
        <!-- News Card -->
        <article
          v-for="(item, idx) in posts"
          :key="idx"
          class="bg-white text-[#1f2736] rounded-[8px] lg:rounded-[10px] overflow-hidden shadow-lg flex flex-col group cursor-pointer"
        >
          <!-- Image -->
          <div class="aspect-[599/487] bg-gray-100 overflow-hidden flex-shrink-0">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
          
          <!-- Content -->
          <div class="p-3 md:p-4 lg:p-5 flex-1 flex flex-col gap-1 lg:gap-2">
            <p class="text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] font-medium uppercase tracking-[0.14em] line-clamp-1">{{ item.category }}</p>
            <p class="text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] leading-snug tracking-[0.14em] line-clamp-3 flex-1 normal-case">{{ item.text }}</p>
            <p class="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] text-black/60 tracking-[0.14em] mt-auto">{{ item.date }}</p>
          </div>
        </article>

        <!-- More News Card -->
        <div class="bg-white text-[#1f2736] rounded-[8px] lg:rounded-[10px] overflow-hidden shadow-lg flex flex-col p-3 md:p-4 lg:p-5 xl:p-6">
          <div class="flex-1 flex flex-col justify-center pt-3 md:pt-4 lg:pt-5">
            <h3 class="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-medium leading-tight">БОЛЬШЕ<br>НОВОСТЕЙ</h3>
          </div>
          <button class="mt-auto w-full h-[36px] md:h-[40px] lg:h-[44px] xl:h-[48px] bg-[#656565] rounded-[8px] md:rounded-[10px] lg:rounded-[12px] xl:rounded-[14px] text-white text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] font-medium uppercase hover:bg-[#757575] transition-colors">
            все новости
          </button>
        </div>
      </div>

      <!-- Pagination Dots (Mobile only) -->
      <div class="flex justify-center gap-2 mt-6 lg:hidden">
        <span class="w-[8px] h-[8px] rounded-full bg-white"></span>
        <span class="w-[8px] h-[8px] rounded-full bg-white/30"></span>
      </div>
    </div>
  </section>
</template>

<script setup>
const posts = [
  {
    date: '03.12.2025',
    category: 'ОБЬЕКТ ЗАВЕРШЕН',
    title: 'Завершение проекта',
    text: 'Самые внимательные уже заметили: вокруг ЖК «Экогород 2» не осталось и намёка на строительный забор...',
    image: '/images/media-1.webp'
  },
  {
    date: '03.12.2025',
    category: 'СТРОИТЕЛЬСТВО ЖК «ЭКОГОРОД 3»',
    title: 'Ход строительства',
    text: 'А вот и общий вид на строительную площадку ЖК «Экогород 3» – дом заметно подрос, и вся картина строительства как на ладони...',
    image: '/images/media-2.webp'
  },
  {
    date: '03.12.2025',
    category: 'НОВОСТИ СО СТРОЙКИ «ЭКОГОРОД 3»',
    title: 'Третий этаж',
    text: 'А вот и начало строительства третьего этажа ЖК «Экогород 3» – дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...',
    image: '/images/media-3.webp'
  }
]
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
