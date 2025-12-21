<template>
  <div class="bg-primary text-white min-h-screen font-sans selection:bg-[#d4a574] selection:text-primary">
    <!-- Main Biography Section -->
    <section class="min-h-screen flex items-center justify-center pb-16 md:pb-20 lg:pb-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative">
      
      <!-- Decorative Horizontal Lines -->
      <div class="absolute top-0 left-0 w-full h-px bg-white/10 z-0"></div>
      <div class="absolute bottom-16 md:bottom-20 lg:bottom-24 left-0 w-full h-px bg-white/10 z-0"></div>
      
      <div class="max-w-[1770px] mx-auto w-full relative z-10">
        
        <!-- Back Button -->
        <div class="mb-8 lg:mb-12">
          <NuxtLink to="/" class="inline-flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
            <svg class="w-7 h-7 transition-transform group-hover:-translate-x-1" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM28 5.25L1 5.25V6.75L28 6.75V5.25Z" fill="currentColor"/>
            </svg>
            <span class="text-lg md:text-xl lg:text-2xl tracking-[3.96px] uppercase font-light">НАЗАД</span>
          </NuxtLink>
        </div>
        
        <!-- Desktop Layout: Grid with 3 columns -->
        <div class="hidden lg:grid grid-cols-[auto_1fr_auto] gap-6 xl:gap-10 2xl:gap-12 items-start relative">
          
          <!-- Decorative vertical line between text and photo -->
          <div class="absolute right-[28%] xl:right-[26%] 2xl:right-[24%] top-0 bottom-0 w-px bg-white/10 z-0"></div>
          
          <!-- Left: Years Timeline -->
          <div class="flex flex-col gap-4 xl:gap-5 2xl:gap-6 pt-2 relative z-10">
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

          <!-- Center: Biography Text -->
          <div class="flex flex-col gap-10 xl:gap-14 2xl:gap-16 px-4 xl:px-8 2xl:px-12 relative z-10">
            <transition name="fade" mode="out-in">
              <div :key="activeYear" class="flex flex-col gap-10 xl:gap-14 2xl:gap-16">
                <!-- Main Biography Text -->
                <p class="bio-text text-xl lg:text-[22px] xl:text-[24px] 2xl:text-[26px] leading-[1.7] xl:leading-[1.75] 2xl:leading-[1.8] text-white/90">
                  {{ currentBiography.text }}
                </p>
                
                <!-- Quote - Centered -->
                <div class="flex flex-col items-center">
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

          <!-- Right: Portrait with decorative lines -->
          <div class="flex flex-col items-end pl-4 xl:pl-6 relative z-10">
            
            <!-- Portrait container with decorative lines -->
            <div class="relative w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[360px]">
              <!-- Decorative horizontal line (top) -->
              <div class="absolute -top-px left-0 right-0 h-px bg-white/10"></div>
              
              <!-- Portrait image -->
              <div class="relative aspect-[3/4] shadow-2xl">
                <img 
                  src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                  alt="Победоносцев Алексей Николаевич" 
                  class="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              
              <!-- Decorative horizontal line (bottom) -->
              <div class="absolute -bottom-px left-0 right-0 h-px bg-white/10"></div>
            </div>
            
            <!-- Name and decorative orange line -->
            <div class="w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[360px] mt-4 xl:mt-5 2xl:mt-6">
              <p class="bio-signature text-lg xl:text-xl 2xl:text-2xl text-white/70 text-right">
                Победоносцев Алексей Николаевич
              </p>
              <!-- Decorative Orange Line with corner -->
              <div class="relative mt-2">
                <div class="h-px bg-[#d4a574]/70"></div>
                <div class="absolute right-0 top-0 bottom-0 w-px bg-[#d4a574]/70"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tablet Layout: Grid with 2 columns -->
        <div class="hidden md:flex lg:hidden flex-col gap-8 pt-10">
          
          <!-- Tablet: Horizontal Timeline -->
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

            <!-- Portrait with decorative lines -->
            <div class="flex flex-col items-end relative">
              <!-- Decorative vertical line (right edge) -->
              <div class="absolute right-0 top-0 bottom-0 w-px bg-white/10 z-0"></div>
              
              <div class="relative w-full max-w-[280px]">
                <!-- Decorative horizontal line (top) -->
                <div class="absolute -top-px left-0 right-0 h-px bg-white/10"></div>
                
                <div class="relative aspect-[3/4] shadow-2xl">
                  <img 
                    src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                    alt="Победоносцев Алексей Николаевич" 
                    class="w-full h-full object-cover scale-x-[-1]"
                  />
                </div>
                
                <!-- Decorative horizontal line (bottom) -->
                <div class="absolute -bottom-px left-0 right-0 h-px bg-white/10"></div>
              </div>
              
              <div class="w-full max-w-[280px] mt-5">
                <p class="bio-signature text-xl text-white/70 text-right">
                  Победоносцев Алексей Николаевич
                </p>
                <!-- Decorative Orange Line with corner -->
                <div class="relative mt-2">
                  <div class="h-px bg-[#d4a574]/70"></div>
                  <div class="absolute right-0 top-0 bottom-0 w-px bg-[#d4a574]/70"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Layout: Stacked -->
        <div class="flex flex-col gap-6 sm:gap-8 md:hidden pt-6 sm:pt-8">
          
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

          <!-- Mobile: Portrait (centered) with decorative lines -->
          <div class="flex flex-col items-center relative">
            <div class="relative w-[55vw] max-w-[220px] sm:max-w-[260px]">
              <!-- Decorative horizontal line (top) -->
              <div class="absolute -top-px left-0 right-0 h-px bg-white/10"></div>
              
              <div class="relative aspect-[3/4] shadow-2xl">
                <img 
                  src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                  alt="Победоносцев Алексей Николаевич" 
                  class="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              
              <!-- Decorative horizontal line (bottom) -->
              <div class="absolute -bottom-px left-0 right-0 h-px bg-white/10"></div>
            </div>
            
            <div class="w-full max-w-[220px] sm:max-w-[260px] mt-4">
              <p class="bio-signature text-base sm:text-lg text-white/70 text-center">
                Победоносцев Алексей Николаевич
              </p>
              <!-- Decorative Orange Line -->
              <div class="relative mt-2">
                <div class="h-px bg-[#d4a574]/70"></div>
              </div>
            </div>
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
      </div>
    </section>

    <!-- Content Block 1: Architectural Blueprint + Text -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_45%] xl:grid-cols-[1fr_42%] gap-8 lg:gap-12 xl:gap-16 items-center">
          
          <!-- Architectural Blueprint Image (Left on Desktop) -->
          <div class="relative order-1 lg:order-1 overflow-hidden">
            <div class="relative w-full aspect-[4/3] lg:aspect-[3/2]">
              <div class="absolute inset-0 opacity-70 overflow-hidden pointer-events-none">
                <img 
                  src="/images/blueprint.webp" 
                  alt="Архитектурный чертеж" 
                  class="absolute h-[123.08%] left-0 top-[-3.23%] w-[101.55%] object-contain"
                />
              </div>
            </div>
          </div>
          
          <!-- Text Content (Right on Desktop) -->
          <div class="flex flex-col gap-4 lg:gap-5 order-2 lg:order-2">
            <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
              Алексей Николаевич Победоносцев начал свой профессиональный путь в 2006 году, сразу после получения образования. Его первой ступенькой в карьере стал Петровский завод ЖБИ, где ему предложили стать мастером-строителем.
            </p>
            <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
              Чтобы Алексей Николаевич мог продолжать развивать свои навыки и применять знания, для него была специально создана должность архитектора, ранее отсутствовавшая в штате предприятия. Таким образом, его карьера стартовала с одновременного выполнения двух ответственных ролей.
            </p>
            <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
              Проработав на заводе два года, Алексей Николаевич внес значительный вклад в его развитие. Затем было открыто новое направление – Отдел Капитального Строительства (ОКС). Ему было доверено возглавить это подразделение, заняв пост начальника и заместителя директора ОКС. Параллельно с этим, он продолжил выполнять обязанности главного архитектора.
            </p>
            <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
              За годы работы с 2006 по 2011 год, под чутким руководством Алексея Николаевича Победоносцева, на заводе успешно реализовано множество значимых проектов. Были построены как многоквартирные и индивидуальные жилые дома, так и промышленные объекты, а также внесли вклад в развитие объектов культуры. Кроме того, мы занимались созданием малых архитектурных форм, дизайнерскими ремонтами детских садов и школ, благоустройством парковых территорий и многим другим.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Block 2: Two Column Layout -->
    <section class="w-full">
      <div class="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        <!-- Left Column: Darker Background -->
        <div class="bg-[#2A2C38] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col h-full border-r border-white/10 overflow-hidden relative">
           
           <!-- Continuous Left Blur Strip (Foliage Effect Overlay) - Lighter -->
           <div class="absolute top-0 bottom-0 left-0 w-[140px] sm:w-[180px] bg-white/10 backdrop-blur-[6px] z-20 pointer-events-none border-r border-white/5"></div>

           <!-- Top: Italic Text (Indented significantly to clear blur) -->
           <div class="max-w-[550px] mb-12 relative z-10 pl-24 sm:pl-32">
              <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
                Я чувствую в себе силы и знаю, что весь созданный потенциал, теперь готов к новым вызовам. Я иду вперед, к целям, которые еще вчера казались недостижимыми, к возможностям, которые открывают двери в неизведанное. Моя страсть - создавать то, что невозможно представить. Я делаю первый шаг, создаю свою компанию.
              </p>
            </div>

            <!-- Bottom: Large Complex Image (Full Width, Shorter Height) -->
            <div class="relative w-full -ml-8 sm:-ml-12 lg:-ml-20 mr-[-20px] sm:mr-[-32px] md:mr-[-48px] lg:mr-[-80px] mt-auto aspect-[16/12] sm:aspect-[16/11] lg:aspect-[16/11] overflow-hidden group">
              <img 
                src="/images/ecocity-complex.webp" 
                alt="Современное здание" 
                class="w-full h-full object-cover shadow-2xl"
                loading="lazy"
              />
            </div>
        </div>

        <!-- Right Column: Lighter Grey Background -->
        <div class="bg-[#555761] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col h-full relative">
            
            <div class="flex flex-col h-full min-h-[600px] lg:min-h-0">
              <!-- Middle: Company Info Text Block - Vertically Centered -->
              <div class="flex-1 flex flex-col justify-center py-10 lg:py-0">
                <div class="flex justify-end">
                  <div class="relative pr-6 lg:pr-8 max-w-[540px]">
                    <!-- Vertical line on the right -->
                    <div class="absolute right-0 top-[-30px] bottom-[-30px] w-px bg-white/30"></div>
                    
                    <div class="flex flex-col gap-6 lg:gap-8 text-right font-light">
                      <p class="text-white leading-[1.8] tracking-[0.16em] text-[10px] lg:text-[11px] uppercase">
                        АСК "Новый Дом" – это не просто строительная компания, это команда профессионалов, которая много лет воплощает в жизнь самые смелые мечты о собственном пространстве. Индивидуальные жилые дома и коттеджи: от уютных семейных гнездышек до роскошных загородных резиденций.
                      </p>
                      <p class="text-white leading-[1.8] tracking-[0.16em] text-[10px] lg:text-[11px] uppercase">
                        Большие элитные особняки: воплощение статуса и безупречного вкуса. Таунхаусы и блокированные дома: современное решение для комфортной жизни в гармонии с природой. Многоквартирные жилые дома: создаем комфортное и современное жилье для тысяч семей. Мы гордимся нашими реализованными объектами, среди которых такие знаковые проекты, как: Жилой комплекс "Сирень" Жилые дома на улицах Яковлевская и Пионерская Два современных жилых дома в Заволжье Компания организовала сильную команду талантливых дизайнеров, которые работают в тесном сотрудничестве с архитекторами. Вместе они доводят до совершенства экстерьеры зданий, прорабатывая фасады до мельчайших деталей.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom Right: Townhouse Image -->
              <div class="flex justify-end mt-auto pt-8">
                <div class="w-full max-w-[480px] aspect-[16/10] overflow-hidden shadow-lg">
                   <img 
                    src="/images/ecocity-townhouses.webp" 
                    alt="Таунхаусы" 
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
        </div>

      </div>
    </section>

    <!-- Content Block 3: Church Project -->
    <section class="relative py-16 sm:py-20 lg:py-28 px-5 sm:px-6 md:px-10 lg:px-16 bg-[#2A2C38] overflow-hidden">
       
      <!-- Background Blueprint (Absolute Positioned) -->
      <div class="absolute bottom-0 left-0 w-full md:w-[80%] lg:w-[75%] h-[70%] md:h-[90%] opacity-40 pointer-events-none">
         <img 
           src="/images/church-blueprint-group.webp" 
           alt="Чертежи церкви" 
           class="w-full h-full object-contain object-bottom left-0"
         />
      </div>

      <div class="max-w-[1700px] mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          <!-- Left Area: Text (Span 5 cols) -->
          <div class="lg:col-span-5 pt-10 lg:pt-20">
            <div class="max-w-[480px]">
              <p class="italic text-white/90 leading-[1.8] text-lg sm:text-xl lg:text-2xl" style="font-family: 'Marck Script', cursive;">
                Возможно, это было что-то, что я видел, слышал, или просто чувствовал. Но эта мысль, как семечко, прорастала во мне, и я представлял себе, как возвожу стены, как украшаю его, как люди приходят туда, чтобы найти покой и свет. Это было нечто большее, чем просто здание, это было место, где душа могла бы обрести свой дом.
              </p>
            </div>
          </div>

          <!-- Right Area: Photo & Description (Span 7 cols) -->
          <div class="lg:col-span-7 flex flex-col items-center lg:items-end">
             
             <!-- Church Photo Container with Frame -->
             <div class="relative p-6 sm:p-8 border border-white/20 mb-8 sm:mb-12">
               <!-- Crosshair decorations on frame corners -->
               <div class="absolute -top-[1px] -left-[10px] w-[20px] h-[1px] bg-white/40"></div>
               <div class="absolute -top-[10px] -left-[1px] w-[1px] h-[20px] bg-white/40"></div>
               <div class="absolute -top-[1px] -right-[10px] w-[20px] h-[1px] bg-white/40"></div>
               <div class="absolute -top-[10px] -right-[1px] w-[1px] h-[20px] bg-white/40"></div>
               <div class="absolute -bottom-[1px] -right-[10px] w-[20px] h-[1px] bg-white/40"></div>
               <div class="absolute -bottom-[10px] -right-[1px] w-[1px] h-[20px] bg-white/40"></div>
               <div class="absolute -bottom-[1px] -left-[10px] w-[20px] h-[1px] bg-white/40"></div>
               <div class="absolute -bottom-[10px] -left-[1px] w-[1px] h-[20px] bg-white/40"></div>

               <div class="relative w-full max-w-[400px] sm:max-w-[450px] aspect-[3/4] overflow-hidden">
                 <img 
                   src="/images/church-photo.webp" 
                   alt="Храм в селе Любилки" 
                   class="w-full h-full object-cover"
                   loading="lazy"
                 />
               </div>
             </div>

             <!-- Description Text -->
             <div class="max-w-[450px] text-center lg:text-right">
               <p class="text-white/80 text-[10px] sm:text-[11px] lg:text-[12px] leading-[1.8] tracking-[0.05em] uppercase font-light">
                 Село Любилки украшает величественный белокаменный храм, словно жемчужина, посвященный Пресвятой Богородице и святому Феодосию Тотемскому. Его золотой купол, устремленный в небо, является настоящим украшением, подчеркивая и сохраняя неповторимую историческую целостность этого живописного места.
               </p>
             </div>

          </div>

        </div>
      </div>
    </section>



    <!-- Content Block 4: Ecocity Description Layout -->
    <section class="w-full">
      <div class="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        <!-- Left Column: Darker Background -->
        <div class="bg-[#2A2C38] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col h-full border-r border-white/10 overflow-hidden relative">
           
           <!-- Continuous Left Blur Strip (Foliage Effect Overlay) -->
           <div class="absolute top-0 bottom-0 left-0 w-[140px] sm:w-[180px] bg-white/10 backdrop-blur-[6px] z-20 pointer-events-none border-r border-white/5"></div>

           <!-- Top: Italic Text (Indented significantly to clear blur) -->
           <div class="max-w-[550px] mb-12 relative z-10 pl-24 sm:pl-32">
              <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
                Когда меня по-настоящему захватывает какое-то дело, я не могу остановиться на достигнутом. Всегда вырастает до чего-то по-настоящему значимого хочется большего, хочется увидеть, как моя идея И вот, после долгих размышлений и вдохновения, я принял твердое решение: пора воплощать в жизнь мою мечту о современном, экологичном и по-настоящему комфортном пространстве.
              </p>
            </div>

            <!-- Bottom: Large Complex Image (Full Width) -->
            <div class="relative w-full -ml-8 sm:-ml-12 lg:-ml-20 mr-[-20px] sm:mr-[-32px] md:mr-[-48px] lg:mr-[-80px] mt-auto aspect-[16/11] overflow-hidden group">
              <img 
                src="/images/ecocity-townhouses.webp" 
                alt="Экогород Таунхаусы" 
                class="w-full h-full object-cover shadow-2xl"
                loading="lazy"
              />
               <!-- Pagination Dots Interaction (Mockup) -->
               <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  <div class="w-2.5 h-2.5 rounded-full bg-white drop-shadow-md"></div>
                  <div class="w-2.5 h-2.5 rounded-full border border-white/60 bg-transparent"></div>
                  <div class="w-2.5 h-2.5 rounded-full border border-white/60 bg-transparent"></div>
                  <div class="w-2.5 h-2.5 rounded-full border border-white/60 bg-transparent"></div>
                  <div class="w-2.5 h-2.5 rounded-full border border-white/60 bg-transparent"></div>
              </div>
            </div>
        </div>

        <!-- Right Column: Lighter Grey Background -->
        <div class="bg-[#555761] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col h-full relative">
            
            <div class="flex flex-col h-full justify-between gap-12">
              
              <!-- Top: Small Grayscale Image -->
              <div class="w-full max-w-[500px] aspect-[16/10] overflow-hidden shadow-lg self-end lg:self-start">
                 <img 
                  src="/images/ecocity-house-bw.webp" 
                  alt="Экогород ЧБ" 
                  class="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
              </div>

              <!-- Bottom: Text Block -->
              <div class="flex justify-end mt-auto">
                <div class="relative pr-6 lg:pr-8 max-w-[580px]">
                  <!-- Vertical line on the right -->
                  <div class="absolute right-0 top-[-30px] bottom-[-30px] w-px bg-white/30"></div>
                  
                  <div class="flex flex-col gap-6 lg:gap-8 text-right font-light">
                    <h3 class="text-white text-[12px] lg:text-[14px] uppercase tracking-[0.15em] leading-[1.6]">
                      ЭКОГОРОД: Новый стандарт жизни в Ярославской области, который говорит сам за себя
                    </h3>
                    
                    <p class="text-white/90 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      В Ярославской области стремительно набирает обороты популярность жилого комплекса ЭКОГОРОД. Этот проект не нуждается в громкой рекламе – о нем говорят сами жители и с интересом изучают конкуренты. Секрет успеха кроется в продуманных до мелочей решениях, которые делают жизнь здесь по-настоящему комфортной и современной.
                    </p>
                    
                     <p class="text-white/90 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      Представьте себе двор, свободный от автомобилей, где безопасно играют дети, а прогулки проходят в спокойной атмосфере. ЭКОГОРОД воплощает эту мечту в реальность, предлагая двусторонние подъезды и удобную навигацию. Панорамные окна наполняют квартиры светом и открывают живописные виды, а французские балконы добавляют изысканности. Особое внимание уделено ландшафтному дизайну: каждый уголок комплекса утопает в зелени, а детские площадки вынесены в отдельные, безопасные зоны, где малыши могут резвиться и развиваться. Все эти современные и функциональные решения высоко ценятся жителями и становятся предметом обсуждения среди застройщиков города.
                    </p>

                    <p class="text-white/90 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      Но что делает ЭКОГОРОД еще более уникальным? Это его стремление к полной независимости и контролю качества. Компания не просто строит, а активно инвестирует в собственное производство, обеспечивая до 42% строительных материалов из собственных ресурсов. Это не только гарантирует высокое качество, но и позволяет оптимизировать сроки и стоимость строительства.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>

      </div>
    </section>

    <!-- Content Block 5: Dagestan Stones -->
    <section class="relative py-8 sm:py-12 lg:py-16 px-5 sm:px-6 md:px-10 lg:px-16 bg-[#2A2C38] overflow-hidden text-white border-t border-white/5">
      
      <!-- Background Sketch (Excavator/Quarry) -->
      <div class="absolute inset-0 w-full h-full opacity-40 pointer-events-none mix-blend-screen">
         <img 
           src="/images/dagestan-stones-bg.webp" 
           alt="Карьерный экскаватор скетч" 
           class="w-full h-full object-cover object-bottom"
         />
      </div>

      <div class="max-w-[1920px] mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
           
           <!-- Left Column: Poetic Quote -->
           <div class="pt-10 lg:pt-20">
              <div class="max-w-[500px] pl-4 sm:pl-10 relative">
                 <p class="italic text-white/90 leading-[1.8] text-base lg:text-[18px]" style="font-family: 'Marck Script', cursive;">
                   Камень - это не просто безмолвный свидетель времени, не просто строительный материал или элемент пейзажа. В нем заключена своя, особая музыка - тихая, глубокая, пронизанная мудростью веков. Это не мелодия, которую можно услышать ухом, а скорее вибрация, ощущение, которое проникает в самую суть
                 </p>
              </div>
           </div>

           <!-- Right Column: Image and Product Description -->
           <div class="flex flex-col gap-16 lg:gap-32 items-end">
              
              <!-- Top: Building Image -->
               <div class="w-full max-w-[620px] relative aspect-[16/10] shadow-2xl">
                 <img 
                   src="/images/dagestan-building-new.webp" 
                   alt="Камни Дагестана Офис" 
                   class="w-full h-full object-cover"
                   loading="lazy"
                 />
              </div>
              
              <!-- Bottom: Description Text Block with Right Border -->
               <div class="relative pr-8 lg:pr-10 max-w-[700px] text-right">
                 <!-- Vertical Line -->
                 <div class="absolute right-0 top-[-20px] bottom-[-20px] w-px bg-white/30"></div>

                  <div class="flex flex-col gap-2.5 text-[10px] uppercase leading-[1.4] tracking-[0.1em] font-light text-white/80 origin-right transition-all duration-300" style="font-size: 10px; transform: scale(0.75);">
                    <p>
                      "Камни Дагестана" является признанным лидером в производстве высококачественных облицовочных материалов. Находясь в самом сердце Дагестана она специализируется на создании продукции, отвечающей самым взыскательным требованиям современного строительства и дизайна.
                    </p>
                    <p>
                      Компания предлагает впечатляющий ассортимент натурального камня, насчитывающий более 60 эксклюзивных расцветок. В нашем каталоге вы найдете:
                    </p>
                    
                    <div class="flex flex-col gap-4 mt-2">
                      <p>
                        <span class="font-bold text-white">Песчаник:</span> прочный и долговечный материал с неповторимой текстурой, идеально подходящий для создания классических и современных фасадов.
                      </p>
                      <p>
                        <span class="font-bold text-white">Известняк:</span> элегантный и благородный камень, придающий зданиям изысканный вид и обеспечивающий превосходную теплоизоляцию.
                      </p>
                      <p>
                        <span class="font-bold text-white">Доломит:</span> камень с высокой прочностью и устойчивостью к атмосферным воздействиям, идеальный для облицовки фасадов и создания ландшафтных элементов.
                      </p>
                      <p>
                        <span class="font-bold text-white">Ракушечник:</span> легкий и теплый материал с уникальной пористой структурой, обладающий отличными звукоизоляционными свойствами и создающий неповторимый среднеземноморский стиль.
                      </p>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </section>

    <!-- Content Block 6: Architects & Group Description Layout -->
    <section class="w-full">
      <div class="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        <!-- Left Column: Darker Background -->
        <div class="bg-[#2A2C38] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col h-full border-r border-white/10 overflow-hidden relative">
           
           <!-- Continuous Left Blur Strip (Foliage Effect Overlay) -->
           <div class="absolute top-0 bottom-0 left-0 w-[140px] sm:w-[180px] bg-white/10 backdrop-blur-[6px] z-20 pointer-events-none border-r border-white/5"></div>

           <!-- Top: Italic Text (Indented significantly to clear blur) -->
           <div class="max-w-[550px] mb-12 relative z-10 pl-24 sm:pl-32">
              <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
                Кажется что потолок уже достигнут... В такие моменты приходит особое чувство. Это не скука, нет. Это скорее предвкушение чего-то нового, зов к неизведанному. Хочется снова почувствовать тот самый азарт первооткрывателя, найти новые горизонты, которые заставят мозг работать на полную катушку и вдохнут новую жизнь в творчество.
              </p>
            </div>

            <!-- Bottom: Large Architectural Image -->
            <div class="relative w-full -ml-8 sm:-ml-12 lg:-ml-20 mr-[-20px] sm:mr-[-32px] md:mr-[-48px] lg:mr-[-80px] mt-auto aspect-[16/11] overflow-hidden group">
              <img 
                src="/images/11dfb6d0c179847dedb1585f97c42324de436bcd.webp" 
                alt="Архитектура и дизайн" 
                class="w-full h-full object-cover shadow-2xl"
                loading="lazy"
              />
            </div>
        </div>

        <!-- Right Column: Lighter Grey Background -->
        <div class="bg-[#555761] px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-16 flex flex-col h-full relative">
            
            <div class="flex flex-col h-full justify-between gap-12 lg:gap-16">
              
              <!-- Top: Architects Branding Image/Slider -->
              <div class="w-full max-w-[650px] aspect-[16/10] overflow-hidden shadow-lg self-end lg:self-start relative group">
                 <img 
                  src="/images/a9f3495b5dc55635957a7aade82d1b35127bfe7d.webp" 
                  alt="Pobedonoscev Architects Project" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                />

                <!-- Pagination dots (mockup) -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                   <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                   <div class="w-1.5 h-1.5 rounded-full border border-white/50"></div>
                   <div class="w-1.5 h-1.5 rounded-full border border-white/50"></div>
                </div>
              </div>

              <!-- Bottom: Text Block -->
              <div class="flex justify-end mt-auto">
                <div class="relative pr-6 lg:pr-8 max-w-[580px]">
                  <!-- Vertical line on the right -->
                  <div class="absolute right-0 top-[-20px] bottom-[-20px] w-px bg-white/30"></div>
                  
                  <div class="flex flex-col gap-6 lg:gap-8 text-right font-light">
                    <p class="text-white/95 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      Pobedonoscev architects — студию, рожденную из страсти к совершенству и глубокого понимания того, что такое истинная роскошь в архитектуре.
                    </p>
                    
                    <p class="text-white/95 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      Мы верим, что современная частная архитектура премиум-класса должна быть не только эстетически безупречной, но и функциональной, комфортной и, главное, отражать уникальный стиль жизни своих владельцев. Наша миссия — создавать пространства, которые вдохновляют, дарят ощущение гармонии и становятся настоящим воплощением вашего видения идеального дома.
                    </p>
                    
                     <p class="text-white/95 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      Команда профессионалов, объединенных общей целью: создавать архитектуру, которая будет восхищать и служить вам долгие годы. Мы стремимся к тому, чтобы ваш дом стал не просто местом проживания, а настоящим произведением искусства, отражающим ваш успех и утонченный вкус.
                    </p>

                    <p class="text-white/95 leading-[1.7] tracking-[0.05em] text-[10px] lg:text-[11px] uppercase">
                      Pobedonoscev Group команда профессионалов строительной отрасли, чья репутация подкреплена многолетним опытом и многочисленными наградами. Pobedonoscev Group успешно реализует проекты по строительству многоквартирных жилых комплексов, предлагая современные решения и высочайшие стандарты качества. Мы строим не просто дома, а пространства, где будет комфортно жить и развиваться вашим семьям.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>

      </div>
    </section>

    <!-- Content Block 7: Team Section with Sketch Background -->
    <section class="relative py-16 sm:py-20 lg:py-28 px-5 sm:px-6 md:px-10 lg:px-16 bg-[#2A2C38] overflow-hidden">
      
      <!-- Background Sketch (Absolute) -->
      <div class="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-screen">
         <img 
           src="/images/team-section-bg.webp" 
           alt="Background Sketch" 
           class="w-full h-full object-cover"
         />
      </div>

      <!-- Central Content -->
      <div class="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center gap-10 lg:gap-14">
         
         <!-- Team Photo Container -->
         <div class="relative w-full max-w-[900px] aspect-video border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.15)] group overflow-hidden">
            <!-- Photo -->
            <img 
              src="/images/team-photo.webp" 
              alt="Команда Pobedonoscev Group" 
              class="w-full h-full object-cover grayscale brightness-75 transition-transform duration-700 group-hover:scale-105"
            />
            
            <!-- Center Overlay Text -->
            <div class="absolute inset-0 flex items-center justify-center">
               <h2 class="text-white text-4xl sm:text-5xl lg:text-7xl font-light tracking-[0.2em] uppercase opacity-90" style="font-family: 'Manrope', sans-serif;">
                  ФОТО
               </h2>
            </div>
            
            <!-- Grid Lines overlay (optional from design) -->
            <div class="absolute left-0 bottom-10 right-0 h-px bg-blue-400/20"></div>
            <div class="absolute top-0 bottom-0 left-10 w-px bg-blue-400/20"></div>
         </div>

         <!-- Text Content -->
         <div class="flex flex-col gap-6 text-center max-w-[800px]">
            <p class="text-white/90 text-xs sm:text-sm uppercase leading-[1.7] tracking-wider font-light">
              Pobedonoscev Group команда профессионалов строительной отрасли, чья репутация подкреплена многолетним опытом и многочисленными наградами.
            </p>
            <p class="text-white/90 text-xs sm:text-sm uppercase leading-[1.7] tracking-wider font-light">
              Pobedonoscev Group успешно реализует проекты по строительству многоквартирных жилых комплексов, предлагая современные решения и высочайшие стандарты качества. Мы строим не просто дома, а пространства, где будет комфортно жить и развиваться вашим семьям.
            </p>
         </div>

      </div>
    </section>

    <!-- Bottom Section: Awards and Certifications -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-[1200px] mx-auto">
          
          <!-- Award Card 1: CITY VISION AWARDS 2016 -->
          <div class="bg-[#2A2C38] border border-white/20 rounded-lg lg:rounded-xl p-5 md:p-6 lg:p-8 flex flex-col items-center text-center gap-3 md:gap-4 lg:gap-5">
            <div class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
              <img 
                src="/images/footer-icon-1.webp" 
                alt="CITY VISION AWARDS 2016" 
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <p class="text-white text-base md:text-lg lg:text-xl font-semibold uppercase" style="font-family: 'Manrope', sans-serif">
              CITY VISION AWARDS 2016
            </p>
          </div>

          <!-- Award Card 2: СБЕРБАНК -->
          <div class="bg-[#2A2C38] border border-white/20 rounded-lg lg:rounded-xl p-5 md:p-6 lg:p-8 flex flex-col items-center text-center gap-3 md:gap-4 lg:gap-5">
            <div class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
              <img 
                src="/images/footer-icon-2.webp" 
                alt="СБЕРБАНК" 
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-white text-sm md:text-base lg:text-lg leading-[1.4] uppercase" style="font-family: 'Manrope', sans-serif">
                «ЛУЧШИЙ ПРОЕКТ ЖИЛЬЯ<br/>КОМФОРТ-КЛАССА»
              </p>
              <p class="text-white/80 text-xs md:text-sm lg:text-base font-medium mt-2" style="font-family: 'Manrope', sans-serif">
                СБЕРБАНК
              </p>
            </div>
          </div>

          <!-- Award Card 3: КОНКУРС ТОП ЖК -->
          <div class="bg-[#2A2C38] border border-white/20 rounded-lg lg:rounded-xl p-5 md:p-6 lg:p-8 flex flex-col items-center text-center gap-3 md:gap-4 lg:gap-5">
            <div class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
              <img 
                src="/images/footer-icon-3.webp" 
                alt="КОНКУРС ТОП ЖК" 
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-white text-sm md:text-base lg:text-lg leading-[1.4] uppercase" style="font-family: 'Manrope', sans-serif">
                «ЛУЧШИЙ ЖИЛОЙ<br/>КОМПЛЕКС -<br/>НОВОСТРОЙКА»
              </p>
            </div>
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

/* Biography Section Typography */
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

/* Quote Text - poetic italic style */
.quote-text {
  font-family: 'LeoHand', 'Marck Script', cursive;
  font-size: clamp(18px, 2vw, 28px);
  letter-spacing: 0.02em;
  font-weight: 300;
  font-style: italic;
}

/* Content Section Text Styles - matching Figma */
.content-text {
  font-family: 'Mazzard M', 'Manrope', 'Inter', sans-serif;
  font-size: clamp(11px, 1vw, 14px);
  font-weight: 400;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .quote-text {
    font-size: clamp(16px, 4.5vw, 22px);
  }
  
  .content-text {
    font-size: clamp(12px, 3vw, 14px);
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .quote-text {
    font-size: clamp(18px, 2.5vw, 24px);
  }
  
  .content-text {
    font-size: clamp(11px, 1.5vw, 13px);
  }
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
</style>

