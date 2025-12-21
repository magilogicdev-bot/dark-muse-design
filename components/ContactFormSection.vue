<template>
  <section class="w-full bg-[#2A2C38] py-12 md:py-16 lg:py-20 xl:py-24">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
        <!-- Left Column: Contact Form -->
        <div class="flex flex-col gap-6 md:gap-8">
          <!-- Title -->
          <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight">
            Заполните форму и мы с вами свяжемся
          </h2>
          
          <!-- Subtitle -->
          <p class="text-white text-base md:text-lg lg:text-xl leading-relaxed">
            Разбиремся в тонкостях сделки
          </p>

          <!-- Form -->
          <form @submit.prevent="submitForm" class="flex flex-col gap-4 md:gap-5 lg:gap-6">
            <!-- Name Input -->
            <input
              type="text"
              v-model="form.name"
              required
              class="bg-white text-[#333333] rounded-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00] placeholder:text-gray-400"
              placeholder="Введите ваше Имя"
            />

            <!-- Phone Input -->
            <input
              type="tel"
              v-model="form.phone"
              required
              class="bg-white text-[#333333] rounded-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00] placeholder:text-gray-400"
              placeholder="Номер телефона"
            />

            <!-- Email Input -->
            <input
              type="email"
              v-model="form.email"
              required
              class="bg-white text-[#333333] rounded-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00] placeholder:text-gray-400"
              placeholder="Электронную почту"
            />

            <!-- Submit Button -->
            <button
              type="submit"
              class="bg-[#FF8C00] hover:bg-[#FF9F34] text-white rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium uppercase transition-colors cursor-pointer w-fit"
            >
              ОТПРАВИТЬ
            </button>
          </form>
        </div>

        <!-- Right Column: Image -->
        <div class="flex items-center justify-center">
          <div class="w-full rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden">
            <img
              src="/images/contact-form-complex.webp"
              alt="Жилой комплекс"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  name: '',
  phone: '',
  email: ''
})

const submitForm = () => {
  // Handle form submission
  console.log('Contact form submitted:', form.value)
  // Reset form after submission
  form.value = {
    name: '',
    phone: '',
    email: ''
  }
}

const handleImageError = (event) => {
  // Fallback to placeholder if image fails to load
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%239ca3af"%3EИзображение комплекса%3C/text%3E%3C/svg%3E'
}
</script>

