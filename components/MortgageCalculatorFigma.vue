<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-12 md:mb-16">
        ИПОТЕЧНЫЙ КАЛЬКУЛЯТОР
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
        <!-- Left Column: Parameters -->
        <div class="space-y-6">
          <h3 class="text-lg md:text-xl font-medium text-white mb-6">
            Выберите параметры ипотеки
          </h3>
          
          <!-- Property Type -->
          <div class="space-y-2">
            <label class="text-xs text-white/70 block">Тип объекта</label>
            <div class="bg-white border border-white/20 rounded-lg overflow-hidden">
              <select
                v-model="propertyType"
                class="w-full bg-transparent text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
              >
                <option value="apartment">Квартира</option>
                <option value="house">Дом</option>
              </select>
            </div>
          </div>
          
          <!-- Income Confirmation -->
          <div class="space-y-2">
            <label class="text-xs text-white/70 block">Способ подтверждения дохода</label>
            <div class="bg-white border border-white/20 rounded-lg overflow-hidden">
              <select
                v-model="incomeConfirmation"
                class="w-full bg-transparent text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none appearance-none cursor-pointer"
              >
                <option value="2ndfl">2-НДФЛ или форма банка</option>
                <option value="bank">Справка из банка</option>
              </select>
            </div>
          </div>
          
          <!-- Property Cost Slider -->
          <div class="space-y-2">
            <label class="text-xs text-white/70 block">Стоимость недвижимости</label>
            <div class="bg-white border border-white/20 rounded-lg px-4 py-3">
              <div class="text-[#1A1A1A] text-sm font-medium">
                ОТ {{ formatCurrency(propertyCost) }} РУБ
              </div>
            </div>
            <div class="relative h-1 mt-3">
              <div class="absolute inset-0 h-1 bg-[#e0e0e0] rounded-full"></div>
              <div 
                class="absolute h-1 bg-[#1A1A1A] rounded-full top-0"
                :style="{ width: `${((propertyCost - propertyCostMin) / (propertyCostMax - propertyCostMin)) * 100}%` }"
              ></div>
              <input
                v-model.number="propertyCost"
                @input="updatePropertyCost"
                type="range"
                :min="propertyCostMin"
                :max="propertyCostMax"
                :step="100000"
                class="absolute inset-0 w-full h-4 -top-1.5 opacity-0 cursor-pointer z-10"
              />
              <div 
                class="absolute w-4 h-4 bg-[#1A1A1A] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((propertyCost - propertyCostMin) / (propertyCostMax - propertyCostMin)) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <!-- Down Payment Slider -->
          <div class="space-y-2">
            <label class="text-xs text-white/70 block">Первоначальный взнос</label>
            <div class="bg-white border border-white/20 rounded-lg px-4 py-3">
              <div class="flex items-center justify-between text-[#1A1A1A]">
                <span class="text-sm font-medium">{{ formatCurrency(downPaymentAmount) }}</span>
                <span class="text-sm font-medium">{{ downPaymentPercent.toFixed(1).replace('.', ',') }}%</span>
              </div>
            </div>
            <div class="relative h-1 mt-3 mb-4">
              <div class="absolute inset-0 h-1 bg-[#e0e0e0] rounded-full"></div>
              <div 
                class="absolute h-1 bg-[#1A1A1A] rounded-full top-0"
                :style="{ width: `${((downPaymentPercent - downPaymentMin) / (downPaymentMax - downPaymentMin)) * 100}%` }"
              ></div>
              <input
                v-model.number="downPaymentPercent"
                @input="updateDownPayment"
                type="range"
                :min="downPaymentMin"
                :max="downPaymentMax"
                :step="0.1"
                class="absolute inset-0 w-full h-4 -top-1.5 opacity-0 cursor-pointer z-10"
              />
              <div 
                class="absolute w-4 h-4 bg-[#1A1A1A] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((downPaymentPercent - downPaymentMin) / (downPaymentMax - downPaymentMin)) * 100}%` }"
              ></div>
            </div>
            <!-- Quick select buttons -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="percent in downPaymentOptions"
                :key="percent"
                @click="setDownPaymentPercent(percent)"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                  Math.abs(downPaymentPercent - percent) < 0.1
                    ? 'bg-white text-[#1A1A1A] border-white'
                    : 'bg-[#1A1A1A] text-white border-white/30 hover:border-white/50'
                ]"
              >
                {{ percent.toFixed(1).replace('.', ',') }}%
              </button>
            </div>
          </div>
          
          <!-- Term Slider -->
          <div class="space-y-2">
            <label class="text-xs text-white/70 block">Срок</label>
            <div class="bg-white border border-white/20 rounded-lg px-4 py-3">
              <div class="flex items-center justify-between text-[#1A1A1A]">
                <span class="text-sm font-medium">{{ loanTerm }}</span>
                <span class="text-sm font-medium text-[#666]">ЛЕТ</span>
              </div>
            </div>
            <div class="relative h-1 mt-3 mb-4">
              <div class="absolute inset-0 h-1 bg-[#e0e0e0] rounded-full"></div>
              <div 
                class="absolute h-1 bg-[#1A1A1A] rounded-full top-0"
                :style="{ width: `${((loanTerm - loanTermMin) / (loanTermMax - loanTermMin)) * 100}%` }"
              ></div>
              <input
                v-model.number="loanTerm"
                @input="updateLoanTerm"
                type="range"
                :min="loanTermMin"
                :max="loanTermMax"
                :step="1"
                class="absolute inset-0 w-full h-4 -top-1.5 opacity-0 cursor-pointer z-10"
              />
              <div 
                class="absolute w-4 h-4 bg-[#1A1A1A] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((loanTerm - loanTermMin) / (loanTermMax - loanTermMin)) * 100}%` }"
              ></div>
            </div>
            <!-- Quick select buttons -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="years in loanTermOptions"
                :key="years"
                @click="loanTerm = years"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                  loanTerm === years
                    ? 'bg-white text-[#1A1A1A] border-white'
                    : 'bg-[#1A1A1A] text-white border-white/30 hover:border-white/50'
                ]"
              >
                {{ years }} лет
              </button>
            </div>
          </div>
          
          <!-- Borrower Age Slider -->
          <div class="space-y-2">
            <label class="text-xs text-white/70 block">Возраст заёмщика</label>
            <div class="bg-white border border-white/20 rounded-lg px-4 py-3">
              <div class="flex items-center justify-between text-[#1A1A1A]">
                <span class="text-sm font-medium">{{ borrowerAge }}</span>
                <span class="text-sm font-medium text-[#666]">ЛЕТ</span>
              </div>
            </div>
            <div class="relative h-1 mt-3">
              <div class="absolute inset-0 h-1 bg-[#e0e0e0] rounded-full"></div>
              <div 
                class="absolute h-1 bg-[#1A1A1A] rounded-full top-0"
                :style="{ width: `${((borrowerAge - borrowerAgeMin) / (borrowerAgeMax - borrowerAgeMin)) * 100}%` }"
              ></div>
              <input
                v-model.number="borrowerAge"
                @input="updateBorrowerAge"
                type="range"
                :min="borrowerAgeMin"
                :max="borrowerAgeMax"
                :step="1"
                class="absolute inset-0 w-full h-4 -top-1.5 opacity-0 cursor-pointer z-10"
              />
              <div 
                class="absolute w-4 h-4 bg-[#1A1A1A] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
                :style="{ left: `${((borrowerAge - borrowerAgeMin) / (borrowerAgeMax - borrowerAgeMin)) * 100}%` }"
              ></div>
            </div>
            <p class="text-xs text-white/60 mt-2">
              Его нужно указать, чтобы мы понимали, подходите ли вы под условия банка
            </p>
          </div>
          
          <!-- Loan Amount Display -->
          <div class="mt-6 pt-6 border-t border-white/20">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-white">Сумма кредита</span>
              <span class="text-lg font-semibold text-white">{{ formatCurrency(calculatedLoanAmount) }} ₽</span>
            </div>
          </div>
          
          <!-- Disclaimer Text -->
          <p class="text-xs text-white/60 leading-relaxed">
            Приведенные расчеты носят предварительный характер. Окончательный расчет суммы кредита и размер ежемесячного платежа производятся банком после предоставления полного комплекта документов и проведения оценки платежеспособности клиента.
          </p>
        </div>
        
        <!-- Right Column: Programs -->
        <div class="space-y-6">
          <h3 class="text-lg md:text-xl font-medium text-white mb-6">
            Выберите ипотечную программу
          </h3>
          
          <!-- Program Filters -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filter in programFilters"
              :key="filter.value"
              @click="selectedFilter = filter.value"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                selectedFilter === filter.value
                  ? 'bg-white text-[#1A1A1A] border-white'
                  : 'bg-transparent text-white border-white/30 hover:border-white/50'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
          
          <!-- Programs List -->
          <div class="space-y-4">
            <div
              v-for="program in filteredPrograms"
              :key="program.id"
              class="bg-white border border-white/20 rounded-lg overflow-hidden"
            >
              <div class="p-4 md:p-5">
                <div class="flex items-start justify-between mb-3">
                  <h4 class="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">
                    {{ program.title }}
                  </h4>
                  <button
                    @click="toggleProgram(program.id)"
                    class="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 ml-3"
                  >
                    <span class="text-white text-xs font-bold">i</span>
                  </button>
                </div>
                
                <!-- Program Details -->
                <div class="space-y-2">
                  <div class="text-xs text-[#666]">
                    от {{ program.rate }} годовых
                  </div>
                  <div class="text-xs text-[#666]">
                    До {{ program.maxAmount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const propertyType = ref('apartment')
const incomeConfirmation = ref('2ndfl')
const propertyCost = ref(5470000)
const propertyCostMin = 1000000
const propertyCostMax = 50000000

const downPaymentPercent = ref(52.1)
const downPaymentMin = 10
const downPaymentMax = 90
const downPaymentOptions = [15.1, 20.1, 30.1, 50.1]

const loanTerm = ref(15)
const loanTermMin = 1
const loanTermMax = 30
const loanTermOptions = [10, 15, 20, 25, 30]

const borrowerAge = ref(25)
const borrowerAgeMin = 18
const borrowerAgeMax = 75

const selectedFilter = ref('all')
const expandedProgram = ref(null)

const programFilters = [
  { label: 'Все программы', value: 'all' },
  { label: 'Для семей', value: 'family' },
  { label: 'Для IT-специалистов', value: 'it' },
  { label: 'Для военных', value: 'military' }
]

const programs = [
  {
    id: 1,
    title: 'СЕМЕЙНАЯ ИПОТЕКА',
    type: 'family',
    rate: '5,7%',
    maxAmount: '12 000 000 ₽'
  },
  {
    id: 2,
    title: 'ИПОТЕКА ДЛЯ IT-СПЕЦИАЛИСТОВ',
    type: 'it',
    rate: '6,0%',
    maxAmount: '12 000 000 ₽'
  },
  {
    id: 3,
    title: 'СЕМЕЙНАЯ ИПОТЕКА',
    type: 'family',
    rate: '5,7%',
    maxAmount: '12 000 000 ₽'
  }
]

const downPaymentAmount = computed(() => {
  return (propertyCost.value * downPaymentPercent.value) / 100
})

const calculatedLoanAmount = computed(() => {
  if (!propertyCost.value || !downPaymentPercent.value) return 0
  return propertyCost.value - downPaymentAmount.value
})

const filteredPrograms = computed(() => {
  if (selectedFilter.value === 'all') return programs
  return programs.filter(p => p.type === selectedFilter.value)
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value))
}

const updatePropertyCost = () => {
  if (propertyCost.value < propertyCostMin) propertyCost.value = propertyCostMin
  if (propertyCost.value > propertyCostMax) propertyCost.value = propertyCostMax
}

const updateDownPayment = () => {
  if (downPaymentPercent.value < downPaymentMin) downPaymentPercent.value = downPaymentMin
  if (downPaymentPercent.value > downPaymentMax) downPaymentPercent.value = downPaymentMax
  // Округляем до 0.1 для соответствия формату
  downPaymentPercent.value = Math.round(downPaymentPercent.value * 10) / 10
}

const setDownPaymentPercent = (percent) => {
  downPaymentPercent.value = percent
}

const updateLoanTerm = () => {
  if (loanTerm.value < loanTermMin) loanTerm.value = loanTermMin
  if (loanTerm.value > loanTermMax) loanTerm.value = loanTermMax
}

const updateBorrowerAge = () => {
  if (borrowerAge.value < borrowerAgeMin) borrowerAge.value = borrowerAgeMin
  if (borrowerAge.value > borrowerAgeMax) borrowerAge.value = borrowerAgeMax
}

const toggleProgram = (programId) => {
  expandedProgram.value = expandedProgram.value === programId ? null : programId
}
</script>
