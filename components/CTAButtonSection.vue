<template>
  <section class="bg-[#F2994A] py-16 md:py-20 lg:py-24">
    <div class="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-8">
        {{ title }}
      </h2>
      <p v-if="description" class="text-white text-lg md:text-xl lg:text-2xl mb-8 md:mb-10">
        {{ description }}
      </p>
      <button
        @click="handleClick"
        class="bg-white text-[#F2994A] rounded-lg px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold uppercase hover:bg-gray-100 transition-colors"
      >
        {{ buttonText }}
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Готовы начать?'
  },
  description: {
    type: String,
    default: 'Свяжитесь с нами сегодня и получите персональную консультацию'
  },
  buttonText: {
    type: String,
    default: 'Связаться с нами'
  }
})

const handleClick = () => {
  // Handle CTA click
  console.log('CTA clicked')
}
</script>
