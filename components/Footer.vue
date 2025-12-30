<template>
  <footer class="bg-[#2A2C38] text-white py-10 md:py-14 border-t border-white/5">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div class="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
        
        <!-- Left Side: Brand & Socials -->
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 flex-shrink-0">
          <!-- Brand -->
          <div class="flex flex-col gap-1 bg-[#2A2C38]">
            <span class="text-xl md:text-2xl font-normal tracking-[0.2em] text-white leading-tight" style="font-family: 'Lora', Georgia, serif">
              {{ config.branding.name }}
            </span>
            <span class="text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/50 uppercase leading-tight pl-0.5" style="font-family: 'Inter', sans-serif">
              GROUP
            </span>
          </div>

          <!-- Social Icons -->
          <div class="flex items-center gap-3">
            <a 
              :href="config.contacts.social.vk" 
              class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="VKontakte"
            >
              <img src="/images/social-vk-bg.svg" alt="VK" class="w-full h-full object-contain" />
            </a>
            <a 
              :href="config.contacts.social.telegram" 
              class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Telegram"
            >
              <img src="/images/social-telegram-bg.svg" alt="Telegram" class="w-full h-full object-contain" />
            </a>
            <a 
              :href="config.contacts.social.whatsapp" 
              class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Viber"
            >
              <img src="/images/ellipse-14.webp" alt="Viber" class="w-full h-full object-contain" />
            </a>
          </div>
        </div>

        <!-- Right Side: Legal Info -->
        <div class="flex flex-col gap-4 max-w-4xl text-center md:text-left">
          <p class="text-[10px] md:text-[11px] lg:text-xs text-white/50 leading-relaxed font-light tracking-wide" style="font-family: 'Manrope', sans-serif">
            Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. Любые изображения и видеоматериалы несут ознакомительный характер и могут отличаться от действительности. Все права на публикуемые на сайте победоносцев.рф материалы принадлежат ООО «СЗ «ПОБЕДОНОСЦЕВ ГРУПП». Использование материалов, без письменного разрешения, является нарушением закона об авторском праве.
          </p>
          
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
            <a 
              :href="config.legal.userAgreement" 
              class="text-[10px] md:text-[11px] text-white/40 hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-0.5"
              style="font-family: 'Manrope', sans-serif"
            >
              Пользовательское соглашение
            </a>
            <a 
              :href="config.legal.privacyPolicy" 
              class="text-[10px] md:text-[11px] text-white/40 hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-0.5"
              style="font-family: 'Manrope', sans-serif"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const config = siteConfig
</script>
