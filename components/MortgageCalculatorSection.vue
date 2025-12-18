<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-12 md:mb-16">
        ИПОТЕЧНЫЙ КАЛЬКУЛЯТОР
      </h2>
      
      <div class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-12">
        <form class="space-y-6 md:space-y-8">
          <!-- Amount Input -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Сумма ипотеки, ₽
            </label>
            <input
              type="number"
              v-model="mortgageAmount"
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите сумму"
            />
          </div>

          <!-- Term Input -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Срок кредита, лет
            </label>
            <input
              type="number"
              v-model="termYears"
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите срок"
            />
          </div>

          <!-- Rate Input -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Процентная ставка, %
            </label>
            <input
              type="number"
              step="0.1"
              v-model="interestRate"
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите ставку"
            />
          </div>

          <!-- Result -->
          <div v-if="monthlyPayment" class="bg-white/10 rounded-lg p-6 md:p-8">
            <p class="text-white/70 text-base md:text-lg mb-2">Ежемесячный платеж</p>
            <p class="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
              {{ formatCurrency(monthlyPayment) }} ₽
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            @click.prevent="calculate"
            class="w-full bg-[#F2994A] hover:bg-[#e8893a] text-white rounded-lg px-8 md:px-12 py-4 md:py-5 text-base md:text-lg lg:text-xl font-semibold uppercase transition-colors cursor-pointer"
          >
            Рассчитать
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const mortgageAmount = ref('')
const termYears = ref('')
const interestRate = ref('')
const monthlyPayment = ref(null)

const calculate = () => {
  if (!mortgageAmount.value || !termYears.value || !interestRate.value) return
  
  const principal = parseFloat(mortgageAmount.value)
  const monthlyRate = parseFloat(interestRate.value) / 100 / 12
  const numberOfPayments = parseFloat(termYears.value) * 12
  
  if (monthlyRate === 0) {
    monthlyPayment.value = principal / numberOfPayments
  } else {
    monthlyPayment.value = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value))
}
</script>
