<template>
  <footer class="text-white relative overflow-hidden bg-[rgba(9,12,25,1)] z-20">
    <!-- Content -->
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
      <!-- Top Section: Logo + Badges -->
      <div class="pt-8 md:pt-10 lg:pt-12 xl:pt-14 pb-6 md:pb-8 lg:pb-10">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 lg:gap-12">
          <!-- Left: Brand Name -->
          <div class="flex flex-col gap-1">
            <span class="text-xl md:text-2xl lg:text-3xl xl:text-[32px] 2xl:text-[36px] font-normal tracking-[5.76px] text-white leading-[1.1]" style="font-family: 'Lora', Georgia, serif">
              {{ config.branding.name }}
            </span>
            <span class="text-xs md:text-sm lg:text-base xl:text-[20px] 2xl:text-[22px] font-bold tracking-[6.84px] bg-clip-text text-transparent bg-gradient-to-r from-[#cecece] to-[#2e2e2e] leading-tight" style="font-family: 'Inter', sans-serif">
              GROUP
            </span>
          </div>

          <!-- Right: Badges/Logos -->
          <div class="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            <!-- Icon components from Figma -->
            <img 
              src="/images/footer-icon-1.png" 
              alt="CITY VISION AWARDS" 
              class="h-10 md:h-12 lg:h-14 xl:h-16 max-h-16 w-auto object-contain flex-shrink-0 aspect-auto"
            />
            <img 
              src="/images/footer-icon-2.png" 
              alt="Checkmark Icon" 
              class="h-10 md:h-12 lg:h-14 xl:h-16 max-h-16 w-auto object-contain flex-shrink-0 aspect-auto"
            />
            <img 
              src="/images/footer-icon-3.png" 
              alt="Refresh Icon" 
              class="h-10 md:h-12 lg:h-14 xl:h-16 max-h-16 w-auto object-contain flex-shrink-0 aspect-auto"
            />
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-white/20"></div>

      <!-- Bottom Section: Contact Info + Legal -->
      <div class="py-6 md:py-8 lg:py-10 xl:py-12">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          <!-- Left: Contact Info -->
          <div class="flex flex-col gap-3 md:gap-4">
            <div class="mb-2 md:mb-3">
              <p class="text-white/60 text-[10px] md:text-xs lg:text-sm leading-[1.4] mb-1.5">
                {{ config.contacts.workingHours.label }}
              </p>
              <p class="text-white text-xs md:text-sm lg:text-base xl:text-lg font-normal leading-[1.4]" style="font-family: 'Manrope', sans-serif">
                {{ config.contacts.workingHours.text }}
              </p>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-start gap-3 md:gap-4 lg:gap-5">
              <div class="flex flex-col gap-1.5 md:gap-2">
                <a 
                  :href="'tel:' + config.contacts.phone.formatted" 
                  class="text-white text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[24px] font-normal leading-[1.3] hover:opacity-70 transition-opacity whitespace-nowrap"
                  style="font-family: 'Manrope', sans-serif"
                >
                  {{ config.contacts.phone.primary }}
                </a>
                <a 
                  :href="'tel:' + config.contacts.phone.secondaryFormatted" 
                  class="text-white text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[24px] font-normal leading-[1.3] hover:opacity-70 transition-opacity whitespace-nowrap"
                  style="font-family: 'Manrope', sans-serif"
                >
                  {{ config.contacts.phone.secondary }}
                </a>
              </div>
              <div class="flex items-center gap-2 md:gap-2.5 lg:gap-3 mt-2 lg:mt-0">
                <a 
                  :href="config.contacts.social.vk" 
                  class="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full aspect-square flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 relative overflow-hidden"
                  aria-label="VKontakte"
                >
                  <!-- Circle background -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/54d0f66b-b601-41f4-aa21-e69f71bfa8c4" 
                    alt="" 
                    class="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                  <!-- VK logo inside -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/91373bff-ac3b-4736-977d-166869d00832" 
                    alt="VK" 
                    class="relative z-10 w-[40%] h-[40%] object-contain"
                  />
                </a>
                <a 
                  :href="config.contacts.social.telegram" 
                  class="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full aspect-square flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 relative overflow-hidden"
                  aria-label="Telegram"
                >
                  <!-- Circle background -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/3256f975-f004-4f9d-86a3-5eb85f9d85fb" 
                    alt="" 
                    class="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                  <!-- Telegram logo inside -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/3c609572-383a-4756-896c-c4a192efdaba" 
                    alt="Telegram" 
                    class="relative z-10 w-[40%] h-[40%] object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Company Names + Legal -->
          <div class="flex flex-col gap-3 md:gap-4 lg:gap-5 max-w-5xl lg:max-w-3xl xl:max-w-4xl">
            <!-- Company Names -->
            <div class="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              <h3 
                v-for="(company, index) in config.companies" 
                :key="index"
                :class="[
                  'text-xs md:text-sm lg:text-base font-light leading-[1.528] tracking-[-0.4px]',
                  index === 0 ? 'text-white/80' : 'text-white'
                ]"
                style="font-family: 'Manrope', sans-serif"
              >
                {{ company }}
              </h3>
            </div>

            <!-- Legal Disclaimer -->
            <p class="text-white/60 text-[10px] md:text-xs lg:text-sm leading-[1.528] tracking-[0.36px] font-light" style="font-family: 'Manrope', sans-serif">
              Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. Любые изображения и видеоматериалы несут ознакомительный характер и могут отличаться от действительности. Все права на публикуемые на сайте победоносцев.рф материалы принадлежат ООО «СЗ «ПОБЕДОНОСЦЕВ ГРУПП». Использование материалов, без письменного разрешения, является нарушением закона об авторском праве.
            </p>

            <!-- Navigation Links -->
            <div class="flex flex-wrap gap-3 md:gap-4 lg:gap-5">
              <a 
                :href="config.legal.userAgreement" 
                class="text-white/60 text-[10px] md:text-xs lg:text-sm font-light leading-[1.528] tracking-[0.32px] underline hover:text-white hover:opacity-80 transition-colors decoration-solid underline-offset-2"
                style="font-family: 'Manrope', sans-serif"
              >
                Пользовательское соглашение
              </a>
              <a 
                :href="config.legal.privacyPolicy" 
                class="text-white/60 text-[10px] md:text-xs lg:text-sm font-light leading-[1.528] tracking-[0.32px] underline hover:text-white hover:opacity-80 transition-colors decoration-solid underline-offset-2"
                style="font-family: 'Manrope', sans-serif"
              >
                Политика конфиденциальности
              </a>
              <a 
                :href="config.legal.sitemap" 
                class="text-white/60 text-[10px] md:text-xs lg:text-sm font-light leading-[1.528] tracking-[0.32px] underline hover:text-white hover:opacity-80 transition-colors decoration-solid underline-offset-2"
                style="font-family: 'Manrope', sans-serif"
              >
                Карта сайта
              </a>
            </div>
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
