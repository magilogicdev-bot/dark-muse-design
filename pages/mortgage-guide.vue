<template>
  <div class="bg-[#2A2C38] text-white">
    <!-- Hero Section -->
    <section class="pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Title Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20">
          <div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-3 md:mb-4 lg:mb-6 leading-[1.0234375em] tracking-[-0.015em]">
              ГИД ПО ИПОТЕКЕ
            </h1>
            <p class="text-sm md:text-base lg:text-lg font-normal text-white leading-[1.3103448275862069em] tracking-[-0.0207em]">
              Ипотека — большой и важный шаг. Мы подготовили ответы на самые главные вопросы по ипотеке, которые помогут разобраться в тонкостях сделки
            </p>
          </div>
          <div></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <!-- Left Column: Main Content -->
          <div class="space-y-12 md:space-y-16 lg:space-y-20">
            <!-- Process Section -->
            <div>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-5 lg:mb-6 leading-tight">
                Процесс покупки в ипотеку
              </h2>
              <ol class="text-base md:text-lg text-white leading-relaxed space-y-4 list-decimal pl-5 md:pl-6">
                <li>Забронируйте квартиру</li>
                <li>Подайте заявку на ипотеку и получите одобрение</li>
                <li>Подготовьте договор долевого участия (ДДУ)</li>
                <li>Подпишите ипотечный договор онлайн</li>
                <li>Подпишите пакет документов по сделке с помощью ЭЦП</li>
                <li>Дождитесь регистрации в Росреестре. Когда всё будет готово, пришлём документы вам на электронную почту</li>
              </ol>
            </div>

            <!-- Documents Section -->
            <div>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-5 lg:mb-6 leading-tight">
                Документы для оформления
              </h2>
              <div class="space-y-3 md:space-y-4">
                <p class="text-base md:text-lg text-white leading-relaxed">
                  Список документов от банка не зависит — мы договорились об одном списке документов, который принимают все банки.
                </p>
                <p class="text-base md:text-lg text-white leading-relaxed">
                  Иногда может потребоваться брачный договор, нотариально заверенное заявление, документы на всех созаёмщиков.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Accordions -->
          <div class="space-y-2 md:space-y-3 lg:space-y-4">
            <!-- Accordion 1: СЕМЕЙНАЯ ИПОТЕКА (Open) -->
            <div class="bg-white rounded-lg border border-[#1A1A1A]/10 shadow-sm">
              <button 
                @click="toggleAccordion(0)"
                class="flex items-start justify-between w-full text-left p-3 md:p-4 lg:p-5"
              >
                <h3 class="text-lg md:text-xl font-medium text-[#1A1A1A] uppercase tracking-wide flex-1">
                  СЕМЕЙНАЯ ИПОТЕКА
                </h3>
                <div class="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center flex-shrink-0 ml-3 hover:bg-[#E7E7E5] transition-colors">
                  <svg 
                    :class="{ 'rotate-180': expandedAccordion === 0 }"
                    class="w-4 h-4 text-[#141414] transition-transform duration-200"
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
              <div 
                v-show="expandedAccordion === 0"
                class="px-3 md:px-4 lg:px-5 pb-3 md:pb-4 lg:pb-5 text-base md:text-lg font-medium text-[#1A1A1A] leading-[1.6em] tracking-[-0.0225em] space-y-2"
              >
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-black flex-shrink-0"></div>
                  <p>Паспорт</p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-black flex-shrink-0"></div>
                  <p>СНИЛС</p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-black flex-shrink-0"></div>
                  <p>ИНН</p>
                </div>
              </div>
            </div>

            <!-- Accordion 2: ИПОТЕКА ДЛЯ IT-СПЕЦИАЛИСТОВ (Closed) -->
            <div class="bg-white rounded-lg border border-[#1A1A1A]/10 shadow-sm">
              <button 
                @click="toggleAccordion(1)"
                class="flex items-start justify-between w-full text-left p-3 md:p-4 lg:p-5"
              >
                <h3 class="text-lg md:text-xl font-medium text-[#1A1A1A] uppercase tracking-wide flex-1">
                  ИПОТЕКА ДЛЯ IT-СПЕЦИАЛИСТОВ
                </h3>
                <div class="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center flex-shrink-0 ml-3 hover:bg-[#E7E7E5] transition-colors">
                  <svg 
                    :class="{ 'rotate-180': expandedAccordion === 1 }"
                    class="w-4 h-4 text-[#141414] transition-transform duration-200"
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>

            <!-- Accordion 3: СЕМЕЙНАЯ ИПОТЕКА (Closed) -->
            <div class="bg-white rounded-lg border border-[#1A1A1A]/10 shadow-sm">
              <button 
                @click="toggleAccordion(2)"
                class="flex items-start justify-between w-full text-left p-3 md:p-4 lg:p-5"
              >
                <h3 class="text-lg md:text-xl font-medium text-[#1A1A1A] uppercase tracking-wide flex-1">
                  СЕМЕЙНАЯ ИПОТЕКА
                </h3>
                <div class="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center flex-shrink-0 ml-3 hover:bg-[#E7E7E5] transition-colors">
                  <svg 
                    :class="{ 'rotate-180': expandedAccordion === 2 }"
                    class="w-4 h-4 text-[#141414] transition-transform duration-200"
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>

            <!-- Accordion 4: СОЗАЕМЩИКУ (Closed) -->
            <div class="bg-white rounded-lg border border-[#1A1A1A]/10 shadow-sm">
              <button 
                @click="toggleAccordion(3)"
                class="flex items-start justify-between w-full text-left p-3 md:p-4 lg:p-5"
              >
                <h3 class="text-lg md:text-xl font-medium text-[#1A1A1A] uppercase tracking-wide flex-1">
                  СОЗАЕМЩИКУ
                </h3>
                <div class="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center flex-shrink-0 ml-3 hover:bg-[#E7E7E5] transition-colors">
                  <svg 
                    :class="{ 'rotate-180': expandedAccordion === 3 }"
                    class="w-4 h-4 text-[#141414] transition-transform duration-200"
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Second Section -->
    <section class="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Divider Line -->
        <div class="border-t border-gray-400/15 mb-12 md:mb-16 lg:mb-20"></div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <!-- Left Column: Text Blocks -->
          <div class="space-y-12 md:space-y-16 lg:space-y-20">
            <!-- Block 1: Если женат/замужем -->
            <div>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-5 lg:mb-6 leading-tight">
                Если женат/замужем
              </h2>
              <p class="text-base md:text-lg text-white/80 leading-relaxed">
                Супруг или супруга становится совладельцем квартиры, если в брачном договоре не предусмотрено иное. Обязательно отметьте, что вы в брака, и загрузите все необходимые документы. Для ипотеки не требуется подтверждение дохода супруга, но можно его указать.
              </p>
            </div>

            <!-- Block 2: Взаимодействие с банком -->
            <div>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-5 lg:mb-6 leading-tight">
                Взаимодействие с банком
              </h2>
              <p class="text-base md:text-lg text-white/80 leading-relaxed">
                При покупке квартиры банк выступает в качестве гаранта сделки, снижает риски для покупателя. В любом случае деньги проходят через специальный банковский счёт — аккредитив или эскроу.
              </p>
            </div>
          </div>

          <!-- Right Column: Accordions -->
          <div class="space-y-2 md:space-y-3 lg:space-y-4">
            <!-- Accordion 1: ЕСЛИ БРАТЬ ИПОТЕКУ (Open) -->
            <div class="bg-white rounded-lg border border-[#1A1A1A]/10 shadow-sm">
              <button 
                @click="toggleAccordion2(0)"
                class="flex items-start justify-between w-full text-left p-3 md:p-4 lg:p-5"
              >
                <h3 class="text-lg md:text-xl font-medium text-[#1A1A1A] uppercase tracking-wide flex-1">
                  ЕСЛИ БРАТЬ ИПОТЕКУ
                </h3>
                <div class="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center flex-shrink-0 ml-3 hover:bg-[#E7E7E5] transition-colors">
                  <svg 
                    :class="{ 'rotate-180': expandedAccordion2 === 0 }"
                    class="w-4 h-4 text-[#141414] transition-transform duration-200"
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
              <div 
                v-show="expandedAccordion2 === 0"
                class="px-3 md:px-4 lg:px-5 pb-3 md:pb-4 lg:pb-5 text-base md:text-lg font-medium text-[#1A1A1A] leading-[1.6em] tracking-[-0.0225em]"
              >
                <p>Чтобы взять ипотеку, надо заполнить ипотечную анкету, которая направляется в подходящие банки с лучшими условиями кредитования.</p>
              </div>
            </div>

            <!-- Accordion 2: ОПЛАТА ДОГОВОРА ДОЛЕВОГО УЧАСТИЯ (Closed) -->
            <div class="bg-white rounded-lg border border-[#1A1A1A]/10 shadow-sm">
              <button 
                @click="toggleAccordion2(1)"
                class="flex items-start justify-between w-full text-left p-3 md:p-4 lg:p-5"
              >
                <h3 class="text-lg md:text-xl font-medium text-[#1A1A1A] uppercase tracking-wide flex-1">
                  ОПЛАТА ДОГОВОРА ДОЛЕВОГО УЧАСТИЯ
                </h3>
                <div class="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center flex-shrink-0 ml-3 hover:bg-[#E7E7E5] transition-colors">
                  <svg 
                    :class="{ 'rotate-180': expandedAccordion2 === 1 }"
                    class="w-4 h-4 text-[#141414] transition-transform duration-200"
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Third Section -->
    <section class="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Divider Line -->
        <div class="border-t border-gray-400/15 mb-12 md:mb-16 lg:mb-20"></div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <!-- Left Column: Text Blocks -->
          <div class="space-y-12 md:space-y-16 lg:space-y-20">
            <!-- Block 1: Кто может быть созаёмщиком -->
            <div>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-5 lg:mb-6 leading-tight">
                Кто может быть созаёмщиком
              </h2>
              <ul class="text-base md:text-lg text-white leading-relaxed space-y-3 md:space-y-4 mb-4 md:mb-5 lg:mb-6 list-disc pl-5 md:pl-6">
                <li>Любой родственник или друг.</li>
                <li>Супруг/супруга является обязательным созаёмщиком в отсутствие брачного договора, предполагающего иное.</li>
              </ul>
              <p class="text-base md:text-lg text-white/80 leading-relaxed">
                У отдельных программ и банков могут быть условия, что созаёмщиком может быть только супруг/супруга. Однако, у отдельных программ и банков могут быть условия, которые не позволяют привлекать к сделке третьих лиц.
              </p>
            </div>

            <!-- Block 2: Материнский капитал -->
            <div>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-5 lg:mb-6 leading-tight">
                Материнский капитал
              </h2>
              <div class="space-y-3 md:space-y-4">
                <p class="text-base md:text-lg text-white/80 leading-relaxed">
                  Материнский капитал можно потратить на первоначальный взнос (часть взноса или весь) и на погашение долго. При этом в первоначальном взносе материнский капитал можно использовать только в договоре долевого участия.
                </p>
                <p class="text-base md:text-lg text-white/80 leading-relaxed">
                  При использовании материнского капитала каждый ребёнок должен получить долю в квартире. При продаже такой квартиры сделку должны согласовать органы опеки.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Empty (for alignment) -->
          <div></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const expandedAccordion = ref(0) // Первый аккордеон "СЕМЕЙНАЯ ИПОТЕКА" открыт по умолчанию
const expandedAccordion2 = ref(0) // Первый аккордеон второй секции "ЕСЛИ БРАТЬ ИПОТЕКУ" открыт по умолчанию

const toggleAccordion = (index) => {
  if (expandedAccordion.value === index) {
    expandedAccordion.value = null
  } else {
    expandedAccordion.value = index
  }
}

const toggleAccordion2 = (index) => {
  if (expandedAccordion2.value === index) {
    expandedAccordion2.value = null
  } else {
    expandedAccordion2.value = index
  }
}

usePageMeta({
  title: 'Гид по ипотеке | Pobedonoscev GROUP',
  description: 'Ответы на самые главные вопросы по ипотеке, которые помогут разобраться в тонкостях сделки'
})
</script>
