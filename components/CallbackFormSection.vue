<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-12 md:mb-16">
        ОБРАТНЫЙ ЗВОНОК
      </h2>
      
      <div class="bg-white/5 border border-white/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-12">
        <form class="space-y-6 md:space-y-8" @submit.prevent="submitForm">
          <!-- Name Input -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Имя
            </label>
            <input
              type="text"
              v-model="form.name"
              required
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="Введите ваше имя"
            />
          </div>

          <!-- Phone Input -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Телефон
            </label>
            <input
              type="tel"
              v-model="form.phone"
              required
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <!-- Message Input -->
          <div class="flex flex-col">
            <label class="text-white text-base md:text-lg lg:text-xl mb-3 md:mb-4 font-medium">
              Сообщение
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              class="bg-white text-black rounded-lg px-4 md:px-6 py-3 md:py-4 text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-[#F2994A] resize-none"
              placeholder="Оставьте сообщение (необязательно)"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-[#F2994A] hover:bg-[#e8893a] text-white rounded-lg px-8 md:px-12 py-4 md:py-5 text-base md:text-lg lg:text-xl font-semibold uppercase transition-colors cursor-pointer"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  name: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
  // Reset form after submission
  form.value = {
    name: '',
    phone: '',
    message: ''
  }
}
</script>
