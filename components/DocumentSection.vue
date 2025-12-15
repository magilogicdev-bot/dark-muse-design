<template>
  <section class="bg-[#2a2c38] py-16 md:py-20 lg:py-24">
    <div class="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20">
        ДОКУМЕНТЫ
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(doc, index) in documents"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-6 md:p-8 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div class="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#F2994A]">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">
            {{ doc.title }}
          </h3>
          <p class="text-gray-400 text-sm md:text-base mb-4 md:mb-5">
            {{ doc.date }}
          </p>
          <button class="text-[#F2994A] hover:text-[#e8893a] text-sm md:text-base font-medium transition-colors flex items-center gap-2">
            <span>Скачать</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const documents = ref([
  { title: 'Проектная документация', date: '15.11.2025', url: '/documents/project.pdf' },
  { title: 'Разрешение на строительство', date: '10.11.2025', url: '/documents/permit.pdf' },
  { title: 'Договор долевого участия', date: '05.11.2025', url: '/documents/ddu.pdf' },
  { title: 'Технические условия', date: '01.11.2025', url: '/documents/technical.pdf' },
  { title: 'Экспертное заключение', date: '25.10.2025', url: '/documents/expertise.pdf' },
  { title: 'Лицензия застройщика', date: '20.10.2025', url: '/documents/license.pdf' }
])
</script>
