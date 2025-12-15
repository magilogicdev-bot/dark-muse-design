<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 text-center">
        ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
      </h2>
      
      <div class="space-y-4 md:space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span class="text-white text-lg md:text-xl lg:text-2xl font-semibold pr-4">
              {{ faq.question }}
            </span>
            <svg
              :class="['w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 text-white flex-shrink-0', faq.isOpen && 'rotate-180']"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
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
              <p class="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
                {{ faq.answer }}
              </p>
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
    question: 'Как оформить ипотеку?',
    answer: 'Для оформления ипотеки вам необходимо связаться с нашими специалистами, которые помогут подобрать оптимальную программу и подготовить все необходимые документы.',
    isOpen: false
  },
  {
    question: 'Какие документы нужны для покупки?',
    answer: 'Стандартный пакет документов включает паспорт, справку о доходах, выписку с банковского счета. Полный список документов зависит от выбранной программы ипотеки.',
    isOpen: false
  },
  {
    question: 'Можно ли использовать материнский капитал?',
    answer: 'Да, материнский капитал можно использовать для первоначального взноса или погашения долга по ипотеке. Наши специалисты помогут правильно оформить все документы.',
    isOpen: false
  },
  {
    question: 'Какие сроки строительства?',
    answer: 'Сроки строительства зависят от конкретного проекта. Обычно строительство жилого комплекса занимает 2-3 года с момента начала работ.',
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>
