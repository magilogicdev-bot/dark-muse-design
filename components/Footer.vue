<template>
  <footer class="text-white relative overflow-hidden bg-[#2a2c38]">
    <!-- Content -->
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
      <!-- Top Section: Logo + Badges -->
      <div class="pt-8 md:pt-10 lg:pt-12 xl:pt-14 pb-6 md:pb-8 lg:pb-10">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 lg:gap-12">
          <!-- Left: Brand Name -->
          <div class="flex flex-col">
            <span class="font-['Lora',Georgia,serif] text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-normal tracking-[5.76px] text-white leading-tight">
              {{ config.branding.name }}
            </span>
            <span class="font-['Inter',sans-serif] text-sm md:text-base lg:text-lg xl:text-[24px] font-bold tracking-[6.84px] bg-clip-text text-transparent bg-gradient-to-r from-[#cecece] to-[#2e2e2e] mt-1">
              GROUP
            </span>
          </div>

          <!-- Right: Badges/Logos -->
          <div class="flex items-center gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            <!-- Icon components from Figma -->
            <img 
              src="/images/footer-icon-1.png" 
              alt="CITY VISION AWARDS" 
              class="h-12 md:h-14 lg:h-16 xl:h-[79px] w-auto object-contain flex-shrink-0"
            />
            <img 
              src="/images/footer-icon-2.png" 
              alt="Checkmark Icon" 
              class="h-12 md:h-14 lg:h-16 xl:h-[79px] w-auto object-contain flex-shrink-0"
            />
            <img 
              src="/images/footer-icon-3.png" 
              alt="Refresh Icon" 
              class="h-12 md:h-14 lg:h-16 xl:h-[79px] w-auto object-contain flex-shrink-0"
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
            <div>
              <p class="text-white/60 text-xs md:text-sm lg:text-base mb-1 leading-[1.56]">
                {{ config.contacts.workingHours.label }}
              </p>
              <p class="text-white text-sm md:text-base lg:text-lg xl:text-xl font-['Manrope',sans-serif] font-normal leading-[1.56]">
                {{ config.contacts.workingHours.text }}
              </p>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-start gap-3 md:gap-4 lg:gap-5">
              <div class="flex flex-col gap-1 md:gap-2">
                <a 
                  :href="`tel:${config.contacts.phone.formatted}`" 
                  class="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-['Manrope',sans-serif] font-normal leading-[1.56] hover:opacity-70 transition-opacity"
                >
                  {{ config.contacts.phone.primary }}
                </a>
                <a 
                  :href="`tel:${config.contacts.phone.secondaryFormatted}`" 
                  class="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-['Manrope',sans-serif] font-normal leading-[1.56] hover:opacity-70 transition-opacity"
                >
                  {{ config.contacts.phone.secondary }}
                </a>
              </div>
              <div class="flex items-center gap-2 md:gap-3 lg:gap-4 mt-2 lg:mt-0">
                <a 
                  :href="config.contacts.social.vk" 
                  class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[97px] xl:h-[97px] flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 relative"
                  aria-label="VKontakte"
                >
                  <!-- Circle background -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/54d0f66b-b601-41f4-aa21-e69f71bfa8c4" 
                    alt="" 
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                  <!-- VK logo inside -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/91373bff-ac3b-4736-977d-166869d00832" 
                    alt="VK" 
                    class="relative z-10 w-1/2 h-1/2 object-contain"
                  />
                </a>
                <a 
                  :href="config.contacts.social.telegram" 
                  class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[97px] xl:h-[97px] flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 relative"
                  aria-label="Telegram"
                >
                  <!-- Circle background -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/3256f975-f004-4f9d-86a3-5eb85f9d85fb" 
                    alt="" 
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                  <!-- Telegram logo inside -->
                  <img 
                    src="https://www.figma.com/api/mcp/asset/3c609572-383a-4756-896c-c4a192efdaba" 
                    alt="Telegram" 
                    class="relative z-10 w-1/2 h-1/2 object-contain"
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
                  'text-sm md:text-base lg:text-lg font-['Manrope',sans-serif] font-light leading-[1.528] tracking-[-0.4px]',
                  index === 0 ? 'text-white/80' : 'text-white'
                ]"
              >
                {{ company }}
              </h3>
            </div>

            <!-- Legal Disclaimer -->
            <p class="text-white/60 text-xs md:text-sm lg:text-base leading-[1.528] tracking-[0.36px] font-['Manrope',sans-serif] font-light">
              Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. Любые изображения и видеоматериалы несут ознакомительный характер и могут отличаться от действительности. Все права на публикуемые на сайте победоносцев.рф материалы принадлежат ООО «СЗ «ПОБЕДОНОСЦЕВ ГРУПП». Использование материалов, без письменного разрешения, является нарушением закона об авторском праве.
            </p>

            <!-- Navigation Links -->
            <div class="flex flex-wrap gap-3 md:gap-4 lg:gap-5">
              <a 
                :href="config.legal.userAgreement" 
                class="text-white/60 text-xs md:text-sm lg:text-base font-['Manrope',sans-serif] font-light leading-[1.528] tracking-[0.32px] underline hover:text-white hover:opacity-80 transition-colors decoration-solid underline-offset-2"
              >
                Пользовательское соглашение
              </a>
              <a 
                :href="config.legal.privacyPolicy" 
                class="text-white/60 text-xs md:text-sm lg:text-base font-['Manrope',sans-serif] font-light leading-[1.528] tracking-[0.32px] underline hover:text-white hover:opacity-80 transition-colors decoration-solid underline-offset-2"
              >
                Политика конфиденциальности
              </a>
              <a 
                :href="config.legal.sitemap" 
                class="text-white/60 text-xs md:text-sm lg:text-base font-['Manrope',sans-serif] font-light leading-[1.528] tracking-[0.32px] underline hover:text-white hover:opacity-80 transition-colors decoration-solid underline-offset-2"
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
