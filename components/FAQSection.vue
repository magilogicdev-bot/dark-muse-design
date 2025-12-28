<template>
  <section class="bg-[#1A1A1A] py-16 md:py-20 lg:py-24 font-brand">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
      <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-12 md:mb-16">
        ВОПРОСЫ И ОТВЕТЫ
      </h2>
      
      <div class="space-y-4 md:space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-[#F9F9F9] rounded-lg overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
          >
            <span class="text-[#1A1A1A] text-base md:text-lg lg:text-xl font-medium pr-4">
              {{ faq.question }}
            </span>
            <div class="flex-shrink-0 w-12 h-12 md:w-15 md:h-15 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <!-- Plus icon when collapsed -->
              <svg
                v-if="!faq.isOpen"
                class="w-6 h-6 text-white transition-opacity duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <!-- Minus icon when expanded -->
              <svg
                v-else
                class="w-6 h-6 text-white transition-opacity duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
              </svg>
            </div>
          </button>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-screen"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 max-h-screen"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="faq.isOpen" class="px-6 pb-4 md:px-8 md:pb-5">
              <ol class="text-[#1A1A1A] text-sm md:text-base lg:text-lg leading-relaxed space-y-2 list-decimal list-inside">
                <li v-for="(item, idx) in faq.answer" :key="idx">{{ item }}</li>
              </ol>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const faqs = ref([
  {
    question: 'Какие документы необходимы для подачи заявки на ипотеку',
    answer: [
      'Паспорт ( скан всех страниц, включая пустые )',
      'СНИЛС',
      'Заверенная копия трудовой книжки',
      'Справка о доходах ( 2НДФЛ или по форме банка )',
      'Военный билет для мужчин, не достигших 27-летнего возвраста'
    ],
    isOpen: true
  },
  {
    question: 'Какой срок действия документов для ипотеки?',
    answer: ['Срок действия документов для ипотеки обычно составляет 30 дней с момента выдачи. Справка о доходах (2-НДФЛ) действительна в течение месяца.'],
    isOpen: false
  },
  {
    question: 'Смогу ли я получить одобрение без справки 2НДФЛ',
    answer: ['Да, некоторые банки принимают альтернативные способы подтверждения дохода, например, справку по форме банка или выписку со счета.'],
    isOpen: false
  },
  {
    question: 'Я трудоустроен не официально, но доход стабилен, смогу ли получить одобрение ?',
    answer: ['Банки требуют официальное подтверждение дохода. Однако некоторые программы ипотеки предусматривают альтернативные способы подтверждения платежеспособности. Рекомендуем обратиться к нашим специалистам для консультации.'],
    isOpen: false
  },
  {
    question: 'Какой минимальный первоначальный взнос?',
    answer: ['Минимальный первоначальный взнос зависит от выбранной программы ипотеки. Обычно он составляет от 15% до 20% от стоимости недвижимости. Для некоторых льготных программ возможно снижение до 10%.'],
    isOpen: false
  },
  {
    question: 'Кто может получить семейную ипотеку?',
    answer: ['Семейную ипотеку могут получить семьи, в которых есть хотя бы один ребенок, рожденный с 1 января 2018 года. Также программа доступна для семей с детьми-инвалидами.'],
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>
