<template>
  <section class="bg-[#2a2c38] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center"
        >
          <div class="text-[#F2994A] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4">
            {{ stat.value }}
          </div>
          <div class="text-white text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = ref([
  { value: '15+', label: 'Лет на рынке' },
  { value: '50+', label: 'Завершенных проектов' },
  { value: '1000+', label: 'Довольных клиентов' },
  { value: '24/7', label: 'Поддержка' }
])
</script>
