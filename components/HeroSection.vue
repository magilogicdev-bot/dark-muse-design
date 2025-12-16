<template>
  <section class="relative w-full bg-primary">
    <!-- Hero Background Image -->
    <div class="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] xl:aspect-[2.2/1]">
      <img
        src="/images/hero-background.webp"
        alt="Вид сверху на жилой комплекс"
        class="absolute inset-0 w-full h-full object-cover"
      />
      
      <!-- Navigation dots - bottom right -->
      <div class="absolute bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 2xl:bottom-16 right-24 md:right-28 lg:right-32 xl:right-36 2xl:right-40 flex items-center gap-4 md:gap-5 lg:gap-6 xl:gap-7 z-10">
        <button class="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full bg-white cursor-pointer hover:opacity-90 transition-opacity"></button>
        <button class="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full bg-white cursor-pointer hover:opacity-90 transition-opacity"></button>
        <button class="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full bg-white cursor-pointer hover:opacity-90 transition-opacity"></button>
      </div>

      <!-- Social buttons - right side, vertical bar -->
      <div class="hidden xl:flex flex-col items-center absolute right-4 md:right-6 lg:right-8 bottom-[80px] md:bottom-[100px] lg:bottom-[120px] xl:bottom-[140px] 2xl:bottom-[180px] z-40">
        <div class="bg-[#2B2D31] rounded-full px-3 py-4 flex flex-col items-center gap-3">
          <!-- WhatsApp -->
          <a 
            href="#" 
            class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[#2B2D31] border-2 border-white/20 hover:border-white/40 transition-colors flex items-center justify-center relative group"
            aria-label="WhatsApp"
          >
            <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#F2994A] to-white/30"></div>
            <svg viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white relative z-10">
              <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          <!-- Telegram -->
          <a 
            href="#" 
            class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[#2B2D31] border-2 border-white/20 hover:border-white/40 transition-colors flex items-center justify-center relative group"
            aria-label="Telegram"
          >
            <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#F2994A] to-white/30"></div>
            <svg viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white relative z-10">
              <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.174 1.858-.924 6.33-1.304 8.405-.168.913-.499 1.218-.82 1.249-.696.062-1.225-.461-1.9-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.151-.056-.213-.07-.062-.174-.041-.249-.024-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.118.095.151.223.167.312.016.09.036.297.021.459z"/>
            </svg>
          </a>

          <!-- Phone -->
          <a 
            :href="'tel:' + config.contacts.phone.formatted" 
            class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[#2B2D31] border-2 border-white/20 hover:border-white/40 transition-colors flex items-center justify-center relative group"
            aria-label="Телефон"
          >
            <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#F2994A] to-white/30"></div>
            <svg viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white relative z-10">
              <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </a>

          <!-- Down Arrow -->
          <button 
            @click="scrollDown"
            class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[#2B2D31] border-2 border-white flex items-center justify-center relative group hover:bg-white/5 transition-colors"
            aria-label="Прокрутить вниз"
          >
            <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#F2994A] to-white/30"></div>
            <svg viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white relative z-10">
              <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const config = siteConfig

const scrollDown = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }
}
</script>
