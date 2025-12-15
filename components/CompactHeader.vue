<template>
  <header class="bg-[#262a38]/95 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.24)] border-b border-white/10 backdrop-blur">
    <div class="page-container flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="toggleMenu"
          class="text-white hover:text-[#ffb347] transition-colors"
          aria-label="Открыть меню"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="uppercase text-[11px] tracking-[0.24em] text-white/60">Group</span>
      </div>

      <div class="flex items-center gap-4">
        <div class="text-white font-serif text-lg tracking-[0.04em]">Pobedonoscev</div>
        <a href="tel:+74852333362" class="text-white font-semibold text-sm md:text-base hover:text-[#ffb347] transition-colors whitespace-nowrap">
          +7 (4852) 33-33-62
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
