<template>
  <section class="bg-primary py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
        <div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8">
            ИПОТЕКА
          </h2>
        </div>
        <div class="flex items-start">
          <p class="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
            Ипотека — один из самых удобных способов приобрести собственное жильё. Она позволяет въехать в новую квартиру уже сейчас, оплачивая её стоимость постепенно, без необходимости годами копить всю сумму.
          </p>
        </div>
      </div>
      
      <!-- Benefits Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <!-- Card 1: Программы со сниженной ставкой -->
        <div class="bg-neutral-50 rounded-md p-5 md:p-6 lg:p-8">
          <div class="flex flex-col gap-3 md:gap-4">
            <div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full border border-gray-200">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 class="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
              Программы со сниженной ставкой
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Современные ипотечные программы предлагают выгодные условия: сниженные ставки, господдержка и специальные предложения от банков. Это делает покупку недвижимости доступной для большего числа семей.
            </p>
          </div>
        </div>
        
        <!-- Card 2: Минимум действий с вашей стороны -->
        <div class="bg-neutral-50 rounded-md p-5 md:p-6 lg:p-8">
          <div class="flex flex-col gap-3 md:gap-4">
            <div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full border border-gray-200">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
              Минимум действий с вашей стороны
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Большинство банков позволяют оформить ипотеку онлайн: загрузить документы, получить предварительное решение и согласовать параметры — всё дистанционно, без очередей и лишних поездок.
            </p>
          </div>
        </div>
        
        <!-- Card 3: Одобрение за несколько минут -->
        <div class="bg-neutral-50 rounded-md p-5 md:p-6 lg:p-8">
          <div class="flex flex-col gap-3 md:gap-4">
            <div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full border border-gray-200">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <h3 class="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
              Одобрение за несколько минут
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Благодаря цифровым сервисам многие решения принимаются практически мгновенно. Вы сразу видите доступные условия и можете переходить к выбору квартиры.
            </p>
          </div>
        </div>
        
        <!-- Card 4: Удобные способы оплаты -->
        <div class="bg-neutral-50 rounded-md p-5 md:p-6 lg:p-8">
          <div class="flex flex-col gap-3 md:gap-4">
            <div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full border border-gray-200">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 3v6h6" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h4m-2-2l2 2-2 2" />
              </svg>
            </div>
            <h3 class="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
              Удобные способы оплаты
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Первоначальный взнос и последующие платежи можно вносить любым удобным способом: картой, по реквизитам или через онлайн-банк. Никаких скрытых комиссий — только понятный и прозрачный график платежей.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

