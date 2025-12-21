<template>
  <Transition name="fade">
    <button 
      v-show="showButton"
      @click="scrollUp"
      class="fixed right-6 lg:right-8 xl:right-10 bottom-8 lg:bottom-10 xl:bottom-12 z-50 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-transparent flex items-center justify-center group transition-all duration-300 hover:opacity-90"
      aria-label="Прокрутить вверх"
    >
      <NuxtImg
        src="/images/icons/scroll-to-top.webp"
        alt="Прокрутить вверх"
        class="w-full h-full object-contain"
        loading="lazy"
      />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  // Показываем кнопку после прокрутки на 300px
  showButton.value = window.scrollY > 300
}

const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Проверить начальное состояние
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
