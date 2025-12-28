<template>
  <section class="w-full bg-[#2A2C38] py-12 md:py-16 lg:py-20 xl:py-24">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Title -->
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase tracking-wider mb-8 md:mb-12 lg:mb-16">
        ПОХОЖИЕ КВАРТИРЫ
      </h2>

      <!-- Apartment Cards -->
      <div class="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
        <NuxtLink
          v-for="(apartment, index) in similarApartments"
          :key="index"
          :to="`/apartment/${apartment.id || index + 1}`"
          class="bg-[#D9D9D9] rounded-lg md:rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-center sm:items-center gap-4 md:gap-6 hover:bg-[#C9C9C9] transition-colors cursor-pointer text-center sm:text-left"
        >
          <!-- Floor Plan Icon (Left) -->
          <div class="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white border border-gray-300 rounded flex items-center justify-center overflow-hidden">
            <img
              :src="apartment.planImage"
              :alt="`Планировка ${apartment.rooms}`"
              class="w-full h-full object-contain p-1"
              @error="handleImageError"
            />
          </div>

          <!-- Main Apartment Details (Middle) -->
          <div class="flex-1 flex flex-col gap-2 md:gap-3 min-w-0">
            <!-- Complex Name -->
            <p class="text-[#666666] text-xs md:text-sm uppercase font-medium">
              {{ apartment.complex }}
            </p>
            
            <!-- Rooms and Area -->
            <p class="text-[#333333] text-sm md:text-base lg:text-lg font-bold uppercase">
              {{ apartment.rooms }}, {{ apartment.area }}
            </p>
            
            <!-- Cost Details -->
            <div class="flex flex-col gap-1 w-full max-w-[280px] mx-auto sm:mx-0">
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-[#666666] text-xs md:text-sm uppercase whitespace-nowrap">СТОИМОСТЬ</span>
                <span class="text-[#333333] text-sm md:text-base font-medium">{{ apartment.price }}</span>
              </div>
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-[#666666] text-xs md:text-sm uppercase whitespace-nowrap">ЦЕНА ЗА М²:</span>
                <span class="text-[#333333] text-sm md:text-base font-medium">{{ apartment.pricePerM2 }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Information (Right) -->
          <div class="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
            <p class="text-[#333333] text-xs md:text-sm whitespace-nowrap">
              {{ apartment.location }}
            </p>
            <p class="text-[#333333] text-xs md:text-sm whitespace-nowrap">
              {{ apartment.completion }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Show More Button -->
      <div class="flex justify-center">
        <button class="bg-white border border-gray-400 rounded-full px-6 md:px-8 lg:px-10 py-2 md:py-3 text-[#333333] text-sm md:text-base font-medium uppercase hover:bg-gray-50 transition-colors">
          ПОКАЗАТЬ ЕЩЁ
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const similarApartments = ref([
  {
    id: 1,
    complex: 'ЭКОГОРОД 3',
    rooms: '1 КОМНАТА',
    area: '43.08 КВ.М.',
    price: '4 006 440 Руб.',
    pricePerM2: '93 000 Руб.',
    location: 'Дом 1, этаж 1, подъезд 1',
    completion: 'Сдача в 1 квартале 2028',
    planImage: '/images/plans/similar-apartment-1.webp'
  },
  {
    id: 2,
    complex: 'ЭКОГОРОД 3',
    rooms: '1 КОМНАТА',
    area: '43.08 КВ.М.',
    price: '4 006 440 Руб.',
    pricePerM2: '93 000 Руб.',
    location: 'Дом 1, этаж 1, подъезд 1',
    completion: 'Сдача в 1 квартале 2028',
    planImage: '/images/plans/similar-apartment-2.webp'
  },
  {
    id: 3,
    complex: 'ЭКОГОРОД 3',
    rooms: '1 КОМНАТА',
    area: '43.08 КВ.М.',
    price: '4 006 440 Руб.',
    pricePerM2: '93 000 Руб.',
    location: 'Дом 1, этаж 1, подъезд 1',
    completion: 'Сдача в 1 квартале 2028',
    planImage: '/images/plans/similar-apartment-3.webp'
  }
])

const handleImageError = (event) => {
  // Fallback to placeholder if image fails to load
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="10" fill="%239ca3af"%3EПлан%3C/text%3E%3C/svg%3E'
}
</script>

