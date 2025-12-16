<template>
  <header class="w-full bg-primary text-white z-50 relative">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div class="flex items-center justify-between py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8">
        <!-- Left Section: Menu + Buy Apartment (Desktop only) -->
        <div class="hidden lg:flex lg:flex-1 items-center gap-6 xl:gap-8 2xl:gap-12">
          <button 
            @click="toggleMenu" 
            class="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 hover:opacity-70 transition-opacity"
            aria-label="Открыть меню"
          >
            <!-- Hamburger Icon -->
            <span class="relative flex flex-col justify-center gap-1 w-5 h-3.5">
              <span class="block h-[1.5px] w-full bg-white transition-all"></span>
              <span class="block h-[1.5px] w-full bg-white transition-all"></span>
            </span>
            <span class="text-xs xl:text-[13px] 2xl:text-sm font-normal tracking-[0.15em] text-white uppercase" style="font-family: 'Inter', sans-serif">
              МЕНЮ
            </span>
          </button>
          
          <a 
            :href="config.navigation.buyApartment" 
            class="text-xs xl:text-[13px] 2xl:text-sm font-normal tracking-[0.15em] text-white uppercase no-underline hover:opacity-70 transition-opacity"
            style="font-family: 'Inter', sans-serif"
          >
            КУПИТЬ КВАРТИРУ
          </a>
        </div>

        <!-- Center: Logo -->
        <div class="flex-1 lg:flex-none flex justify-center">
          <NuxtLink 
            to="/" 
            class="text-lg md:text-xl lg:text-2xl xl:text-[26px] 2xl:text-[28px] font-normal tracking-[0.04em] text-white no-underline hover:opacity-80 transition-opacity"
            style="font-family: 'Playfair Display', Georgia, serif"
          >
            {{ config.branding.name }}
          </NuxtLink>
        </div>

        <!-- Right Section: Presentation + Phone (Desktop only) -->
        <div class="hidden lg:flex lg:flex-1 items-center justify-end gap-6 xl:gap-8 2xl:gap-12">
          <a 
            :href="config.navigation.getPresentation" 
            class="flex items-center gap-2 no-underline hover:opacity-70 transition-opacity"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              class="w-3 h-3 text-white"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span class="text-xs xl:text-[13px] 2xl:text-sm font-normal tracking-[0.15em] text-white uppercase" style="font-family: 'Inter', sans-serif">
              ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
            </span>
          </a>
          
          <a 
            :href="phoneHref" 
            class="text-sm xl:text-[15px] 2xl:text-base font-medium tracking-[0.02em] text-white no-underline hover:opacity-70 transition-opacity whitespace-nowrap"
            style="font-family: 'Inter', sans-serif"
          >
            {{ config.contacts.phone.primary }}
          </a>
        </div>

        <!-- Mobile Menu Button (Mobile/Tablet only) -->
        <button 
          @click="toggleMenu" 
          class="lg:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 bg-transparent border-none cursor-pointer p-0"
          aria-label="Открыть меню"
        >
          <!-- Burger Icon - Three lines -->
          <span class="block w-6 h-0.5 bg-white transition-all"></span>
          <span class="block w-6 h-0.5 bg-white transition-all"></span>
          <span class="block w-6 h-0.5 bg-white transition-all"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div 
        v-if="isMenuOpen" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
        @click="closeMenu"
      ></div>
    </Transition>

    <!-- Mobile Menu Drawer -->
    <Transition name="slide">
      <div 
        v-if="isMenuOpen" 
        class="fixed top-0 right-0 w-full max-w-[360px] md:max-w-[400px] h-screen bg-gradient-to-b from-primary to-[#1f2129] z-[300] p-6 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.3)]"
      >
        <div class="flex items-center justify-between mb-10">
          <span class="text-xl text-white tracking-[0.04em]" style="font-family: 'Playfair Display', Georgia, serif">
            Pobedonoscev
          </span>
          <button 
            @click="closeMenu" 
            class="flex items-center justify-center w-10 h-10 bg-transparent border-none text-white cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Закрыть меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <nav class="flex flex-col gap-6">
          <a 
            :href="config.navigation.menu" 
            class="text-sm font-normal tracking-[0.15em] text-white uppercase no-underline py-3 border-b border-white/10 hover:opacity-70 transition-opacity"
            style="font-family: 'Inter', sans-serif"
            @click="closeMenu"
          >
            МЕНЮ
          </a>
          <a 
            :href="config.navigation.buyApartment" 
            class="text-sm font-normal tracking-[0.15em] text-white uppercase no-underline py-3 border-b border-white/10 hover:opacity-70 transition-opacity"
            style="font-family: 'Inter', sans-serif"
            @click="closeMenu"
          >
            КУПИТЬ КВАРТИРУ
          </a>
          <a 
            :href="config.navigation.getPresentation" 
            class="text-sm font-normal tracking-[0.15em] text-white uppercase no-underline py-3 border-b border-white/10 hover:opacity-70 transition-opacity"
            style="font-family: 'Inter', sans-serif"
            @click="closeMenu"
          >
            ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
          </a>
        </nav>
        
        <a 
          :href="phoneHref" 
          class="mt-auto text-lg font-medium text-white no-underline text-center py-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          style="font-family: 'Inter', sans-serif"
        >
          {{ config.contacts.phone.primary }}
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { useMenu } from '~/composables/useMenu'
import { siteConfig } from '~/config/contacts'

const { isMenuOpen, toggleMenu, closeMenu } = useMenu()
const config = siteConfig

// Computed для телефонных ссылок
const phoneHref = 'tel:' + config.contacts.phone.formatted
</script>

<style scoped>
/* Transitions for mobile menu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
