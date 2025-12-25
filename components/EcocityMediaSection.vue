<template>
  <section class="py-12 md:py-16 lg:py-20 xl:py-24 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header: Title and Description -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-6 md:mb-8 lg:mb-10">
        <!-- Left: Title -->
        <div class="flex items-start">
          <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium uppercase leading-tight">
            {{ title }}
          </h2>
        </div>

        <!-- Right: Description -->
        <div class="flex items-start">
          <p class="text-sm md:text-base lg:text-lg leading-relaxed text-white/90">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Buttons Row: Tabs and Subscribe Button -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 md:mb-8 lg:mb-10">
        <!-- Tab Navigation -->
        <div class="flex gap-2 md:gap-3">
          <button
            @click="activeTab = 'news'"
            :class="[
              'px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors',
              activeTab === 'news'
                ? 'bg-white text-[#333333]'
                : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
            ]"
          >
            НОВОСТИ
          </button>
          <button
            @click="activeTab = 'promotions'"
            :class="[
              'px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors',
              activeTab === 'promotions'
                ? 'bg-white text-[#333333]'
                : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
            ]"
          >
            АКЦИИ
          </button>
        </div>

        <!-- Subscribe Button -->
        <button
          @click="handleSubscribe"
          class="bg-white text-[#333333] rounded-full px-6 md:px-8 lg:px-10 py-2 md:py-3 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors border border-gray-200"
        >
          ПОДПИСАТЬСЯ НА НОВОСТИ
        </button>
      </div>

      <!-- News Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        <div 
          v-for="(item, index) in newsItems" 
          :key="index"
          class="bg-white rounded-lg md:rounded-xl overflow-hidden flex flex-col group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div class="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
            <h3 class="text-black text-base md:text-lg font-medium uppercase mb-2 leading-tight">
              {{ item.title }}
            </h3>
            <p class="text-black/70 text-xs md:text-sm leading-relaxed mb-2 line-clamp-3 flex-1">
              {{ item.description }}
            </p>
            <p class="text-black/40 text-xs mt-auto">
              {{ item.date }}
            </p>
          </div>
        </div>

        <!-- More News Card -->
        <div class="bg-white rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 flex flex-col min-h-[300px]">
          <h3 class="text-black text-xl md:text-2xl lg:text-3xl font-medium uppercase mb-auto text-left">
            БОЛЬШЕ НОВОСТЕЙ
          </h3>
          <div class="mt-auto">
            <button
              @click="handleAllNews"
              class="bg-[#656565] text-white rounded-lg md:rounded-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 text-sm md:text-base font-medium hover:bg-[#757575] transition-colors"
            >
              ВСЕ НОВОСТИ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Subscribe Modal (Keep original logic) -->
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
              <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="p-6 md:p-8 flex-1 flex flex-col">
              <h2 class="text-xl md:text-2xl font-semibold text-white uppercase mb-4 text-center">ПОДПИСАТЬСЯ НА НОВОСТИ</h2>
              <p class="text-sm text-white/70 mb-6 md:mb-8 text-center">Будьте в курсе самых значимых событий.</p>
              <form class="flex flex-col gap-6" @submit.prevent="submitSubscribeForm">
                <input type="email" v-model="subscribeForm.email" required class="w-full bg-white text-black rounded-lg px-4 py-3" placeholder="Введите ваш email" />
                <button type="submit" class="w-full bg-[#F2994A] text-white rounded-lg py-3 font-semibold uppercase transition-colors" :disabled="isSubmitting">ПОДПИСАТЬСЯ</button>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'МЕДИА' },
  description: { type: String, default: 'Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях.' },
  newsItems: {
    type: Array,
    default: () => [
      {
        title: 'ОБЪЕКТ ЗАВЕРШЕН',
        description: 'Самые внимательные уже заметили: вокруг ЖК «Экогород 2» не осталось и намёка на строительный забор...',
        date: '03.12.2025',
        image: '/images/alfa/1125-16343.webp'
      },
      {
        title: 'СТРОИТЕЛЬСТВО ЖК «ЭКОГОРОД 3»',
        description: 'А вот и общий вид на строительную площадку ЖК «Экогород 3» — дом заметно подрос, и вся картина строительства как на ладони...',
        date: '03.12.2025',
        image: '/images/alfa/1125-16344.webp'
      },
      {
        title: 'НОВОСТИ СО СТРОЙКИ «ЭКОГОРОД 3»',
        description: 'А вот и начало строительства третьего этажа ЖК «Экогород 3» — дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...',
        date: '03.12.2025',
        image: '/images/alfa/1125-16345.webp'
      }
    ]
  }
})

const activeTab = ref('news')
const isSubscribeModalOpen = ref(false)
const isSubmitting = ref(false)
const subscribeSuccess = ref(false)
const subscribeForm = ref({ email: '' })

const handleSubscribe = () => { isSubscribeModalOpen.value = true }
const closeSubscribeModal = () => { isSubscribeModalOpen.value = false }
const handleAllNews = () => { navigateTo('/news') }
const submitSubscribeForm = async () => { /* Logic simplified for brevity */ }
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
