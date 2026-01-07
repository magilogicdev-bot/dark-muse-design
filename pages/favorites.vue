<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useFavorites } from '~/composables/useFavorites'
import { apartments } from '~/data/apartments'

const router = useRouter()
const { favoriteIds } = useFavorites()

const goBack = () => {
  router.back()
}

// Фильтруем квартиры, которые есть в избранном
const favoriteApartments = computed(() => {
  return apartments.filter(apt => favoriteIds.value.includes(apt.id))
})
</script>

<template>
  <div class="bg-primary text-white min-h-screen font-sans">
    <!-- Main Content -->
    <section class="container max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 md:py-12 lg:py-16 xl:py-20 relative">
      <!-- Close Button (Top Right of Content) -->
      <button
        @click="goBack"
        class="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#2a2c38] border border-white/30 rounded-full hover:bg-[#353742] hover:border-white/50 transition-all"
        aria-label="Закрыть"
      >
        <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Main Grid: Left Text + Right Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(280px,35%)_1fr] gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">
        <!-- Left Section: Title and Description -->
        <div class="flex flex-col">
          <h1 class="text-4xl md:text-5xl font-bold uppercase mb-4 md:mb-6 lg:mb-8 text-white leading-tight">
            ИЗБРАННОЕ
          </h1>
          <p class="text-lg text-white/70 leading-relaxed max-w-md">
            Сохраняйте понравившиеся квартиры в избранное. Вернитесь к ним в любой момент, чтобы сравнить варианты, показать близким или обсудить с нашими менеджерами.
          </p>
          
          <NuxtLink 
            v-if="favoriteApartments.length === 0"
            to="/buy-apartment"
            class="mt-8 inline-flex items-center justify-center px-8 py-4 bg-[#ff8700] rounded-full text-white font-medium uppercase tracking-wider hover:bg-[#ff9f34] transition-colors w-fit"
          >
            К ВЫБОРУ КВАРТИР
          </NuxtLink>
        </div>

        <!-- Right Section: Plans Grid -->
        <div class="w-full">
          <div v-if="favoriteApartments.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <ApartmentCard
              v-for="apt in favoriteApartments"
              :key="apt.id"
              :apartment="apt"
            />
          </div>
          
          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
            <div class="w-20 h-20 mb-6 text-white/20">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p class="text-2xl font-medium text-white/40">СПИСОК ИЗБРАННОГО ПУСТ</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
