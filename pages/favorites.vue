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
          <h1 class="text-5xl font-bold uppercase mb-4 md:mb-6 lg:mb-8 text-white leading-tight">
            ИЗБРАННОЕ
          </h1>
          <p class="text-lg text-white leading-relaxed">
            Сохраняйте понравившиеся квартиры в избранное. Вернитесь к ним в любой момент, чтобы сравнить варианты, показать близким или обсудить с нашими менеджерами.
          </p>
        </div>

        <!-- Right Section: Plans Grid - 2x2 Layout -->
        <div class="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 w-full max-w-[750px] mr-8 lg:mr-12 xl:mr-16">
          <!-- First Card -->
          <FavoritePlanCard
            v-if="favoritePlans[0]"
            :plan="favoritePlans[0]"
          />

          <!-- Search Panel -->
          <FavoriteSearchPanel />

          <!-- Other Cards -->
          <FavoritePlanCard
            v-for="plan in favoritePlans.slice(1)"
            :key="plan.id"
            :plan="plan"
          />
        </div>
      </div>
    </section>

    <!-- Floating Action Bar with Gold Accent -->
    <FloatingActionBarGold />
  </div>
</template>

<script setup>
const router = useRouter()

const goBack = () => {
  router.back()
}

// Static data for favorite plans
const favoritePlans = ref([
  {
    id: 1,
    image: '/images/plans/plan-1.webp',
    rooms: '2',
    area: '65.7',
  },
  {
    id: 2,
    image: '/images/plans/plan-2.svg',
    rooms: '3',
    area: '89.2',
  },
  {
    id: 3,
    image: '/images/plans/plan-3.svg',
    rooms: '1',
    area: '42.3',
  },
])
</script>
