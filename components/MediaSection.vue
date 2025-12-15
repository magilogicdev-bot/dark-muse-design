<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-[#2a2c38] text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Header Row - 2 columns on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 mb-6 md:mb-8 lg:mb-10">
        <!-- Left: Section title + Filter Buttons -->
        <div class="flex flex-col justify-between">
          <h2 class="text-[20px] md:text-[28px] lg:text-[40px] xl:text-[56px] 2xl:text-[72px] font-medium uppercase leading-tight">МЕДИА</h2>
          
          <!-- Filter Buttons -->
          <div class="flex flex-wrap gap-2 lg:gap-3">
            <button class="px-4 md:px-5 lg:px-6 xl:px-7 h-[40px] md:h-[48px] lg:h-[56px] xl:h-[76px] rounded-[5px] bg-white text-black text-[12px] md:text-[14px] lg:text-[18px] xl:text-[24px] font-medium uppercase hover:bg-gray-100 transition-colors">
              новости
            </button>
            <button class="px-4 md:px-5 lg:px-6 xl:px-7 h-[40px] md:h-[48px] lg:h-[56px] xl:h-[76px] rounded-[5px] bg-white text-black text-[12px] md:text-[14px] lg:text-[18px] xl:text-[24px] font-medium uppercase hover:bg-gray-100 transition-colors">
              АКЦИИ
            </button>
          </div>
        </div>
        
        <!-- Right: Description + Subscribe Button -->
        <div class="space-y-3 lg:space-y-4">
          <p class="text-[11px] md:text-[12px] lg:text-[14px] xl:text-[18px] text-white leading-relaxed tracking-[0.08em]">
            Село Любилки украшает величественный белокаменный храм, словно жемчужина, посвященный Пресвятой Богородице и святому Феодосию Тотемскому. Его золотой купол,
          </p>
          
          <!-- Subscribe Button -->
          <div class="flex justify-start lg:justify-end">
            <button class="px-4 md:px-5 lg:px-6 xl:px-7 h-[40px] md:h-[48px] lg:h-[56px] xl:h-[76px] rounded-[5px] bg-white text-black text-[12px] md:text-[14px] lg:text-[18px] xl:text-[24px] font-medium uppercase hover:bg-gray-100 transition-colors">
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
          <div class="p-4 md:p-5 lg:p-6 flex-1 flex flex-col gap-1 lg:gap-2">
            <p class="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium uppercase tracking-[0.14em] line-clamp-1">{{ item.category }}</p>
            <p class="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] leading-snug tracking-[0.14em] line-clamp-3 flex-1 normal-case">{{ item.text }}</p>
            <p class="text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] text-black/60 tracking-[0.14em] mt-auto">{{ item.date }}</p>
          </div>
        </article>

        <!-- More News Card -->
        <div class="bg-white text-[#1f2736] rounded-[8px] lg:rounded-[10px] overflow-hidden shadow-lg flex flex-col p-4 md:p-5 lg:p-6 xl:p-8">
          <div class="flex-1 flex flex-col justify-center pt-4 md:pt-6 lg:pt-8">
            <h3 class="text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] font-medium leading-tight">БОЛЬШЕ<br>НОВОСТЕЙ</h3>
          </div>
          <button class="mt-auto w-full h-[48px] md:h-[52px] lg:h-[56px] xl:h-[64px] bg-[#656565] rounded-[10px] md:rounded-[12px] lg:rounded-[14px] xl:rounded-[16px] text-white text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-medium uppercase hover:bg-[#757575] transition-colors">
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
