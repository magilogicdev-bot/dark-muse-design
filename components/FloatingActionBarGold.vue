<template>
  <div class="floating-action-bar-container">
    <!-- Action Buttons (показываются при isOpen) -->
    <Transition name="menu-fade">
      <div v-show="isOpen" class="flex flex-col gap-2 md:gap-3">
        <!-- Phone Button (First) -->
        <button
          @click="handlePhone"
          class="floating-action-bar__button"
          aria-label="Позвонить"
        >
          <NuxtImg
            src="/images/icons/phone-handset.webp"
            alt="Позвонить"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </button>
        
        <!-- Telegram Button (Paper Plane) -->
        <button
          @click="handleTelegram"
          class="floating-action-bar__button"
          aria-label="Telegram"
        >
          <NuxtImg
            src="/images/icons/telegram.webp"
            alt="Telegram"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </button>
        
        <!-- WhatsApp Button -->
        <button
          @click="handleWhatsApp"
          class="floating-action-bar__button"
          aria-label="WhatsApp"
        >
          <NuxtImg
            src="/images/icons/whatsapp.webp"
            alt="WhatsApp"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </button>
      </div>
    </Transition>
    
    <!-- Toggle Button (внизу) -->
    <button
      @click="toggleMenu"
      class="floating-action-bar-toggle"
      :class="{ 'floating-action-bar-toggle--open': isOpen }"
      :aria-label="isOpen ? 'Скрыть меню' : 'Показать меню'"
    >
      <NuxtImg
        src="/images/icons/chevron-down.webp"
        alt="Меню"
        class="w-full h-full object-contain transition-transform duration-300"
        loading="lazy"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteConfig } from '~/config/contacts'

const config = siteConfig
const isOpen = ref(true) // По умолчанию открыто

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

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

<style scoped>
.floating-action-bar-container {
  position: fixed;
  bottom: clamp(24px, 2vw, 32px);
  right: clamp(24px, 2vw, 32px);
  z-index: 40;
  display: none;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(12px, 1.5vh, 20px);
  pointer-events: auto;
}

@media (min-width: 1024px) {
  .floating-action-bar-container {
    display: flex;
  }
}

.floating-action-bar__button {
  width: clamp(48px, 4vw, 64px);
  height: clamp(48px, 4vw, 64px);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  outline: none;
}

.floating-action-bar__button:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.floating-action-bar__button:active {
  transform: scale(0.95);
}

.floating-action-bar-toggle {
  width: clamp(48px, 4vw, 64px);
  height: clamp(48px, 4vw, 64px);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  outline: none;
  flex-shrink: 0;
}

.floating-action-bar-toggle--open {
  transform: rotate(180deg);
}

.floating-action-bar-toggle:hover {
  opacity: 0.9;
}

.floating-action-bar-toggle--open:hover {
  transform: rotate(180deg) scale(1.05);
}

.floating-action-bar-toggle:not(.floating-action-bar-toggle--open):hover {
  transform: scale(1.05);
}

.floating-action-bar-toggle:active {
  transform: scale(0.95);
}

.floating-action-bar-toggle--open:active {
  transform: rotate(180deg) scale(0.95);
}

/* Анимация появления/скрытия меню */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 1024px) {
  .floating-action-bar-container {
    bottom: clamp(16px, 2vw, 24px);
    right: clamp(16px, 2vw, 24px);
    gap: clamp(10px, 1.5vh, 16px);
  }

  .floating-action-bar__button {
    width: clamp(44px, 4vw, 56px);
    height: clamp(44px, 4vw, 56px);
  }

  .floating-action-bar-toggle {
    width: clamp(44px, 4vw, 56px);
    height: clamp(44px, 4vw, 56px);
  }
}

@media (max-width: 640px) {
  .floating-action-bar-container {
    bottom: clamp(12px, 2vw, 20px);
    right: clamp(12px, 2vw, 20px);
    gap: clamp(8px, 1.5vh, 12px);
  }

  .floating-action-bar__button {
    width: clamp(40px, 4vw, 52px);
    height: clamp(40px, 4vw, 52px);
  }

  .floating-action-bar-toggle {
    width: clamp(40px, 4vw, 52px);
    height: clamp(40px, 4vw, 52px);
  }
}
</style>
