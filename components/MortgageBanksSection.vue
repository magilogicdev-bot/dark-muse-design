<template>
  <section class="w-full bg-[#2A2C38] py-12 md:py-16 lg:py-20 xl:py-24">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Title -->
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase tracking-wider mb-8 md:mb-12 lg:mb-16">
        ИПОТЕКА
      </h2>

      <!-- Bank Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(bank, index) in banks"
          :key="index"
          class="bg-gradient-to-br from-white/5 to-gray-800/80 rounded-lg md:rounded-xl p-3 md:p-4 relative border border-white hover:border-white/80 transition-colors"
        >
          <!-- External Link Icon (Top Right) -->
          <a
            :href="bank.link"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6"
            aria-label="Открыть сайт банка"
          >
            <NuxtImg
              src="/images/arrow-6.webp"
              alt="Открыть ссылку"
              class="w-full h-full object-contain"
            />
          </a>

          <!-- Bank Name and Reference -->
          <div class="mb-3 md:mb-4">
            <h3 class="text-white text-sm md:text-base font-medium uppercase mb-1">
              {{ bank.name }}
            </h3>
            <p class="text-white text-xs md:text-sm">
              {{ bank.reference }}
            </p>
          </div>

          <!-- Full Cost of Credit -->
          <div class="mb-2 md:mb-3">
            <p class="text-white text-xs md:text-sm mb-1">Полная стоимость кредита</p>
            <p class="text-white text-base md:text-lg font-semibold">
              {{ bank.fullCost }}
            </p>
          </div>

          <!-- Rate -->
          <div class="mb-3 md:mb-4">
            <p class="text-white text-xs md:text-sm mb-1">Ставка</p>
            <p class="text-white text-lg md:text-xl font-bold">
              {{ bank.rate }}
            </p>
          </div>

          <!-- Bank Logo -->
          <div class="flex justify-end items-end mt-auto">
            <img
              :src="bank.figmaLogo || bank.logo"
              :alt="`Логотип ${bank.name}`"
              class="h-8 md:h-10 lg:h-12 w-auto object-contain"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const banks = ref([
  {
    name: 'ПАО СБЕРБАНК',
    reference: '№ 1481 от 11.08.2015',
    fullCost: 'От 21.8% до 22.1%',
    rate: 'От 6.0%',
    logo: '/images/banks/sberbank-logo.webp',
    // New logo: Group 133
    figmaLogo: '/images/group-133.webp',
    link: 'https://www.sberbank.ru'
  },
  {
    name: 'БАНК ВТБ (ПАО)',
    reference: '№ 1000 от 08.07.2015',
    fullCost: 'От 21.2% до 28.2%',
    rate: 'От 7.0%',
    logo: '/images/banks/vtb-logo.webp',
    // Swapped: Promsvyazbank logo (blue "E" shape)
    figmaLogo: '/images/design-1090-8364.webp',
    link: 'https://www.vtb.ru'
  },
  {
    name: 'АО «АЛЬФА-БАНК»',
    reference: '№ 1326 от 16.01.2015',
    fullCost: 'От 23.2% до 32.1%',
    rate: 'От 6.0%',
    logo: '/images/banks/alfabank-logo.webp',
    // Figma design: 5023:4 (Alfa Bank logo - red "A")
    figmaLogo: '/images/design-5023-4.webp',
    link: 'https://www.alfabank.ru'
  },
  {
    name: 'ПАО «ПРОМСВЯЗЬБАНК»',
    reference: '№ 3251 от 17.12.2014',
    fullCost: 'От 21.5% до 31.5%',
    rate: 'От 5.9%',
    logo: '/images/banks/promsvyazbank-logo.webp',
    // Swapped: VTB logo (Abstract icon - two interlocking shapes)
    figmaLogo: '/images/design-5023-5.webp',
    link: 'https://www.psbank.ru'
  }
])

// Feature icons from Figma
const featureIcons = {
  checkmarkGradient: '/images/design-1090-8354.webp', // Checkmark with gradient circle
  checkmarkGreen: '/images/design-1090-8355.webp' // Green checkmark
}

const handleImageError = (event) => {
  // Fallback to placeholder if image fails to load
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50"%3E%3Crect fill="%23333" width="100" height="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="10" fill="%23999"%3EЛоготип%3C/text%3E%3C/svg%3E'
}
</script>
