<template>
  <div class="contacts-page relative">
    <!-- Main Section -->
    <section class="relative min-h-[calc(100vh-200px)]">
      <!-- Container for proper alignment with header/footer -->
      <div class="container mx-auto max-w-[1920px] relative">
        <div class="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] 2xl:grid-cols-[500px_1fr] min-h-[calc(100vh-200px)]">
          
          <!-- Left Column: Contact Info -->
          <div class="relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 lg:py-10 xl:py-12 flex flex-col">
            <div class="flex flex-col gap-4 lg:gap-5 xl:gap-6">
              <!-- Title -->
              <h1 class="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] 2xl:text-[64px] font-semibold tracking-tight leading-none text-white">
                КОНТАКТЫ
              </h1>
              
              <!-- Address -->
              <p class="text-sm sm:text-[15px] lg:text-base leading-relaxed text-white/70" style="font-family: 'Manrope', sans-serif">
                г. Ярославль, пл. Труда, д. 1, <br />
                Бизнес-центр Towers, офис 605
              </p>

              <!-- Building Photo -->
              <div class="overflow-hidden border border-white/10 max-w-[240px] lg:max-w-[260px] xl:max-w-[280px]">
                <img
                  src="/images/contacts/building-photo.png"
                  alt="Офис Pobedonoscev Group"
                  class="w-full h-auto aspect-[4/3] object-cover"
                />
              </div>

              <!-- Working Hours -->
              <div class="space-y-0.5 text-white/90">
                <p class="text-[11px] uppercase tracking-[0.15em] text-white/50" style="font-family: 'Manrope', sans-serif">Время работы отдела продаж:</p>
                <p class="text-sm lg:text-base" style="font-family: 'Manrope', sans-serif">Сегодня с 09:00 до 18:00</p>
              </div>

              <!-- Phone Numbers -->
              <div class="space-y-1.5 lg:space-y-2">
                <div
                  v-for="contact in contacts"
                  :key="contact.phone"
                  class="flex items-baseline gap-2"
                >
                  <a
                    class="text-lg sm:text-xl lg:text-[22px] font-medium tracking-tight hover:text-white/80 transition-colors text-white"
                    :href="`tel:${contact.href}`"
                    style="font-family: 'Manrope', sans-serif"
                  >
                    {{ contact.phone }}
                  </a>
                  <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-white/40" style="font-family: 'Manrope', sans-serif">– {{ contact.label }}</span>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="pt-2">
                <button
                  class="border border-white/50 text-white rounded-full px-5 py-2 text-sm font-normal tracking-[0.03em] hover:bg-white hover:text-primary transition-all duration-300"
                  type="button"
                  style="font-family: 'Manrope', sans-serif"
                >
                  Оставить заявку
                </button>
              </div>

              <!-- Disclaimer -->
              <p class="text-[11px] sm:text-xs text-white/40 leading-relaxed max-w-xs" style="font-family: 'Manrope', sans-serif">
                Мы работаем только с лидерами страхового рынка. Гарантируем прозрачные условия и официальные полисы.
              </p>
            </div>
          </div>

          <!-- Right Column: Map Area -->
          <div class="relative overflow-hidden min-h-[400px] lg:min-h-0">
            <!-- Map Image -->
            <div class="absolute inset-0">
              <img 
                src="/images/contacts/map-iso.png" 
                alt="Схема расположения объектов" 
                class="w-full h-full object-cover object-center"
              />
            </div>

            <!-- Map Labels -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- Street Labels -->
              <p class="map-label absolute text-xs sm:text-sm lg:text-[15px] font-medium text-white/90 left-[8%] sm:left-[15%] top-[6%] sm:top-[8%] tracking-wide">
                улица машиностроителей
              </p>
              <p class="map-label absolute text-xs sm:text-sm lg:text-[15px] font-medium text-white/90 right-[3%] sm:right-[8%] top-[10%] sm:top-[12%] tracking-wide hidden sm:block">
                улица машиностроителей
              </p>
              
              

              <p class="map-label absolute text-xs sm:text-sm lg:text-[15px] font-medium text-white/80 left-[12%] sm:left-[18%] top-[40%] sm:top-[38%] tracking-wide">
                тц Глобус
              </p>
              
              <p class="map-label absolute text-xs sm:text-sm lg:text-[15px] font-medium text-white/80 left-[18%] sm:left-[25%] top-[58%] sm:top-[55%] tracking-wide">
                поликлиника
              </p>
              
              <p class="map-label absolute text-xs sm:text-sm lg:text-[15px] font-medium text-white/80 left-[12%] sm:left-[18%] bottom-[12%] sm:bottom-[15%] tracking-wide">
                школа Красного Бора
              </p>
            </div>

            <!-- Gradient Overlay Left -->
            <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/50 to-transparent pointer-events-none w-1/4 lg:w-1/5"></div>

            <!-- Side Navigation Icons (Desktop) - 4 buttons per Figma -->
            <div class="hidden lg:flex absolute right-4 xl:right-6 2xl:right-8 top-1/2 -translate-y-1/2 flex-col gap-2 xl:gap-3">
              <button class="w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full border-[3px] border-white bg-primary flex items-center justify-center transition-transform hover:scale-105 overflow-hidden">
                <img src="/images/contacts/icon-1.png" alt="" class="w-full h-full object-cover rounded-full" />
              </button>
              <button class="w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full border-[3px] border-white bg-primary flex items-center justify-center transition-transform hover:scale-105 overflow-hidden">
                <img src="/images/contacts/icon-2.png" alt="" class="w-full h-full object-cover rounded-full" />
              </button>
              <button class="w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full border-[3px] border-white bg-primary flex items-center justify-center transition-transform hover:scale-105 overflow-hidden">
                <img src="/images/contacts/icon-3.png" alt="" class="w-full h-full object-cover rounded-full" />
              </button>
              <button class="w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full border-[3px] border-white bg-primary flex items-center justify-center transition-transform hover:scale-105 overflow-hidden">
                <img src="/images/contacts/icon-4.png" alt="" class="w-full h-full object-cover rounded-full" />
              </button>
            </div>


            <!-- Social Icons Bottom Right -->
            <div class="absolute right-4 sm:right-6 lg:right-4 xl:right-6 2xl:right-8 bottom-4 sm:bottom-6 lg:bottom-6 flex items-center gap-2 sm:gap-3">
              <!-- VK -->
              <a
                :href="config.contacts.social.vk"
                class="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition hover:scale-105 relative"
                aria-label="VKontakte"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://www.figma.com/api/mcp/asset/54d0f66b-b601-41f4-aa21-e69f71bfa8c4" 
                  alt="" 
                  class="absolute inset-0 w-full h-full object-cover rounded-full"
                />
                <img 
                  src="https://www.figma.com/api/mcp/asset/91373bff-ac3b-4736-977d-166869d00832" 
                  alt="VK" 
                  class="relative z-10 w-[40%] h-[40%] object-contain"
                />
              </a>
              <!-- Telegram -->
              <a
                :href="config.contacts.social.telegram"
                class="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition hover:scale-105 relative"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://www.figma.com/api/mcp/asset/3256f975-f004-4f9d-86a3-5eb85f9d85fb" 
                  alt="" 
                  class="absolute inset-0 w-full h-full object-cover rounded-full"
                />
                <img 
                  src="https://www.figma.com/api/mcp/asset/3c609572-383a-4756-896c-c4a192efdaba" 
                  alt="Telegram" 
                  class="relative z-10 w-[40%] h-[40%] object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const config = siteConfig

const contacts = [
  { phone: '+7 (910) 973–00–99', href: '+79109730099', label: 'ОТДЕЛ ПРОДАЖ' },
  { phone: '+7 (980) 650–74–63', href: '+79806507463', label: 'РЕКЛАМА' },
  { phone: '+7 (980) 708–16–49', href: '+79807081649', label: 'СНАБЖЕНИЕ' },
  { phone: '+7 (910) 973–33–73', href: '+79109733373', label: 'БУХГАЛТЕРИЯ' }
]
</script>

<style scoped>
.contacts-page {
  font-family: 'Inter', sans-serif;
}

.map-label {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5);
}

/* Mobile: stack map on top */
@media (max-width: 1023px) {
  .contacts-page section > div > div {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
