<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        <!-- Contact Info -->
        <div class="text-white">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10">
            Контакты
          </h2>
          
          <div class="space-y-6 md:space-y-8">
            <!-- Address -->
            <div>
              <h3 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Адрес</h3>
              <p class="text-gray-300 text-base md:text-lg lg:text-xl">
                г. Ярославль, ул. Примерная, д. 1
              </p>
            </div>

            <!-- Phone -->
            <div>
              <h3 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Телефон</h3>
              <a href="tel:+74852333362" class="text-gray-300 text-base md:text-lg lg:text-xl hover:text-[#F2994A] transition-colors">
                +7 (4852) 33-33-62
              </a>
            </div>

            <!-- Email -->
            <div>
              <h3 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Email</h3>
              <a href="mailto:info@pobedonoscev.ru" class="text-gray-300 text-base md:text-lg lg:text-xl hover:text-[#F2994A] transition-colors">
                info@pobedonoscev.ru
              </a>
            </div>

            <!-- Working Hours -->
            <div>
              <h3 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Время работы</h3>
              <p class="text-gray-300 text-base md:text-lg lg:text-xl">
                Пн-Пт: 09:00 - 18:00<br />
                Сб-Вс: Выходной
              </p>
            </div>
          </div>
        </div>

        <!-- Map/Image -->
        <div class="rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden aspect-square">
          <img
            src="/images/map.webp"
            alt="Карта"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Contact Section Component
</script>
