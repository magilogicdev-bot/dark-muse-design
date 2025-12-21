<template>
  <div class="fixed right-4 md:right-6 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 md:gap-2.5">
    <!-- WhatsApp Button -->
    <button
      @click="handleWhatsApp"
      class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center bg-transparent rounded-full hover:opacity-90 transition-opacity"
      aria-label="WhatsApp"
    >
      <NuxtImg
        src="/images/icons/whatsapp.webp"
        alt="WhatsApp"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
    
    <!-- Telegram Button (Paper Plane) -->
    <button
      @click="handleTelegram"
      class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center bg-transparent rounded-full hover:opacity-90 transition-opacity"
      aria-label="Telegram"
    >
      <NuxtImg
        src="/images/icons/telegram.webp"
        alt="Telegram"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
    
    <!-- Phone Button -->
    <button
      @click="handlePhone"
      class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center bg-transparent rounded-full hover:opacity-90 transition-opacity"
      aria-label="Позвонить"
    >
      <NuxtImg
        src="/images/icons/phone-handset.webp"
        alt="Позвонить"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
    
    <!-- Chevron Down Button -->
    <button
      @click="handleScrollDown"
      class="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center bg-transparent rounded-full hover:opacity-90 transition-opacity"
      aria-label="Прокрутить вниз"
    >
      <NuxtImg
        src="/images/icons/chevron-down.webp"
        alt="Прокрутить вниз"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
  </div>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const handleWhatsApp = () => {
  if (typeof window !== 'undefined' && siteConfig.contacts.social.whatsapp) {
    window.open(siteConfig.contacts.social.whatsapp, '_blank')
  }
}

const handleTelegram = () => {
  if (typeof window !== 'undefined' && siteConfig.contacts.social.telegram) {
    window.open(siteConfig.contacts.social.telegram, '_blank')
  }
}

const handlePhone = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `tel:${siteConfig.contacts.phone.formatted}`
  }
}

const handleScrollDown = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }
}
</script>
