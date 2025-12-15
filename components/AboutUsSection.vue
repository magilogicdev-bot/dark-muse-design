<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 md:mb-16">
        <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 md:mb-10">
          Pobedonoscev
        </h1>
      </div>

      <!-- Content Sections -->
      <div class="space-y-12 md:space-y-16 lg:space-y-20">
        <!-- Text Section with Image -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div class="space-y-6 text-white text-base md:text-lg lg:text-xl leading-relaxed">
            <p>
              Компания Pobedonoscev Group — один из ведущих застройщиков в регионе, специализирующийся на создании комфортного жилья для современных семей.
            </p>
            <p>
              Мы строим не просто дома, а создаём пространства для жизни, где каждая деталь продумана для максимального комфорта и уюта наших жильцов.
            </p>
          </div>
          <div class="rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/about-1.webp"
              alt="О компании"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Image Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div class="rounded-lg md:rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/about-2.webp"
              alt="Проект"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="rounded-lg md:rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/about-3.webp"
              alt="Проект"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Team Section -->
        <div class="bg-white/5 rounded-lg md:rounded-xl lg:rounded-2xl p-8 md:p-12">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-10">
            Наша команда
          </h2>
          <div class="rounded-lg md:rounded-xl overflow-hidden aspect-[16/9] mb-8">
            <img
              src="/images/team.webp"
              alt="Команда"
              class="w-full h-full object-cover"
            />
          </div>
          <p class="text-white text-base md:text-lg lg:text-xl leading-relaxed">
            Наша команда состоит из опытных профессионалов: архитекторов, строителей, менеджеров проектов, которые работают над каждым проектом с максимальной отдачей и вниманием к деталям.
          </p>
        </div>

        <!-- Awards Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div class="bg-white/5 rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center mx-auto">
            <svg class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <div class="bg-white/5 rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center mx-auto">
            <svg class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <div class="bg-white/5 rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center mx-auto">
            <svg class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// About Us Section Component
</script>
