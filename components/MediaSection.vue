<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Header Row - title left, desc right -->
      <div class="mb-12 md:mb-16 lg:mb-20">
        <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-10 lg:mb-16">
          <!-- Left: Section title -->
          <div class="flex-shrink-0">
            <h2 class="text-fluid-6xl font-medium uppercase tracking-[0.02em] leading-[0.9]">МЕДИА</h2>
          </div>
          
          <!-- Right: Description -->
          <div class="md:max-w-[50%] lg:max-w-[660px] lg:pt-2">
            <p class="text-[14px] md:text-[15px] lg:text-[16px] text-white/80 leading-[1.6] tracking-[0.05em] text-left">
              Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях, изменения в законодательстве и события из жизни нашей компании.
            </p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8">
          <!-- Filter Buttons (Bottom Left) -->
          <div class="flex flex-wrap gap-3">
            <button class="px-8 h-[44px] rounded-full bg-white text-black text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-gray-100 transition-colors">
              новости
            </button>
            <button class="px-8 h-[44px] rounded-full border border-white/30 text-white text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-white/10 transition-colors">
              АКЦИИ
            </button>
          </div>
          
          <!-- Subscribe Button (Bottom Right) -->
          <button 
            @click="handleSubscribe"
            class="px-12 h-[44px] rounded-full bg-white text-black text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-gray-100 transition-all flex items-center justify-center"
          >
            подписаться на новости
          </button>
        </div>
      </div>

      <!-- News Cards Grid - equal height cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <!-- News Card -->
        <article
          v-for="(item, idx) in posts"
          :key="idx"
          class="bg-white rounded-[12px] overflow-hidden flex flex-col group cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
        >
          <!-- Image -->
          <div class="aspect-[1.25/1] overflow-hidden flex-shrink-0">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
          
          <!-- Content -->
          <div class="p-8 flex-1 flex flex-col">
            <h4 class="text-[12px] font-bold text-black uppercase mb-4 tracking-[0.15em] leading-tight">{{ item.category }}</h4>
            <div class="flex-1 mb-8">
              <p class="text-[13px] text-black/70 leading-[1.6] line-clamp-4 tracking-[0.02em]">{{ item.text }}</p>
            </div>
            <div>
              <span class="text-[11px] text-black/40 font-bold tracking-[0.1em] uppercase">{{ item.date }}</span>
            </div>
          </div>
        </article>

        <!-- More News Card -->
        <div class="bg-white rounded-[12px] overflow-hidden flex flex-col p-10 group cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500">
          <div class="flex-1 flex flex-col justify-start">
            <h3 class="text-[36px] font-medium leading-[1.1] text-black uppercase tracking-[0.02em]">
              БОЛЬШЕ<br>НОВОСТЕЙ
            </h3>
          </div>
          <button class="w-full h-[56px] bg-[#616161] rounded-[10px] text-white text-[13px] font-medium uppercase tracking-[0.15em] hover:bg-black transition-all duration-300 mt-12">
            все новости
          </button>
        </div>
      </div>

      <!-- Pagination Dots (Mobile only) -->
      <div class="flex justify-center gap-2 mt-6 lg:hidden">
        <span class="w-[8px] h-[8px] rounded-full bg-white"></span>
        <span class="w-[8px] h-[8px] rounded-full bg-white/30"></span>
      </div>
    </div>

    <!-- Subscribe Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="isSubscribeModalOpen"
          class="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center p-0 md:p-4"
          @click.self="closeSubscribeModal"
        >
          <div class="relative w-full h-full md:h-auto md:max-w-[500px] bg-[#1a1d28] rounded-none md:rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <button
              class="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white cursor-pointer transition-all hover:bg-white/20 hover:scale-110"
              @click="closeSubscribeModal"
              aria-label="Закрыть"
            >
              <svg
                class="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div class="p-6 md:p-8 flex-1 flex flex-col">
              <h2 class="text-xl md:text-2xl font-semibold text-white uppercase mb-4 text-right">
                ПОДПИСАТЬСЯ НА НОВОСТИ
              </h2>
              
              <p class="text-sm md:text-sm text-white/70 mb-6 md:mb-8 text-right leading-relaxed">
                Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях.
              </p>

              <form class="flex flex-col gap-6 flex-1" @submit.prevent="submitSubscribeForm">
                <div class="flex flex-col">
                  <label class="text-white text-sm md:text-base font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    v-model="subscribeForm.email"
                    required
                    class="w-full bg-white text-black rounded-lg px-4 py-3 md:py-3.5 text-sm md:text-base border-none outline-none focus:outline-2 focus:outline-[#F2994A] focus:outline-offset-2 transition-all"
                    placeholder="Введите ваш email"
                  />
                </div>

                <button
                  type="submit"
                  class="w-full bg-[#F2994A] hover:bg-[#e8893a] text-white rounded-lg px-4 py-3 md:py-4 text-sm md:text-base font-semibold uppercase transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">ПОДПИСАТЬСЯ</span>
                  <span v-else>ОТПРАВКА...</span>
                </button>
              </form>

              <div v-if="subscribeSuccess" class="flex flex-col items-center gap-4 pt-6 md:pt-8 mt-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-white text-sm md:text-base text-center">
                  Спасибо! Вы успешно подписались на новости.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isSubscribeModalOpen = ref(false)
const isSubmitting = ref(false)
const subscribeSuccess = ref(false)

const subscribeForm = ref({
  email: ''
})

const posts = [
  {
    date: '03.12.2025',
    category: 'ОБЬЕКТ ЗАВЕРШЕН',
    title: 'Завершение проекта',
    text: 'Самые внимательные уже заметили: вокруг ЖК «Экогород 2» не осталось и намёка на строительный забор...',
    image: '/images/media-1.webp'
  },
  {
    date: '03.12.2025',
    category: 'СТРОИТЕЛЬСТВО ЖК «ЭКОГОРОД 3»',
    title: 'Ход строительства',
    text: 'А вот и общий вид на строительную площадку ЖК «Экогород 3» – дом заметно подрос, и вся картина строительства как на ладони...',
    image: '/images/media-2.webp'
  },
  {
    date: '03.12.2025',
    category: 'НОВОСТИ СО СТРОЙКИ «ЭКОГОРОД 3»',
    title: 'Третий этаж',
    text: 'А вот и начало строительства третьего этажа ЖК «Экогород 3» – дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...',
    image: '/images/media-3.webp'
  }
]

const handleSubscribe = () => {
  isSubscribeModalOpen.value = true
  subscribeSuccess.value = false
  subscribeForm.value.email = ''
}

const closeSubscribeModal = () => {
  isSubscribeModalOpen.value = false
  // Reset form after a delay to allow animation to complete
  setTimeout(() => {
    subscribeForm.value.email = ''
    subscribeSuccess.value = false
  }, 300)
}

const submitSubscribeForm = async () => {
  if (!subscribeForm.value.email) return

  isSubmitting.value = true

  try {
    // Here you would typically send the email to your backend API
    // For now, we'll simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Subscribing email:', subscribeForm.value.email)
    
    // Show success message
    subscribeSuccess.value = true
    
    // Close modal after 2 seconds
    setTimeout(() => {
      closeSubscribeModal()
    }, 2000)
  } catch (error) {
    console.error('Error subscribing:', error)
    // You could add error handling here
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transition animations for modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active > div,
.modal-fade-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from > div,
.modal-fade-leave-to > div {
  opacity: 0;
  transform: scale(0.9);
}
</style>
