<template>
  <div class="bg-primary text-white min-h-screen font-sans selection:bg-[#d4a574] selection:text-primary">
    <!-- Back Button -->
    <div class="fixed top-0 left-0 z-50 w-full pointer-events-none">
       <div class="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-8">
         <NuxtLink to="/" class="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors group pointer-events-auto">
          <svg class="w-6 h-3 transition-transform group-hover:-translate-x-1" viewBox="0 0 28 12" fill="none">
            <path d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM28 5.25L1 5.25V6.75L28 6.75V5.25Z" fill="currentColor"/>
          </svg>
          <span class="text-xs tracking-[0.25em] uppercase font-normal">НАЗАД</span>
        </NuxtLink>
       </div>
    </div>

    <!-- Biography Section -->
    <section class="biography-section pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 overflow-hidden relative">
      
      <!-- Decorative Horizontal Lines -->
      <div class="absolute top-28 md:top-32 lg:top-36 xl:top-40 left-0 w-full h-px bg-white/10"></div>
      <div class="absolute bottom-16 md:bottom-20 lg:bottom-24 xl:bottom-28 left-0 w-full h-px bg-white/10"></div>
      
      <div class="max-w-[1770px] mx-auto h-full relative">
        
        <!-- Vertical Decorative Line - Desktop only (between text and photo) -->
        <div class="hidden lg:block absolute right-[28%] xl:right-[26%] 2xl:right-[24%] top-0 bottom-0 w-px bg-white/10 z-0"></div>

        <!-- ========== MOBILE LAYOUT (< 768px) ========== -->
        <div class="flex flex-col gap-6 sm:gap-8 md:hidden pt-6 sm:pt-8 pb-4">
          
          <!-- Mobile: Horizontal Timeline -->
          <div class="flex gap-5 sm:gap-6 overflow-x-auto pb-4 noscrollbar border-b border-white/10 -mx-5 sm:-mx-6 px-5 sm:px-6">
            <button 
              v-for="item in timelineYears" 
              :key="item.year"
              @click="setActiveYear(item.year)"
              class="font-light text-[13px] sm:text-sm tracking-[0.15em] whitespace-nowrap pb-2 border-b-2 transition-all duration-300 shrink-0"
              :class="{ 'border-[#d4a574] text-white': activeYear === item.year, 'border-transparent text-white/40 hover:text-white/70': activeYear !== item.year }"
            >
              {{ item.year }}
            </button>
          </div>

          <!-- Mobile: Portrait (centered) -->
          <div class="flex flex-col items-center">
            <div class="relative w-[55vw] max-w-[220px] sm:max-w-[260px] aspect-[3/4] shadow-2xl">
              <img 
                src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                alt="Победоносцев Алексей Николаевич" 
                class="w-full h-full object-cover"
              />
            </div>
            <p class="bio-signature text-base sm:text-lg text-white/70 mt-4 text-center max-w-[220px] sm:max-w-[260px]">
              Победоносцев Алексей Николаевич
            </p>
          </div>

          <!-- Mobile: Biography Text -->
          <div class="flex flex-col mt-2">
            <transition name="fade" mode="out-in">
              <div :key="activeYear" class="flex flex-col gap-6 sm:gap-8">
                <p class="bio-text text-base sm:text-lg leading-[1.6] sm:leading-[1.7] text-white/90">
                  {{ currentBiography.text }}
                </p>
                
                <!-- Quote -->
                <div class="flex flex-col items-center mt-2">
                  <p class="bio-quote text-lg sm:text-xl text-white/80 text-center">
                    <span class="text-sm sm:text-base align-top mr-1 opacity-60">«</span>
                    <span class="bio-quote-line block">{{ currentBiography.quote1 }}</span>
                    <span class="bio-quote-line block">{{ currentBiography.quote2 }}</span>
                    <span class="text-sm sm:text-base align-top ml-1 opacity-60">»</span>
                  </p>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- ========== TABLET LAYOUT (768px - 1024px) ========== -->
        <div class="hidden md:flex lg:hidden flex-col gap-8 pt-10 pb-8">
          
          <!-- Tablet: Horizontal Timeline (centered) -->
          <div class="flex gap-7 justify-start pb-5 border-b border-white/10">
            <button 
              v-for="item in timelineYears" 
              :key="item.year"
              @click="setActiveYear(item.year)"
              class="font-light text-sm tracking-[0.18em] whitespace-nowrap pb-2 border-b-2 transition-all duration-300"
              :class="{ 'border-[#d4a574] text-white': activeYear === item.year, 'border-transparent text-white/40 hover:text-white/70': activeYear !== item.year }"
            >
              {{ item.year }}
            </button>
          </div>

          <!-- Tablet: Content Grid -->
          <div class="grid grid-cols-[1fr_35%] gap-8 items-start">
            
            <!-- Biography Text -->
            <div class="flex flex-col pt-1">
              <transition name="fade" mode="out-in">
                <div :key="activeYear" class="flex flex-col gap-8">
                  <p class="bio-text text-xl md:text-[22px] leading-[1.75] text-white/90">
                    {{ currentBiography.text }}
                  </p>
                  
                  <!-- Quote -->
                  <div class="flex flex-col items-center mt-4">
                    <p class="bio-quote text-2xl text-white/80 text-center leading-relaxed">
                      <span class="text-lg align-top mr-1 opacity-60">«</span>
                      <span class="bio-quote-line">{{ currentBiography.quote1 }}</span>
                      <br/>
                      <span class="bio-quote-line">{{ currentBiography.quote2 }}</span>
                      <span class="text-lg align-top ml-1 opacity-60">»</span>
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Portrait -->
            <div class="flex flex-col items-end">
              <div class="relative w-full max-w-[280px] aspect-[3/4] shadow-2xl">
                <img 
                  src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                  alt="Победоносцев Алексей Николаевич" 
                  class="w-full h-full object-cover"
                />
              </div>
              <p class="bio-signature text-xl text-white/70 mt-5 text-right max-w-[280px]">
                Победоносцев Алексей Николаевич
              </p>
            </div>
          </div>
        </div>

        <!-- ========== DESKTOP LAYOUT (1024px+) ========== -->
        <div class="hidden lg:grid grid-cols-[6.5%_1fr_27%] xl:grid-cols-[5.5%_1fr_25%] 2xl:grid-cols-[5%_1fr_23%] gap-6 xl:gap-10 2xl:gap-12 relative z-10 pt-8 xl:pt-10 2xl:pt-12 pb-6 xl:pb-8">
          
          <!-- Years Timeline (Left Column) -->
          <div class="flex flex-col gap-4 xl:gap-5 2xl:gap-6">
            <button 
              v-for="item in timelineYears" 
              :key="item.year"
              @click="setActiveYear(item.year)"
              class="text-left w-min font-light text-[13px] xl:text-sm 2xl:text-[15px] tracking-[0.18em] transition-all duration-300 hover:text-white group relative pb-1"
              :class="{ 'text-white': activeYear === item.year, 'text-white/40': activeYear !== item.year }"
            >
              {{ item.year }}
              <span 
                class="absolute bottom-0 left-0 h-[1.5px] bg-[#d4a574] transition-all duration-300"
                :class="activeYear === item.year ? 'w-full' : 'w-0 group-hover:w-1/2'"
              ></span>
            </button>
          </div>

          <!-- Biography Text (Center Column) -->
          <div class="flex flex-col relative z-10 pr-4 xl:pr-8 2xl:pr-12">
            <transition name="fade" mode="out-in">
              <div :key="activeYear" class="flex flex-col gap-10 xl:gap-14 2xl:gap-16">
                <!-- Main Biography Text -->
                <p class="bio-text text-xl lg:text-[22px] xl:text-[24px] 2xl:text-[26px] leading-[1.7] xl:leading-[1.75] 2xl:leading-[1.8] text-white/90">
                  {{ currentBiography.text }}
                </p>
                
                <!-- Quote - Centered -->
                <div class="flex flex-col items-center lg:items-center xl:pr-0">
                  <p class="bio-quote text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-white/80 text-center leading-[1.4] xl:leading-[1.45]">
                    <span class="text-base lg:text-lg xl:text-xl align-top mr-1 opacity-50">«</span>
                    <span class="bio-quote-line">{{ currentBiography.quote1 }}</span>
                    <br/>
                    <span class="bio-quote-line ml-8 xl:ml-12">{{ currentBiography.quote2 }}</span>
                    <span class="text-base lg:text-lg xl:text-xl align-top ml-1 opacity-50">»</span>
                  </p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Portrait (Right Column) -->
          <div class="relative flex flex-col items-end pl-4 xl:pl-6">
            <div class="relative w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[360px] aspect-[3/4] shadow-2xl">
              <img 
                src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                alt="Победоносцев Алексей Николаевич" 
                class="w-full h-full object-cover"
              />
            </div>
            <p class="bio-signature text-lg xl:text-xl 2xl:text-2xl text-white/70 mt-4 xl:mt-5 2xl:mt-6 text-right w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[360px]">
              Победоносцев Алексей Николаевич
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sketch Divider -->
    <section class="w-full relative py-12 sm:py-16 md:py-20 overflow-hidden">
       <img src="/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.webp" class="w-full h-auto object-cover max-h-[400px] md:max-h-[500px] lg:max-h-[600px] mix-blend-lighten opacity-40" alt="Sketch">
    </section>

    <!-- Content Block 1: Biography Text Block -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_45%] xl:grid-cols-[1fr_42%] gap-8 lg:gap-12 xl:gap-16 items-start">
          
          <!-- Text (Left on Desktop) -->
          <div class="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90 text-right lg:text-left">
              Алексей Николаевич Победоносцев начал свой профессиональный путь в 2006 году, сразу после получения образования. Его первой ступенькой в карьере стал Петровский завод ЖБИ, где ему предложили стать мастером-строителем.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90 text-right lg:text-left">
              Чтобы Алексей Николаевич мог продолжать развивать свои навыки и применять знания, для него была специально создана должность архитектора, ранее отсутствовавшая в штате предприятия. Таким образом, его карьера стартовала с одновременного выполнения двух ответственных ролей.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90 text-right lg:text-left">
              Проработав на заводе два года, Алексей Николаевич внес значительный вклад в его развитие. Затем было открыто новое направление – Отдел Капитального Строительства (ОКС). Ему было доверено возглавить это подразделение, заняв пост начальника и заместителя директора ОКС.
            </p>
          </div>
          
          <!-- Images Grid (Right on Desktop) -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
            <div class="overflow-hidden">
              <img src="/images/8eb0fa5c23e773b560582f5e95f3ec1f17c82b83.webp" alt="Проект 1" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/a9f3495b5dc55635957a7aade82d1b35127bfe7d.webp" alt="Проект 2" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/86796c6cb08432397f67604764eba6a806e696ca.webp" alt="Проект 3" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/987c8fb79aaaf1bcffad714c25b4ff4d60df7188.webp" alt="Проект 4" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sketch Divider 2 -->
    <section class="w-full relative py-8 sm:py-12 md:py-16 overflow-hidden">
       <img src="/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.webp" class="w-full h-auto object-cover max-h-[300px] md:max-h-[400px] mix-blend-lighten opacity-30" alt="Sketch">
    </section>

    <!-- Content Block 2: Images Left, Text Right -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[45%_1fr] xl:grid-cols-[42%_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
          
          <!-- Images Grid (Left on Desktop) -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4 order-1">
            <div class="overflow-hidden">
              <img src="/images/8eb0fa5c23e773b560582f5e95f3ec1f17c82b83.webp" alt="Проект" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/a9f3495b5dc55635957a7aade82d1b35127bfe7d.webp" alt="Храм" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden col-span-2">
              <img src="/images/86796c6cb08432397f67604764eba6a806e696ca.webp" alt="Резиденция" class="w-full h-auto object-cover aspect-[16/9]" />
            </div>
          </div>
          
          <!-- Text (Right on Desktop) -->
          <div class="flex flex-col gap-6 lg:gap-8 order-2">
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90">
              АСК "Новый Дом" – это не просто строительная компания, это команда профессионалов, которая много лет воплощает в жизнь самые смелые мечты о собственном пространстве.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90">
              Индивидуальные жилые дома и коттеджи: от уютных семейных гнездышек до роскошных загородных резиденций. Большие элитные особняки: воплощение статуса и безупречного вкуса.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90">
              Таунхаусы и блокированные дома: современное решение для комфортной жизни в гармонии с природой. Многоквартирные жилые дома: создаем комфортное и современное жилье для тысяч семей.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sketch Divider 3 -->
    <section class="w-full relative py-8 sm:py-12 md:py-16 overflow-hidden">
       <img src="/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.webp" class="w-full h-auto object-cover max-h-[300px] md:max-h-[400px] mix-blend-lighten opacity-30" alt="Sketch">
    </section>

    <!-- Content Block 3: Text Left, Images Right -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_45%] xl:grid-cols-[1fr_42%] gap-8 lg:gap-12 xl:gap-16 items-start">
          
          <!-- Text (Left on Desktop) -->
          <div class="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90 text-right lg:text-left">
              Мы гордимся нашими реализованными объектами, среди которых такие знаковые проекты, как: Жилой комплекс "Сирень", Жилые дома на улицах Яковлевская и Пионерская, Два современных жилых дома в Заволжье.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90 text-right lg:text-left">
              Компания организовала сильную команду талантливых дизайнеров, которые работают в тесном сотрудничестве с архитекторами. Вместе они доводят до совершенства экстерьеры зданий, прорабатывая фасады до мельчайших деталей.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90 text-right lg:text-left">
              Большое количество индивидуальных элитных дизайн-проектов, каждый из которых уникален и отражает неповторимый стиль.
            </p>
          </div>
          
          <!-- Images Grid (Right on Desktop) -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
            <div class="overflow-hidden col-span-2">
              <img src="/images/987c8fb79aaaf1bcffad714c25b4ff4d60df7188.webp" alt="Городская среда" class="w-full h-auto object-cover aspect-[16/9]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/8eb0fa5c23e773b560582f5e95f3ec1f17c82b83.webp" alt="Проект" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/a9f3495b5dc55635957a7aade82d1b35127bfe7d.webp" alt="Проект" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sketch Divider 4 -->
    <section class="w-full relative py-8 sm:py-12 md:py-16 overflow-hidden">
       <img src="/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.webp" class="w-full h-auto object-cover max-h-[300px] md:max-h-[400px] mix-blend-lighten opacity-30" alt="Sketch">
    </section>

    <!-- Content Block 4: Images Left, Text Right -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[45%_1fr] xl:grid-cols-[42%_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
          
          <!-- Images Grid (Left on Desktop) -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4 order-1">
            <div class="overflow-hidden">
              <img src="/images/86796c6cb08432397f67604764eba6a806e696ca.webp" alt="Резиденция" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden">
              <img src="/images/987c8fb79aaaf1bcffad714c25b4ff4d60df7188.webp" alt="Городская среда" class="w-full h-auto object-cover aspect-[4/3]" />
            </div>
            <div class="overflow-hidden col-span-2">
              <img src="/images/8eb0fa5c23e773b560582f5e95f3ec1f17c82b83.webp" alt="Таунхаусы" class="w-full h-auto object-cover aspect-[16/9]" />
            </div>
          </div>
          
          <!-- Text (Right on Desktop) -->
          <div class="flex flex-col gap-6 lg:gap-8 order-2">
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90">
              За годы работы под чутким руководством Алексея Николаевича Победоносцева, на заводе успешно реализовано множество значимых проектов.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90">
              Были построены как многоквартирные и индивидуальные жилые дома, так и промышленные объекты, а также внесли вклад в развитие объектов культуры.
            </p>
            <p class="content-text text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] leading-[1.7] lg:leading-[1.8] text-white/90">
              Кроме того, мы занимались созданием малых архитектурных форм, дизайнерскими ремонтами детских садов и школ, благоустройством парковых территорий и многим другим.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Team Section -->
    <section class="py-16 sm:py-20 md:py-24 lg:py-28 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative overflow-hidden">
       <div class="absolute inset-0 bg-[#252732]"></div>
       <!-- Sketches Background -->
       <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('/images/16a97598f0b3ff02f46eb2a5d484cca947a91848.webp'); background-size: cover; background-position: center;"></div>

       <div class="relative z-10 max-w-[1770px] mx-auto">
         <div class="w-full overflow-hidden relative group">
           <img src="/images/cd2c56c1cef71fa605ba6ec3ee0422a8e82a17c6.webp" alt="Команда" class="w-full h-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000">
           <div class="absolute inset-0 bg-gradient-to-t from-[#252732] via-transparent to-transparent opacity-60"></div>
         </div>
       </div>
    </section>

    <!-- Awards Section -->
    <section class="py-12 sm:py-16 md:py-20 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 border-t border-white/5">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center">
           <img src="/images/6410f9e6590d6f41825444df0cad2a2c10a5cc85.webp" class="h-16 sm:h-20 md:h-24 w-auto object-contain" alt="Award 1">
           <img src="/images/8f72c0cf95434171c275f293d99f7f4076aaeb9d.webp" class="h-16 sm:h-20 md:h-24 w-auto object-contain" alt="Award 2">
           <img src="/images/d3c5283687d44afd2e6290d2b1c87d982be47f19.webp" class="h-16 sm:h-20 md:h-24 w-auto object-contain" alt="Award 3">
        </div>
      </div>
    </section>

    <!-- Footer Area -->
    <section class="py-10 sm:py-12 border-t border-white/10 bg-[#252732] text-white/40 text-xs sm:text-sm">
      <div class="max-w-[1770px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
         <div class="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
           <div>&copy; {{ new Date().getFullYear() }} Pobedonoscev Group. Все права защищены.</div>
           <div class="flex gap-6 sm:gap-8">
             <a href="#" class="hover:text-white transition-colors">Политика конфиденциальности</a>
             <a href="#" class="hover:text-white transition-colors">Контакты</a>
           </div>
         </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePageMeta } from '~/composables/usePageMeta'

const timelineYears = [
  { 
    year: '2006',
    text: 'Еще вчера я был студентом, погруженным в мир эскизов, макетов и теоретических концепций. Сегодня я – начинающий архитектор, готовый применить свои знания и страсть к созданию чего-то реального, осязаемого, того, что будет жить и служить людям. Это волнующее чувство, смешанное с легкой тревогой, ведь впереди – неизведанное',
    quote1: 'Легко трудно быть',
    quote2: 'уникальным'
  },
  { 
    year: '2011',
    text: 'Я чувствую в себе силы и знаю, что весь созданный потенциал, теперь готов к новым вызовам. Я иду вперед, к целям, которые еще вчера казались недостижимыми, к возможностям, которые открывают двери в неизведанное. Моя страсть - создавать то, что невозможно представить. Я делаю первый шаг, создаю свою компанию.',
    quote1: 'Сила',
    quote2: 'в единстве'
  },
  { 
    year: '2012',
    text: 'Формирование команды профессионалов. Мы поняли, что большие цели достигаются только сообща. Появились первые знаковые общественные проекты, которые стали визитной карточкой нашего бюро.',
    quote1: 'Команда',
    quote2: 'мечты'
  },
  { 
    year: '2015',
    text: 'Выход на новый уровень. Сложные инженерные решения и комплексная застройка стали нашей визитной карточкой. Реализованы проекты жилых комплексов и общественных зданий.',
    quote1: 'Рост',
    quote2: 'масштаба'
  },
  { 
    year: '2017',
    text: 'Расширение географии проектов. Наши работы теперь можно увидеть не только в Ярославле, но и в других городах России. Каждый проект — это новый вызов и новые возможности.',
    quote1: 'Без',
    quote2: 'границ'
  },
  { 
    year: '2019',
    text: 'Инновации и экология. Мы интегрировали "зеленые" стандарты в каждый проект, заботясь о будущем поколении. Устойчивая архитектура стала нашим приоритетом.',
    quote1: 'Взгляд',
    quote2: 'в будущее'
  },
  { 
    year: '2025',
    text: 'Сегодня Pobedonoscev Group — это гарант качества и стиля. Мы продолжаем создавать историю города, воплощая в жизнь самые смелые архитектурные решения.',
    quote1: 'Создаем',
    quote2: 'наследие'
  }
]

const activeYear = ref('2006')

const currentBiography = computed(() => {
  return timelineYears.find(item => item.year === activeYear.value) || timelineYears[0]
})

const setActiveYear = (year) => {
  activeYear.value = year
}

usePageMeta({
  title: 'О компании',
  description: 'История и философия Pobedonoscev Group',
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Marck+Script&display=swap');

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
.font-sans {
  font-family: 'Inter', sans-serif;
}

/* Biography Section Styles - matching Figma */
.bio-text {
  font-family: 'Marck Script', cursive;
  letter-spacing: 0.12em;
}

.bio-quote {
  font-family: 'Marck Script', cursive;
  letter-spacing: 0.08em;
}

.bio-quote-line {
  display: inline;
}

.bio-signature {
  font-family: 'Marck Script', cursive;
  letter-spacing: 0.1em;
}

/* Content Section Text Styles - matching Figma */
.content-text {
  font-family: 'Marck Script', cursive;
  letter-spacing: 0.1em;
}

/* No Scrollbar for horizontal timeline on mobile */
.noscrollbar::-webkit-scrollbar {
  display: none;
}
.noscrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Smooth fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Biography section specific */
.biography-section {
  min-height: auto;
}

@media (min-width: 1024px) {
  .biography-section {
    min-height: 500px;
  }
}

@media (min-width: 1280px) {
  .biography-section {
    min-height: 550px;
  }
}
</style>
