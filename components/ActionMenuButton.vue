<template>
  <div class="action-menu-container">
    <!-- Меню кнопок (показывается при isOpen) -->
    <Transition name="menu-fade">
      <div v-show="isOpen" class="action-menu">
        <button
          @click="handleWhatsApp"
          class="action-menu__button"
          aria-label="WhatsApp"
        >
          <img
            src="/images/menu-icons/menu-icon-1.webp"
            alt="WhatsApp"
            class="action-menu__button-icon"
          />
        </button>
        <button
          @click="handleTelegram"
          class="action-menu__button"
          aria-label="Telegram"
        >
          <img
            src="/images/menu-icons/menu-icon-2.webp"
            alt="Telegram"
            class="action-menu__button-icon"
          />
        </button>
        <button
          @click="handlePhone"
          class="action-menu__button"
          aria-label="Позвонить"
        >
          <img
            src="/images/menu-icons/menu-icon-3.webp"
            alt="Позвонить"
            class="action-menu__button-icon"
          />
        </button>
      </div>
    </Transition>

    <!-- Основная кнопка МЕНЮ (триггер) -->
    <button
      @click="toggleMenu"
      class="action-menu__toggle"
      :class="{ 'action-menu__toggle--active': isOpen }"
      aria-label="Открыть меню контактов"
    >
      <NuxtImg
        src="/images/icons/scroll-to-top.webp"
        alt="Меню"
        class="action-menu__toggle-icon"
        format="webp"
        loading="lazy"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteConfig } from '~/config/contacts'

const config = siteConfig
const isOpen = ref(false) // По умолчанию скрыто

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleWhatsApp = () => {
  if (typeof window !== 'undefined' && config.contacts.social.whatsapp) {
    window.open(config.contacts.social.whatsapp, '_blank')
  }
}

const handleTelegram = () => {
  if (typeof window !== 'undefined' && config.contacts.social.telegram) {
    window.open(config.contacts.social.telegram, '_blank')
  }
}

const handlePhone = () => {
  if (typeof window !== 'undefined') {
    const phoneHref = 'tel:' + config.contacts.phone.formatted
    window.location.href = phoneHref
  }
}
</script>

<style scoped>
.action-menu-container {
  position: fixed;
  bottom: clamp(24px, 2vw, 32px);
  right: clamp(40px, 5vw, 80px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none; /* Let clicks pass through container gaps */
}

@media (max-width: 1024px) {
  .action-menu-container {
    display: none !important;
  }
}

.action-menu {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vw, 20px);
  align-items: center;
  margin-bottom: clamp(12px, 1.5vw, 20px); /* Gap between menu and button */
  pointer-events: auto;
}

.action-menu__button {
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

.action-menu__button:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.action-menu__button:active {
  transform: scale(0.95);
}

.action-menu__button-icon {
  display: block;
  width: clamp(40px, 4vw, 64px);
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

.action-menu__toggle {
  width: clamp(40px, 4vw, 40px);
  height: clamp(40px, 4vw, 40px);
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
  pointer-events: auto;
}

@media (min-width: 1025px) {
  .action-menu__toggle {
    width: 64px;
    height: 64px;
  }
}

.action-menu__toggle:hover {
  transform: scale(1.1);
}

.action-menu__toggle--active {
  transform: rotate(180deg);
}

.action-menu__toggle--active:hover {
  transform: rotate(180deg) scale(1.1);
}

.action-menu__toggle-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Анимация появления/скрытия меню - "вылетание" из кнопки */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.5);
}

@media (max-width: 1024px) {
  .action-menu-container {
    bottom: clamp(16px, 2vw, 24px);
    right: clamp(16px, 2vw, 24px);
    gap: clamp(10px, 1.5vh, 16px);
  }

  .action-menu {
    gap: clamp(10px, 1.5vh, 16px);
  }

  .action-menu__button-icon {
    width: clamp(36px, 5vw, 56px);
  }
}

@media (max-width: 640px) {
  .action-menu-container {
    bottom: clamp(12px, 2vw, 20px);
    right: clamp(12px, 2vw, 20px);
    gap: clamp(8px, 1.5vh, 12px);
  }

  .action-menu {
    gap: clamp(8px, 1.5vh, 12px);
  }

  .action-menu__button-icon {
    width: clamp(32px, 5vw, 48px);
  }
}
</style>
