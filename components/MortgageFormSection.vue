<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-12 md:mb-16">
        ИПОТЕКА
      </h2>
      
      <div class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-12">
        <form class="space-y-6 md:space-y-8" @submit.prevent="submitForm">
          <!-- Amount -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Сумма, ₽
            </label>
            <input
              type="number"
              v-model="form.amount"
              required
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите сумму"
            />
          </div>

          <!-- Term -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Срок, лет
            </label>
            <input
              type="number"
              v-model="form.term"
              required
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите срок"
            />
          </div>

          <!-- Rate -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Ставка, %
            </label>
            <input
              type="number"
              step="0.1"
              v-model="form.rate"
              required
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите ставку"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-[#F2994A] hover:bg-[#e8893a] text-white rounded-lg px-8 md:px-12 py-4 md:py-5 text-base md:text-lg lg:text-xl font-semibold uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Рассчитать</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  amount: '',
  term: '',
  rate: ''
})

const submitForm = () => {
  console.log('Mortgage form submitted:', form.value)
  // Handle form submission
}
</script>
