<template>
  <header ref="headerEl" class="header" :class="{ 'header--menu-open': isMenuOpen }">
    <!-- Top ribbon -->
    <div ref="headerBarEl" class="header__bar">
      <div class="container mx-auto max-w-[1920px] flex items-center justify-between gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-6 xl:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-4 2xl:py-5 w-full min-w-0 overflow-hidden">
        <div class="header__left">
          <button
            @click="toggleMenu"
            class="header__menu-btn"
            :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
            :aria-expanded="isMenuOpen"
            aria-controls="site-menu"
          >
            <span class="header__burger" :class="{ 'header__burger--open': isMenuOpen }" aria-hidden="true">
              <span class="header__burger-line"></span>
              <span class="header__burger-line"></span>
            </span>
            <span class="header__menu-text">МЕНЮ</span>
          </button>

          <NuxtLink
            :to="config.navigation.buyApartment"
            class="header__nav-link header__nav-link--desktop"
          >
            КУПИТЬ КВАРТИРУ
          </NuxtLink>
        </div>

        <div class="header__center">
          <NuxtLink to="/" class="header__logo" :class="{ 'header__logo--hidden': isHomePage }">
            <NuxtImg src="/images/logo.webp" alt="Pobedonoscev" class="header__logo-img" />
          </NuxtLink>
        </div>

        <div class="header__right">
          <NuxtLink to="/favorites" class="header__favorites header__nav-link--desktop">
            <span class="header__favorites-count">5</span>
            <svg class="header__heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </NuxtLink>

          <a
            :href="config.navigation.getPresentation"
            class="header__nav-link header__nav-link--desktop header__presentation"
          >
            ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
          </a>

          <a
            :href="phoneHref"
            class="header__phone header__nav-link--desktop"
          >
            {{ config.contacts.phone.primary }}
          </a>

          <!-- Close Button for Favorites Page -->
          <NuxtLink
            v-if="isFavoritesPage"
            to="/"
            class="header__close-btn"
            aria-label="Закрыть"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </NuxtLink>

          <button
            @click="toggleMenu"
            class="header__mobile-btn"
            :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
            :aria-expanded="isMenuOpen"
            aria-controls="site-menu"
          >
            <span class="header__burger" :class="{ 'header__burger--open': isMenuOpen }" aria-hidden="true">
              <span class="header__burger-line"></span>
              <span class="header__burger-line"></span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Compact Dropdown Menu -->
    <Transition name="dropdown-slide" @after-enter="onMenuEnter">
      <div
        v-if="isMenuOpen"
        id="site-menu"
        class="dropdown-menu"
        @mouseleave="closeMenu"
      >
        <!-- Decorative Rail Lines -->
        <div class="dropdown-menu__rail-lines">
          <div class="dropdown-menu__rail-line dropdown-menu__rail-line--accent"></div>
          <div class="dropdown-menu__rail-line"></div>
        </div>
        
        <!-- Navigation Links with staggered animation -->
        <nav class="dropdown-menu__nav">
          <NuxtLink
            v-for="(item, index) in menuItems"
            :key="item.label"
            :to="item.to"
            class="dropdown-menu__link"
            :class="{ 'dropdown-menu__link--visible': menuItemsVisible }"
            :style="{ transitionDelay: `${index * 80}ms` }"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>

    <!-- 3D Model Viewer Modal -->
    <Model3DViewer
      v-if="is3DViewerOpen"
      :is-open="is3DViewerOpen"
      model-path="/models/4.gltf"
      @close="close3DViewer"
    />
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch, computed } from 'vue'
import { useMenu } from '~/composables/useMenu'
import { siteConfig } from '~/config/contacts'
import { useRoute } from 'vue-router'

const { isMenuOpen, toggleMenu, closeMenu } = useMenu()
const config = siteConfig
const route = useRoute()

const headerEl = ref(null)
const headerBarEl = ref(null)
const is3DViewerOpen = ref(false)
const menuItemsVisible = ref(false)

// Trigger staggered animation after menu panel appears
const onMenuEnter = () => {
  menuItemsVisible.value = true
}

// Check if we're on the favorites page
const isFavoritesPage = computed(() => route.path === '/favorites')

// Check if we're on the home page
const isHomePage = computed(() => route.path === '/')

// Computed для телефонных ссылок
const phoneHref = 'tel:' + config.contacts.phone.formatted

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

watch(isMenuOpen, (open) => {
  if (typeof window === 'undefined') return

  if (open) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
    // Reset menu items visibility for next animation
    menuItemsVisible.value = false
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
  }
})

const updateHeaderBarHeight = () => {
  if (typeof window === 'undefined') return
  if (!headerEl.value || !headerBarEl.value) return

  const height = headerBarEl.value.getBoundingClientRect().height
  const heightPx = `${Math.round(height)}px`
  headerEl.value.style.setProperty('--header-bar-height', heightPx)
  // Also set on :root for global access
  document.documentElement.style.setProperty('--header-bar-height', heightPx)
}

let headerResizeObserver

onMounted(() => {
  updateHeaderBarHeight()

  if (typeof ResizeObserver !== 'undefined' && headerBarEl.value) {
    headerResizeObserver = new ResizeObserver(() => updateHeaderBarHeight())
    headerResizeObserver.observe(headerBarEl.value)
    return
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateHeaderBarHeight)
  }
})

onBeforeUnmount(() => {
  if (headerResizeObserver) {
    headerResizeObserver.disconnect()
    headerResizeObserver = undefined
    return
  }

  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateHeaderBarHeight)
  }
})

// Menu items
const menuItems = [
  { label: 'КОМПАНИЯ', to: '/about' },
  { label: 'ПРОЕКТЫ', to: '/apartment-selection' },
  { label: 'ВЫБОР КВАРТИРЫ', to: '/buy-apartment' },
  { label: 'ИПОТЕКА', to: '/mortgage' },
  { label: 'КОНТАКТЫ', to: '/contacts' },
  { label: 'НОВОСТИ', to: '/news' },
]

// Handle 3D button click
const handle3DButtonClick = () => {
  console.log('Кнопка 3D модели нажата')
  is3DViewerOpen.value = true
  console.log('is3DViewerOpen установлен в:', is3DViewerOpen.value)
  closeMenu()
}

const close3DViewer = () => {
  console.log('Закрытие 3D просмотра')
  is3DViewerOpen.value = false
}

// Handle action buttons
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
    window.location.href = phoneHref
  }
}

const handleScrollDown = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    closeMenu()
  }
}

const handleAudioClick = () => {
  // Обработка клика на кнопку аудио
  console.log('Аудио открыто')
  // Здесь можно добавить логику открытия аудио
}

const handleVideoClick = () => {
  // Обработка клика на кнопку видео
  console.log('Видео открыто')
  // Здесь можно добавить логику открытия видео
  // Например: window.open('/video', '_blank')
  // Или: showVideoModal.value = true
}
</script>

<style scoped>
/* Base Header Styles */
.header {
  --header-bar-height: 0px;
  --menu-padding-top: clamp(72px, 16vh, 220px);
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  color: #fff;
}



.header__bar {
  position: relative;
  z-index: 250;
  background: #2a2c38;
  border-bottom: none;
  width: 100%;
  height: 36px;
  display: flex;
  align-items: stretch;
}

/* Left Section */
.header__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

@media (min-width: 640px) {
  .header__left {
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .header__left {
    gap: 1.5rem;
  }
}

@media (min-width: 1440px) {
  .header__left {
    gap: 2rem;
  }
}

.header__menu-btn {
  display: inline-flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: clamp(4px, 0.5vw, 6px) 0;
  color: inherit;
  transition: opacity 0.3s ease, transform 0.3s ease;
  flex-shrink: 0;
}

.header__menu-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.header__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(5px, 0.7vw, 12px);
  width: clamp(20px, 1.8vw, 38px);
  height: clamp(12px, 1.2vw, 18px);
  flex-shrink: 0;
  position: relative;
}

.header__burger-line {
  display: block;
  height: 1.5px;
  width: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%);
  border-radius: 1.5px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header__burger:hover .header__burger-line {
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(248, 181, 67, 0.8) 100%);
  box-shadow: 0 2px 4px rgba(248, 181, 67, 0.3);
}

.header__burger--open .header__burger-line {
  background: linear-gradient(90deg, rgba(248, 181, 67, 1) 0%, rgba(248, 181, 67, 0.9) 100%);
  box-shadow: 0 2px 6px rgba(248, 181, 67, 0.4);
}

.header__burger--open .header__burger-line:nth-child(1) {
  transform: translateY(clamp(4px, 0.45vw, 6px)) rotate(45deg) scaleX(1);
}

.header__burger--open .header__burger-line:nth-child(2) {
  transform: translateY(calc(clamp(4px, 0.45vw, 6px) * -1)) rotate(-45deg) scaleX(1);
}

.header__menu-text {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(8px, 0.8vw, 12px);
  font-weight: 200;
  letter-spacing: -0.02em;
  color: #fff;
  text-transform: uppercase;
}

@media (min-width: 1280px) {
  .header__menu-text {
    font-size: clamp(10px, 1vw, 14px);
  }
}

.header__nav-link {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(8px, 0.8vw, 12px);
  font-weight: 200;
  letter-spacing: -0.02em;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.3s ease, color 0.3s ease;
  white-space: nowrap;
}

@media (min-width: 1280px) {
  .header__nav-link {
    font-size: clamp(10px, 1vw, 14px);
  }
}

.header__nav-link:hover {
  opacity: 0.85;
  color: #f8b543;
}

/* Center Section */
.header__center {
  flex: 0 0 auto;
  min-width: 0;
  text-align: center;
}

@media (min-width: 1024px) {
  .header__center {
    text-align: left;
  }
}

.header__logo {
  display: inline-block;
  text-decoration: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.header__logo--hidden {
  opacity: 0;
  pointer-events: none;
}

.header__logo:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.header__logo-img {
  width: clamp(140px, 12vw, 190px);
  height: auto;
  display: block;
  object-fit: contain;
}

/* Right Section */
.header__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

@media (min-width: 640px) {
  .header__right {
    gap: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .header__right {
    gap: 1rem;
  }
}

@media (min-width: 1280px) {
  .header__right {
    gap: 1.5rem;
  }
}

@media (min-width: 1440px) {
  .header__right {
    gap: 2rem;
  }
}

.header__favorites {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.header__favorites:hover {
  opacity: 0.85;
}

.header__favorites-count {
  font-family: 'Inter', sans-serif;
  font-size: clamp(8px, 0.8vw, 10px);
  font-weight: 300;
  color: #fff;
  flex-shrink: 0;
}

.header__heart-icon {
  width: clamp(14px, 1.2vw, 16px);
  height: clamp(14px, 1.2vw, 16px);
  color: #fff;
  flex-shrink: 0;
}

.header__presentation {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 8px);
  flex-shrink: 0;
}

.header__phone {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(7px, 0.7vw, 11px);
  font-weight: 200;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .header__phone {
    font-size: clamp(8px, 0.8vw, 12px);
  }
}

@media (min-width: 1440px) {
  .header__phone {
    font-size: clamp(10px, 0.9vw, 14px);
  }
}

.header__phone:hover {
  opacity: 0.8;
}

.header__mobile-btn {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 44px;
  height: 44px;
  min-width: 44px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s ease, background 0.2s ease;
  flex-shrink: 0;
}

.header__mobile-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.12);
}

.header__mobile-btn .header__burger-line {
  width: 24px;
}

/* Compact Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 16px;
  z-index: 240;
  background: #2a2c38;
  border-radius: 0 0 20px 20px;
  padding: 24px 32px 32px 24px;
  display: flex;
  gap: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 4px 16px rgba(0, 0, 0, 0.2);
  transform-origin: top left;
}

@media (min-width: 640px) {
  .dropdown-menu {
    left: 24px;
    padding: 28px 40px 36px 28px;
  }
}

@media (min-width: 1024px) {
  .dropdown-menu {
    left: 48px;
    padding: 32px 48px 40px 32px;
  }
}

@media (min-width: 1440px) {
  .dropdown-menu {
    left: 80px;
  }
}

/* Rail Lines */
.dropdown-menu__rail-lines {
  display: flex;
  gap: 4px;
  padding-top: 8px;
  flex-shrink: 0;
}

.dropdown-menu__rail-line {
  width: 1px;
  height: 100%;
  min-height: 280px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 0.6) 85%,
    rgba(255, 255, 255, 0) 100%
  );
}

.dropdown-menu__rail-line--accent {
  width: 1px;
  background: linear-gradient(
    180deg,
    rgba(212, 149, 45, 0) 0%,
    rgba(212, 149, 45, 0.7) 15%,
    rgba(212, 149, 45, 0.7) 85%,
    rgba(212, 149, 45, 0) 100%
  );
}

/* Navigation */
.dropdown-menu__nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 16px;
}

@media (min-width: 640px) {
  .dropdown-menu__nav {
    gap: 28px;
    padding-left: 20px;
  }
}

@media (min-width: 1024px) {
  .dropdown-menu__nav {
    gap: 32px;
    padding-left: 24px;
  }
}

.dropdown-menu__link {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.02em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  display: block;
  /* Initial state - hidden */
  opacity: 0;
  transform: translateX(-15px);
  transition: opacity 0.4s ease, transform 0.4s ease, color 0.3s ease;
}

/* Visible state with staggered delay */
.dropdown-menu__link--visible {
  opacity: 1;
  transform: translateX(0);
}

@media (min-width: 640px) {
  .dropdown-menu__link {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .dropdown-menu__link {
    font-size: 22px;
  }
}

.dropdown-menu__link:hover {
  color: #d4952d;
  transform: translateX(6px);
}



/* Dropdown Slide Animation */
.dropdown-slide-enter-active {
  animation: dropdownSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.dropdown-slide-leave-active {
  animation: dropdownSlideOut 0.25s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}

@keyframes dropdownSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dropdownSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}

/* Fade Animation for Backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Background 3D Model - Pinned to bottom right */
.menu-background {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
  display: block;
  width: auto;
  height: auto;
}

.menu-background__image {
  display: block !important;
  width: auto;
  height: auto;
  max-width: 60vw;
  max-height: 70vh;
  min-width: 400px;
  min-height: 300px;
  object-fit: contain;
  object-position: bottom right;
  opacity: 1;
  visibility: visible;
}

/* 3D Icon Button */
.menu-3d-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(50% + clamp(120px, 12vw, 220px)), calc(-50% + clamp(100px, 12vh, 180px)));
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  pointer-events: auto;
  transition: transform 0.3s ease, opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  width: clamp(140px, 14vw, 180px);
  height: clamp(120px, 12vw, 155px);
}

.menu-3d-button:hover {
  opacity: 0.9;
  transform: translate(calc(50% + clamp(120px, 12vw, 220px)), calc(-50% + clamp(100px, 12vh, 180px))) scale(1.15);
}

.menu-3d-button:active {
  opacity: 0.8;
  transform: translate(calc(50% + clamp(120px, 12vw, 220px)), calc(-50% + clamp(100px, 12vh, 180px))) scale(1.05);
}

.menu-3d-button__icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* Vertical Action Buttons (Right Side) */
.menu-action-buttons {
  position: absolute;
  right: clamp(16px, 2vw, 40px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vh, 20px);
  pointer-events: auto;
}

.menu-action-button {
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

.menu-action-button:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.menu-action-button:active {
  transform: scale(0.95);
}

.menu-action-button__icon {
  display: block;
  width: clamp(40px, 4vw, 64px);
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

/* Bottom Right Buttons (Audio + Video) */
.menu-bottom-buttons {
  position: absolute;
  right: clamp(120px, 12vw, 200px);
  bottom: clamp(32px, 4vh, 64px);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 20px);
  pointer-events: auto;
}

.menu-audio-button {
  position: relative;
  width: clamp(40px, 4vw, 52px);
  height: clamp(40px, 4vw, 52px);
  border-radius: 50%;
  background: rgba(42, 44, 56, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  outline: none;
  flex-shrink: 0;
}

.menu-audio-button:hover {
  transform: scale(1.1);
  opacity: 0.9;
  background: rgba(42, 44, 56, 0.95);
  border-color: rgba(255, 255, 255, 0.5);
}

.menu-audio-button:active {
  transform: scale(0.95);
}

.menu-audio-button__icon {
  width: clamp(16px, 2vw, 22px);
  height: clamp(16px, 2vw, 22px);
  color: rgba(255, 255, 255, 0.9);
  display: block;
}

.menu-bottom-video-button {
  position: relative;
  padding: clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 18px);
  border-radius: clamp(20px, 2.5vw, 26px);
  background: rgba(42, 44, 56, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  outline: none;
  white-space: nowrap;
}

.menu-bottom-video-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
  background: rgba(42, 44, 56, 0.95);
  border-color: rgba(255, 255, 255, 0.5);
}

.menu-bottom-video-button:active {
  transform: scale(0.98);
}

.menu-bottom-video-button__play-icon {
  width: clamp(12px, 1.2vw, 15px);
  height: clamp(12px, 1.2vw, 15px);
  color: rgba(255, 255, 255, 0.9);
  display: block;
  flex-shrink: 0;
}

.menu-bottom-video-button__text {
  font-size: clamp(11px, 1.1vw, 14px);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  line-height: 1;
}

/* Video Button Container (Aligned with КОМПАНИЯ) */
.menu-video-container {
  position: absolute;
  top: clamp(60px, 8vh, 120px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 2vh, 24px);
  pointer-events: auto;
  margin-top: clamp(60px, 8vh, 120px);
}

/* Video Button */
.menu-video-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  outline: none;
  width: clamp(300px, 35vw, 427px);
  height: clamp(45px, 5.5vh, 55px);
  font-size: clamp(18px, 2vw, 20px);
  line-height: 1.2;
  color: rgba(255, 255, 255, 1);
}

.menu-video-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.menu-video-button:active {
  transform: scale(0.98);
}

.menu-video-button__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* Video Text Below Button (Image) */
.menu-video-text {
  position: absolute;
  left: 44px;
  top: 90px;
  display: block;
  width: auto;
  height: auto;
  max-width: clamp(200px, 25vw, 300px);
  max-height: clamp(50px, 6vh, 80px);
  object-fit: contain;
  margin: 0;
}

.menu {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1rem, 4vw, 3.75rem);
  padding-right: clamp(1rem, 4vw, 3.75rem);
  padding-top: var(--menu-padding-top);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
}


.menu__content {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  gap: clamp(12px, 2vw, 28px);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .menu__content {
    gap: clamp(14px, 2vw, 24px);
  }
}

@media (min-width: 768px) {
  .menu__content {
    gap: clamp(16px, 2vw, 26px);
  }
}

@media (min-width: 1024px) {
  .menu__content {
    gap: clamp(18px, 2vw, 28px);
  }
}

.menu__rail-lines {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin-top: clamp(-20px, -2vh, -10px);
}

.menu__rail-line {
  flex-shrink: 0;
  width: 1px;
  height: clamp(320px, 62vh, 820px);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.75) 35%,
    rgba(255, 255, 255, 0.75) 65%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.18);
  margin-top: clamp(8px, 1vh, 12px);
}

.menu__rail-line--left {
  width: 0.5px;
  background: linear-gradient(
    180deg,
    rgba(218, 165, 32, 0) 0%,
    rgba(218, 165, 32, 0.4) 35%,
    rgba(218, 165, 32, 0.4) 65%,
    rgba(218, 165, 32, 0) 100%
  );
  box-shadow: 0 0 8px rgba(218, 165, 32, 0.15);
  margin-top: 0;
}

.menu__nav {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 3vh, 32px);
  padding-top: 0;
}

.menu__link {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(16px, 1.2vw, 20px);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
  display: inline-block;
}

.menu__link:hover {
  opacity: 0.9;
  transform: translateX(8px);
  color: #f8b543;
}

.menu__mobile-links {
  display: none;
  flex-direction: column;
  gap: 24px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.menu__phone {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
}

.menu__presentation-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
}

/* Transition animations */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-active .menu__link {
  transition: opacity 0.3s ease, transform 0.4s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-fade-enter-from .menu__link {
  opacity: 0;
  transform: translateX(-20px);
}

/* Staggered animation for menu links */
.menu-fade-enter-active .menu__nav .menu__link:nth-child(1) { transition-delay: 0.05s; }
.menu-fade-enter-active .menu__nav .menu__link:nth-child(2) { transition-delay: 0.1s; }
.menu-fade-enter-active .menu__nav .menu__link:nth-child(3) { transition-delay: 0.15s; }
.menu-fade-enter-active .menu__nav .menu__link:nth-child(4) { transition-delay: 0.2s; }
.menu-fade-enter-active .menu__nav .menu__link:nth-child(5) { transition-delay: 0.25s; }
.menu-fade-enter-active .menu__nav .menu__link:nth-child(6) { transition-delay: 0.3s; }

/* Responsive Styles */

@media (max-width: 1200px) {
  .header__logo-img {
    width: clamp(130px, 11vw, 180px);
  }
}

@media (max-width: 1024px) {
  .header {
    --menu-padding-top: 44px;
  }

  .header__nav-link--desktop {
    display: none;
  }

  .header__menu-btn {
    display: none;
  }

  .header__mobile-btn {
    display: flex;
  }

  .header__left {
    flex: 0 0 auto;
  }

  .header__center {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    min-width: 0;
    text-align: center;
  }

  .header__right {
    flex: 0 0 auto;
  }
}

/* Уменьшаем номер телефона на средних экранах */
@media (min-width: 1025px) and (max-width: 1400px) {
  .header__phone {
    font-size: clamp(7px, 0.7vw, 10px);
  }
}

/* Скрываем номер телефона на узких десктопах, если не помещается */
@media (min-width: 1025px) and (max-width: 1200px) {
  .header__phone {
    display: none;
  }
}

@media (max-width: 1024px) {
  .menu__content {
    gap: clamp(16px, 3vw, 24px);
    grid-template-columns: auto 1fr;
  }

  .menu__rail-lines {
    margin-top: clamp(-15px, -1.5vh, -8px);
  }

  .menu__rail-line {
    height: clamp(260px, 46vh, 560px);
  }

  .menu__link {
    font-size: clamp(16px, 2vw, 18px);
    font-weight: 400;
    letter-spacing: 0.08em;
    color: #fff;
  }

  .menu__mobile-links {
    display: flex;
  }

  .menu {
    padding-top: 44px;
    padding-left: clamp(1rem, 3vw, 2rem);
    padding-right: clamp(1rem, 3vw, 2rem);
  }

  .menu-background__image {
    max-width: min(80vw, 1000px);
    max-height: min(85vh, 800px);
  }

  .menu-action-buttons {
    right: 16px;
    gap: 10px;
  }

  .menu-action-button__icon {
    width: clamp(36px, 5vw, 56px);
  }

  .menu-video-container {
    margin-top: clamp(40px, 6vh, 80px);
    gap: 12px;
  }

  .menu-video-button__image {
    max-width: clamp(180px, 28vw, 350px);
    max-height: clamp(35px, 4.5vh, 70px);
  }

  .menu-video-text {
    max-width: clamp(180px, 28vw, 280px);
    max-height: clamp(45px, 5.5vh, 70px);
  }

  .menu-3d-button {
    transform: translate(calc(50% + clamp(90px, 9vw, 180px)), calc(-50% + clamp(70px, 9vh, 140px)));
    width: clamp(120px, 12vw, 160px);
    height: clamp(100px, 11vw, 135px);
  }

  .menu-3d-button:hover {
    transform: translate(calc(50% + clamp(90px, 9vw, 180px)), calc(-50% + clamp(70px, 9vh, 140px))) scale(1.15);
  }

  .menu-3d-button:active {
    transform: translate(calc(50% + clamp(90px, 9vw, 180px)), calc(-50% + clamp(70px, 9vh, 140px))) scale(1.05);
  }
}

@media (max-width: 768px) {
  .header__logo-img {
    width: clamp(120px, 14vw, 170px);
  }

  .menu__content {
    gap: clamp(12px, 2.5vw, 18px);
  }

  .menu__nav {
    gap: clamp(16px, 2.5vh, 20px);
  }

  .menu__link {
    font-size: clamp(14px, 2vw, 16px);
  }

  .menu {
    padding-left: clamp(0.75rem, 4vw, 1.5rem);
    padding-right: clamp(0.75rem, 4vw, 1.5rem);
  }

  .menu-3d-button {
    transform: translate(calc(50% + clamp(60px, 7vw, 120px)), calc(-50% + clamp(50px, 7vh, 100px)));
    width: clamp(110px, 11vw, 160px);
    height: clamp(95px, 10vw, 135px);
  }

  .menu-3d-button:hover {
    transform: translate(calc(50% + clamp(60px, 7vw, 120px)), calc(-50% + clamp(50px, 7vh, 100px))) scale(1.15);
  }

  .menu-3d-button:active {
    transform: translate(calc(50% + clamp(60px, 7vw, 120px)), calc(-50% + clamp(50px, 7vh, 100px))) scale(1.05);
  }

  .menu__logo-text {
    font-size: clamp(24px, 6vw, 40px);
  }

  .menu-background__image {
    max-width: min(85vw, 900px);
    max-height: min(90vh, 700px);
  }
}

@media (max-width: 640px) {
  .header__logo-img {
    width: clamp(110px, 17vw, 155px);
  }

  .menu-3d-button {
    transform: translate(calc(50% + clamp(40px, 5vw, 80px)), calc(-50% + clamp(30px, 4vh, 70px)));
    width: clamp(90px, 9vw, 130px);
    height: clamp(75px, 8vw, 110px);
  }

  .menu-3d-button:hover {
    transform: translate(calc(50% + clamp(40px, 5vw, 80px)), calc(-50% + clamp(30px, 4vh, 70px))) scale(1.15);
  }

  .menu-3d-button:active {
    transform: translate(calc(50% + clamp(40px, 5vw, 80px)), calc(-50% + clamp(30px, 4vh, 70px))) scale(1.05);
  }
}

@media (max-width: 480px) {
  .header__logo-img {
    width: clamp(95px, 20vw, 145px);
  }

  .menu__content {
    gap: clamp(10px, 2vw, 14px);
    grid-template-columns: auto 1fr;
  }

  .menu__link {
    font-size: clamp(12px, 1.8vw, 14px);
  }

  .menu {
    padding-left: clamp(0.75rem, 4vw, 1rem);
    padding-right: clamp(0.75rem, 4vw, 1rem);
  }

  .menu__phone {
    font-size: 18px;
  }

  .header__mobile-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .header__bar {
    height: 36px;
  }

  .menu__logo-text {
    font-size: clamp(20px, 7vw, 32px);
    letter-spacing: clamp(1px, 0.2vw, 3px);
  }

  .menu__logo {
    margin-bottom: clamp(20px, 3vh, 36px);
  }

  .menu-background__image {
    max-width: min(90vw, 800px);
    max-height: min(95vh, 600px);
  }

  .menu-3d-button {
    transform: translate(calc(50% + clamp(30px, 4vw, 60px)), calc(-50% + clamp(20px, 3vh, 50px)));
    width: clamp(70px, 7vw, 100px);
    height: clamp(60px, 6vw, 85px);
  }

  .menu-3d-button:hover {
    transform: translate(calc(50% + clamp(30px, 4vw, 60px)), calc(-50% + clamp(20px, 3vh, 50px))) scale(1.15);
  }

  .menu-3d-button:active {
    transform: translate(calc(50% + clamp(30px, 4vw, 60px)), calc(-50% + clamp(20px, 3vh, 50px))) scale(1.05);
  }

  .menu-action-buttons {
    right: 12px;
    gap: 6px;
  }

  .menu-action-button__icon {
    width: clamp(32px, 5vw, 48px);
  }

  .menu-video-button {
    bottom: 16px;
  }

  .menu-video-button__image {
    max-width: clamp(150px, 30vw, 300px);
    max-height: clamp(30px, 4vh, 60px);
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .header__bar {
    height: 36px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .header__bar {
    height: 36px;
  }
}

@media (min-width: 1025px) {
  .header__bar {
    height: 36px;
  }
}

@media (min-width: 1440px) {
  .header__bar {
    height: 36px;
  }
}
</style>
