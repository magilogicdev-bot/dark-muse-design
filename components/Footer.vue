<template>
  <footer class="bg-[#090c19] text-white relative overflow-hidden">
    <!-- Background Image with overlay -->
    <div class="absolute inset-0">
      <img
        src="/images/footer-background.webp"
        alt=""
        class="w-full h-full object-cover opacity-20"
      />
      <div class="absolute inset-0 bg-[#090c19]/80"></div>
    </div>

    <div class="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-[60px] relative z-10 py-8 md:py-10 lg:py-12 xl:py-16">
      <!-- Top Section: Logo left, Badges right -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 lg:mb-8">
        <!-- Logo -->
        <div class="flex flex-col gap-0.5">
          <p class="text-white text-[16px] md:text-[18px] lg:text-[22px] xl:text-[26px] font-normal tracking-[0.12em]" style="font-family: 'Lora', Georgia, serif;">Pobedonoscev</p>
          <p class="bg-clip-text text-transparent bg-gradient-to-r from-[#cecece] to-[#2e2e2e] text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-bold tracking-[0.18em]">GROUP</p>
        </div>
        
        <!-- Badges -->
        <div class="flex items-center gap-3 md:gap-4 lg:gap-5 flex-wrap">
          <!-- CITY AWARDS badge -->
          <div class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] flex items-center justify-center flex-shrink-0">
            <img 
              src="/images/badge-city-awards.webp" 
              alt="CITY AWARDS" 
              class="w-full h-full object-contain"
            />
          </div>
          <!-- Green checkmark badge -->
          <div class="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
            <svg class="w-1/2 h-1/2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <!-- ТОП ЖИЛ badge -->
          <div class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] flex items-center justify-center flex-shrink-0">
            <img 
              src="/images/badge-top-zhyl.webp" 
              alt="ТОП ЖИЛ" 
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-white/20 mb-6 lg:mb-8"></div>

      <!-- Bottom Section: 3-column grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        <!-- Column 1: Contact Info + Social Media -->
        <div class="space-y-2">
          <p class="text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-light leading-relaxed text-white/70">
            Время работы отдела продаж:
          </p>
          <p class="text-[12px] md:text-[13px] lg:text-[14px] xl:text-[17px] text-white/90">
            Сегодня с 09:00 до 18:00
          </p>
          <!-- Phone numbers -->
          <div class="space-y-2 md:space-y-3">
            <a href="tel:+74852363094" class="block text-[18px] md:text-[22px] lg:text-[28px] xl:text-[34px] font-normal hover:text-[#ffb347] transition-colors">
              +7 (4852) 36-30-94
            </a>
            <!-- Second phone with social icons on the right -->
            <div class="flex items-center gap-3 md:gap-4">
              <a href="tel:+74852363094" class="text-[18px] md:text-[22px] lg:text-[28px] xl:text-[34px] font-normal hover:text-[#ffb347] transition-colors whitespace-nowrap">
                +7 (4852) 36-30-94
              </a>
              <!-- Social Media Icons (circular with blue background) - right side of second phone -->
              <div class="flex items-center gap-2 md:gap-3 ml-auto">
                <a href="#" class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-[#0077FF] flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                  <img src="/images/social-vk.webp" alt="VK" class="w-2/3 h-2/3 object-contain" />
                </a>
                <a href="#" class="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-[#0088cc] flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                  <img src="/images/social-telegram.webp" alt="Telegram" class="w-2/3 h-2/3 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2: Legal Text + Links -->
        <div class="space-y-3 md:space-y-4">
          <!-- Legal Text -->
          <p class="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] text-white/60 leading-relaxed tracking-[0.01em]">
            Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. Любые изображения и видеоматериалы несут ознакомительный характер и могут отличаться от действительности. Все права на публикуемые на сайте победоносцев.рф материалы принадлежат ООО «СЗ «ПОБЕДОНОСЦЕВ ГРУПП». Использование материалов, без письменного разрешения, является нарушением закона об авторском праве.
          </p>
          <!-- Bottom Links - horizontal on desktop -->
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 md:gap-3">
            <a href="#" class="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] text-white underline hover:text-[#ffb347] transition-colors whitespace-nowrap">Пользовательское соглашение</a>
            <a href="#" class="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] text-white underline hover:text-[#ffb347] transition-colors whitespace-nowrap">Политика конфиденциальности</a>
            <a href="#" class="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] text-white underline hover:text-[#ffb347] transition-colors whitespace-nowrap">Карта сайта</a>
          </div>
        </div>

        <!-- Column 3: Company Names -->
        <div class="flex flex-col gap-2 md:gap-3">
          <span class="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] font-light tracking-[-0.02em] text-white/30">Pobedonoscev Group</span>
          <a href="#" class="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] font-light tracking-[-0.02em] text-white hover:text-[#ffb347] transition-colors">Камни Дагестана</a>
          <a href="#" class="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] font-light tracking-[-0.02em] text-white hover:text-[#ffb347] transition-colors">Pobedonoscev Architects</a>
        </div>
      </div>
    </div>
  </footer>
</template>
