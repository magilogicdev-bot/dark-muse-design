<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Header -->
      <div class="mb-4 md:mb-6 lg:mb-8">
        <p class="text-white/60 uppercase text-sm tracking-[-0.02em] mb-1 md:mb-2">НАШИ ПРОЕКТЫ</p>
        <h2 class="text-4xl font-medium uppercase leading-tight">АКТУАЛЬНЫЕ ПРОЕКТЫ</h2>
      </div>

      <!-- Main Project Card -->
      <article class="relative overflow-hidden rounded-[12px] lg:rounded-[18px] xl:rounded-[22px] shadow-lg bg-black mb-4 lg:mb-6">
        <div class="aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] xl:aspect-[2.4/1]">
          <img 
            src="/images/current-projects-main.webp" 
            alt="ЭКОГОРОД 3" 
            class="w-full h-full object-cover" 
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/46"></div>
        </div>

        <div class="absolute inset-0 flex flex-col justify-between p-4 md:p-6 lg:p-8 xl:p-10">
          <!-- Top: Number badge + Feature Icons -->
          <div class="flex items-start gap-2 lg:gap-3 flex-wrap">
            <!-- Number badge with text below -->
            <div class="flex flex-col items-start gap-3 md:gap-4 lg:gap-5">
              <div class="w-[36px] h-[36px] md:w-[48px] md:h-[48px] lg:w-[64px] lg:h-[64px] xl:w-[80px] xl:h-[80px] rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
                <span class="text-white text-[12px] md:text-[16px] lg:text-[22px] xl:text-[28px] font-medium">89</span>
              </div>
              <div class="text-white text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] font-medium uppercase leading-tight">
                <p>КВАРТИРЫ В</p>
                <p>ПРОДАЖЕ!</p>
              </div>
            </div>
            
            <!-- Feature circles -->
            <div 
              v-for="(icon, idx) in featureIcons" 
              :key="idx"
              class="w-[36px] h-[36px] md:w-[48px] md:h-[48px] lg:w-[64px] lg:h-[64px] xl:w-[80px] xl:h-[80px] rounded-full bg-white flex items-center justify-center flex-shrink-0"
            >
              <img :src="icon.src" :alt="icon.alt" class="w-[18px] h-[18px] md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px] xl:w-[40px] xl:h-[40px] object-contain" />
            </div>
          </div>

          <!-- Bottom: Title + Button -->
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
            <div class="space-y-1">
              <p class="text-white/80 uppercase text-sm tracking-[-0.02em]">ЖИЛОЙ КОМПЛЕКС</p>
              <h3 class="text-3xl font-medium uppercase leading-tight">ЭКОГОРОД 3</h3>
            </div>
            <button class="w-full sm:w-auto lg:w-[140px] xl:w-[180px] h-[36px] md:h-[40px] lg:h-[48px] xl:h-[56px] bg-white rounded-[5px] text-black text-base font-medium uppercase hover:bg-gray-100 transition-colors px-4">
              подробнее
            </button>
          </div>
        </div>
      </article>

      <!-- Info Blocks Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5">
        <!-- Block 1: Complex -->
        <div class="bg-[#ededed] text-[#353535] rounded-[8px] lg:rounded-[10px] p-3 lg:p-4 xl:p-5 flex flex-col min-h-[120px] md:min-h-[150px] lg:min-h-[200px] xl:min-h-[260px]">
          <p class="text-[10px] md:text-[12px] lg:text-[16px] xl:text-[20px] font-medium uppercase mb-auto">комплекс</p>
          <p class="text-[18px] md:text-[24px] lg:text-[36px] xl:text-[48px] font-medium uppercase mt-auto">домов: 6</p>
        </div>
        
        <!-- Block 2: Landscaping -->
        <div class="bg-[#ededed] text-[#353535] rounded-[8px] lg:rounded-[10px] p-3 lg:p-4 xl:p-5 flex flex-col min-h-[120px] md:min-h-[150px] lg:min-h-[200px] xl:min-h-[260px]">
          <p class="text-[10px] md:text-[12px] lg:text-[16px] xl:text-[20px] font-medium uppercase mb-2 lg:mb-4">благоустройство</p>
          <ol class="list-decimal list-inside text-[9px] md:text-[10px] lg:text-[13px] xl:text-[16px] space-y-1">
            <li>детская площадка</li>
            <li>спортивная площадка</li>
            <li>огороженная территория</li>
          </ol>
        </div>
        
        <!-- Block 3: Advantages -->
        <div class="bg-[#ededed] text-[#353535] rounded-[8px] lg:rounded-[10px] p-3 lg:p-4 xl:p-5 flex flex-col min-h-[120px] md:min-h-[150px] lg:min-h-[200px] xl:min-h-[260px]">
          <p class="text-[10px] md:text-[12px] lg:text-[16px] xl:text-[20px] font-medium uppercase mb-2 lg:mb-4">преимущества</p>
          <ol class="list-decimal list-inside text-[9px] md:text-[10px] lg:text-[13px] xl:text-[16px] space-y-1 uppercase">
            <li>Дагестанский камень</li>
            <li>Индивидуальное отопление</li>
            <li>Панорамное остекление</li>
            <li>Керамический кирпич</li>
          </ol>
        </div>
        
        <!-- Block 4: Gallery -->
        <div class="bg-[#ededed] rounded-[8px] lg:rounded-[10px] overflow-hidden relative min-h-[120px] md:min-h-[150px] lg:min-h-[200px] xl:min-h-[260px] group cursor-pointer">
          <img 
            src="/images/current-projects-gallery.webp" 
            alt="Галерея" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-3 lg:bottom-4 xl:bottom-5 left-3 lg:left-4 xl:left-5 right-3 lg:right-4 xl:right-5">
            <p class="text-white text-[14px] md:text-[18px] lg:text-[26px] xl:text-[34px] font-medium uppercase">ГАЛЕРЕЯ</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const featureIcons = [
  { src: '/images/icon-ecology.webp', alt: 'Экология' },
  { src: '/images/icon-basketball.svg', alt: 'Баскетбол' },
  { src: '/images/icon-brick.svg', alt: 'Кирпичная стена' },
  { src: '/images/icon-fence.svg', alt: 'Забор' },
  { src: '/images/icon-playground.svg', alt: 'Детская площадка' }
]
</script>
