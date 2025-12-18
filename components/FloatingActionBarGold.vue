<template>
  <div class="fixed right-4 md:right-6 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 md:gap-3">
    <!-- Phone Button (First) -->
    <button
      @click="handlePhone"
      class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-transparent transition-all duration-300 hover:opacity-90 overflow-visible"
      aria-label="Позвонить"
    >
      <NuxtImg
        src="/images/icons/phone-handset.png"
        alt="Позвонить"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
    
    <!-- Telegram Button (Paper Plane) -->
    <button
      @click="handleTelegram"
      class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-transparent transition-all duration-300 hover:opacity-90 overflow-visible"
      aria-label="Telegram"
    >
      <NuxtImg
        src="/images/icons/telegram.png"
        alt="Telegram"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
    
    <!-- WhatsApp Button -->
    <button
      @click="handleWhatsApp"
      class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-transparent transition-all duration-300 hover:opacity-90 overflow-visible"
      aria-label="WhatsApp"
    >
      <NuxtImg
        src="/images/icons/whatsapp.png"
        alt="WhatsApp"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
    
    <!-- Chevron Down Button -->
    <button
      @click="handleScrollDown"
      class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-transparent transition-all duration-300 hover:opacity-90 overflow-visible"
      aria-label="Прокрутить вниз"
    >
      <NuxtImg
        src="/images/icons/chevron-down.png"
        alt="Прокрутить вниз"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
  </div>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const config = siteConfig

const handlePhone = () => {
  window.location.href = 'tel:' + config.contacts.phone.formatted
}

const handleTelegram = () => {
  window.open(config.contacts.social.telegram || 'https://t.me/pobedonoscev', '_blank')
}

const handleWhatsApp = () => {
  window.open('https://wa.me/' + config.contacts.phone.formatted.replace(/[^0-9]/g, ''), '_blank')
}

const handleScrollDown = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }
}
</script>
