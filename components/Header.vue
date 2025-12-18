<template>
  <header ref="headerEl" class="header" :class="{ 'header--menu-open': isMenuOpen }">
    <!-- Top ribbon -->
    <div ref="headerBarEl" class="header__bar">
      <div class="container mx-auto max-w-[1920px] flex items-center justify-between gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-6 xl:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8 w-full min-w-0 overflow-hidden">
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
          <NuxtLink to="/" class="header__logo">
            <NuxtImg src="/images/logo.png" alt="Pobedonoscev" class="header__logo-img" />
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

    <!-- Fullscreen Menu Overlay -->
    <Transition name="menu-fade">
      <div
        v-if="isMenuOpen"
        id="site-menu"
        class="menu-overlay"
        @click.self="closeMenu"
      >
        <div class="menu">
          <div class="menu__content">
            <div class="menu__rail-line"></div>
            <nav class="menu__nav">
              <NuxtLink
                v-for="item in menuItems"
                :key="item.label"
                :to="item.to"
                class="menu__link"
                @click="closeMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>

          <div class="menu__mobile-links">
            <a :href="phoneHref" class="menu__phone">
              {{ config.contacts.phone.primary }}
            </a>
            <a :href="config.navigation.getPresentation" class="menu__presentation-link">
              ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
            </a>
          </div>
        </div>
      </div>
    </Transition>
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

// Check if we're on the favorites page
const isFavoritesPage = computed(() => route.path === '/favorites')

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
  headerEl.value.style.setProperty('--header-bar-height', `${Math.round(height)}px`)
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
  { label: 'ПРОЕКТЫ', to: '/projects' },
  { label: 'ВЫБОР КВАРТИРЫ', to: '/apartments' },
  { label: 'ИПОТЕКА', to: '/mortgage' },
  { label: 'КОНТАКТЫ', to: '/contacts' },
  { label: 'НОВОСТИ', to: '/news' },
]
</script>

<style scoped>
/* Base Header Styles */
.header {
  --header-bar-height: 0px;
  --menu-padding-top: clamp(72px, 16vh, 220px);
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 100;
  color: #fff;
}

.header--menu-open {
  position: fixed;
}

.header__bar {
  position: relative;
  z-index: 250;
  background: #2a2c38;
  border-bottom: none;
  width: 100%;
  min-height: auto;
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
  gap: clamp(6px, 0.8vw, 14px);
  width: clamp(24px, 2.2vw, 46px);
  height: clamp(14px, 1.4vw, 22px);
  flex-shrink: 0;
}

.header__burger-line {
  display: block;
  height: 2px;
  width: 100%;
  background: #fff;
  transition: all 0.3s ease;
  transform-origin: left center;
}

.header__burger--open .header__burger-line:nth-child(1) {
  transform: translateY(clamp(4px, 0.45vw, 6px)) rotate(45deg);
}

.header__burger--open .header__burger-line:nth-child(2) {
  transform: translateY(calc(clamp(4px, 0.45vw, 6px) * -1)) rotate(-45deg);
}

.header__menu-text {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(10px, 0.95vw, 13px);
  font-weight: 200;
  letter-spacing: -0.02em;
  color: #fff;
  text-transform: uppercase;
}

@media (min-width: 1280px) {
  .header__menu-text {
    font-size: clamp(11px, 1vw, 15px);
  }
}

.header__nav-link {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(10px, 0.9vw, 12px);
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
    font-size: clamp(11px, 1vw, 14px);
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

.header__logo:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.header__logo-img {
  width: clamp(140px, 12vw, 180px);
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
  font-size: clamp(10px, 0.9vw, 12px);
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
  font-size: clamp(10px, 0.9vw, 12px);
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
    font-size: clamp(11px, 1vw, 14px);
  }
}

@media (min-width: 1440px) {
  .header__phone {
    font-size: clamp(12px, 1.1vw, 16px);
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

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  top: var(--header-bar-height, 0px);
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(42, 44, 56, 0.62) 0%,
    rgba(42, 44, 56, 0.38) 32%,
    rgba(42, 44, 56, 0) 68%
  );
  z-index: 200;
  display: flex;
  align-items: flex-start;
  padding-top: var(--menu-padding-top);
}

.menu {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .menu {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .menu {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .menu {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media (min-width: 1536px) {
  .menu {
    padding-left: 3.75rem;
    padding-right: 3.75rem;
  }
}

.menu__content {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  gap: clamp(18px, 2vw, 28px);
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
    width: clamp(130px, 11vw, 170px);
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
    font-size: clamp(11px, 1vw, 14px);
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
    gap: 24px;
  }

  .menu__rail-line {
    height: clamp(260px, 46vh, 560px);
  }

  .menu__link {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: #fff;
  }

  .menu__mobile-links {
    display: flex;
  }

  .menu-overlay {
    background: radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.04), transparent 24%),
      rgba(24, 28, 40, 0.94);
    backdrop-filter: blur(10px);
    padding-top: 44px;
  }
}

@media (max-width: 768px) {
  .header__logo-img {
    width: clamp(115px, 13vw, 155px);
  }

  .menu__nav {
    gap: 20px;
  }

  .menu__link {
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .header__logo-img {
    width: clamp(105px, 16vw, 145px);
  }
}

@media (max-width: 480px) {
  .header__logo-img {
    width: clamp(95px, 19vw, 135px);
  }

  .menu__link {
    font-size: 14px;
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
    min-height: 60px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .header__bar {
    min-height: 70px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .header__bar {
    min-height: 80px;
  }
}

@media (min-width: 1025px) {
  .header__bar {
    min-height: 90px;
  }
}

@media (min-width: 1440px) {
  .header__bar {
    min-height: 106px;
  }
}
</style>
