<template>
  <div class="action-menu-container">
    <!-- Меню кнопок (показывается при isOpen, по умолчанию открыто) -->
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
    <!-- Кнопка скрытия/открытия (внизу) -->
    <button
      @click="toggleMenu"
      class="action-menu-toggle"
      :class="{ 'action-menu-toggle--open': isOpen }"
      :aria-label="isOpen ? 'Скрыть меню' : 'Показать меню'"
    >
      <NuxtImg
        src="/images/icons/scroll-to-top.webp"
        alt="Меню"
        class="w-full h-full object-contain"
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
  right: clamp(24px, 2vw, 32px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(12px, 1.5vh, 20px);
  pointer-events: auto;
}

.action-menu {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vh, 20px);
  align-items: center;
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

.action-menu-toggle {
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

.action-menu-toggle--open {
  transform: rotate(180deg);
}

.action-menu-toggle:hover {
  opacity: 0.9;
}

.action-menu-toggle--open:hover {
  transform: rotate(180deg) scale(1.05);
}

.action-menu-toggle:not(.action-menu-toggle--open):hover {
  transform: scale(1.05);
}

.action-menu-toggle:active {
  transform: scale(0.95);
}

.action-menu-toggle--open:active {
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

  .action-menu-toggle {
    width: clamp(44px, 4vw, 56px);
    height: clamp(44px, 4vw, 56px);
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

  .action-menu-toggle {
    width: clamp(40px, 4vw, 52px);
    height: clamp(40px, 4vw, 52px);
  }
}
</style>

