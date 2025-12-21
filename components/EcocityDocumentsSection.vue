<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 xl:mb-16">
        <!-- Left: Title and Description -->
        <div class="flex flex-col gap-4 md:gap-5 lg:gap-6">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            ДОКУМЕНТЫ
          </h2>
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            Покупателям квартир в Экогород 2 доступна возможность наблюдать за процессом строительства. Благодаря прозрачности и открытости проекта, вы можете видеть каждый этап возведения — от закладки фундамента до монтажа внутренних инженерных систем.
          </p>
        </div>

        <!-- Right: Document Cards Grid -->
        <div class="flex flex-col items-start">
          <div class="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6 w-full mb-6 md:mb-8">
            <div
              v-for="(doc, index) in documents"
              :key="index"
              class="bg-[#2A2C38] border border-white/20 rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 relative group cursor-pointer hover:bg-[#333540] transition-colors"
            >
              <!-- Arrow Icon (Top Right) -->
              <div class="absolute top-4 right-4 md:top-5 md:right-5 lg:top-6 lg:right-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white/60 group-hover:text-white/80 transition-colors">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <!-- Stage Indicator (Top Left) -->
              <div class="mb-3 md:mb-4">
                <span class="text-white/60 text-[10px] md:text-xs uppercase font-medium">
                  ЭТАП {{ doc.stage }}
                </span>
              </div>

              <!-- Document Title and Icon -->
              <div class="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <h3 class="text-white text-sm md:text-base lg:text-lg font-medium uppercase leading-tight flex-1">
                  {{ doc.title }}
                </h3>
                <!-- Document Icon -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white/60 flex-shrink-0">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <!-- Description -->
              <p class="text-white/60 text-[10px] md:text-xs leading-relaxed line-clamp-3">
                {{ doc.description }}
              </p>
            </div>
          </div>

          <!-- Show More Button -->
          <div class="flex justify-center w-full">
            <button
              @click="handleShowMore"
              class="px-4 lg:px-8 py-0 lg:py-2 rounded-full bg-[#E1E3E1] border border-gray-300 text-[#333333] text-sm md:text-base font-medium uppercase hover:bg-gray-200 transition-colors"
            >
              ПОКАЗАТЬ ЕЩЁ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const documents = [
  {
    stage: 1,
    title: 'ПРОЕКТНАЯ ДЕКЛАРАЦИЯ',
    description: 'Покупателям квартир в Экогород 2 доступна возможность наблюдать за процессом строительства. Благодаря прозрачности и открытости проекта, вы можете видеть каждый этап возведения — от закладки фундамента до монтажа внутренних инженерных систем.'
  },
  {
    stage: 2,
    title: 'ПРОЕКТНАЯ ДЕКЛАРАЦИЯ',
    description: 'Покупателям квартир в Экогород 2 доступна возможность наблюдать за процессом строительства. Благодаря прозрачности и открытости проекта, вы можете видеть каждый этап возведения — от закладки фундамента до монтажа внутренних инженерных систем.'
  },
  {
    stage: 3,
    title: 'ПРОЕКТНАЯ ДЕКЛАРАЦИЯ',
    description: 'Покупателям квартир в Экогород 2 доступна возможность наблюдать за процессом строительства. Благодаря прозрачности и открытости проекта, вы можете видеть каждый этап возведения — от закладки фундамента до монтажа внутренних инженерных систем.'
  },
  {
    stage: 4,
    title: 'ПРОЕКТНАЯ ДЕКЛАРАЦИЯ',
    description: 'Покупателям квартир в Экогород 2 доступна возможность наблюдать за процессом строительства. Благодаря прозрачности и открытости проекта, вы можете видеть каждый этап возведения — от закладки фундамента до монтажа внутренних инженерных систем.'
  }
]

const handleShowMore = () => {
  // Handle "Show More" action
  console.log('Show more documents')
}
</script>
