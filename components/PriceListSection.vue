<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-[clamp(2rem,7.2vw,128px)] font-medium uppercase leading-[1.125] mb-12 md:mb-16 lg:mb-20">
        ЦЕНЫ И ПЛАНИРОВКИ
      </h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-white">
          <thead>
            <tr class="border-b border-white/20">
              <th class="text-left py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold">Количество комнат</th>
              <th class="text-left py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold">Площадь, м²</th>
              <th class="text-left py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold">Этаж</th>
              <th class="text-left py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold">Цена, ₽</th>
              <th class="text-left py-4 md:py-5 px-4 md:px-6 text-base md:text-lg lg:text-xl font-semibold">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in priceList"
              :key="index"
              class="border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <td class="py-4 md:py-5 px-4 md:px-6 text-base md:text-lg">{{ item.rooms }}</td>
              <td class="py-4 md:py-5 px-4 md:px-6 text-base md:text-lg">{{ item.area }}</td>
              <td class="py-4 md:py-5 px-4 md:px-6 text-base md:text-lg">{{ item.floor }}</td>
              <td class="py-4 md:py-5 px-4 md:px-6 text-base md:text-lg font-semibold text-[#F2994A]">{{ item.price }}</td>
              <td class="py-4 md:py-5 px-4 md:px-6">
                <button class="text-[#F2994A] hover:text-[#e8893a] text-base md:text-lg font-medium transition-colors">
                  Подробнее
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
const priceList = ref([
  { rooms: 'Студия', area: '28.5', floor: '3-10', price: '4 800 000 ₽' },
  { rooms: '1 комната', area: '42.3', floor: '2-12', price: '6 200 000 ₽' },
  { rooms: '2 комнаты', area: '65.7', floor: '1-15', price: '8 500 000 ₽' },
  { rooms: '3 комнаты', area: '89.2', floor: '4-18', price: '11 200 000 ₽' },
  { rooms: '4 комнаты', area: '125.5', floor: '5-20', price: '15 800 000 ₽' }
])
</script>
