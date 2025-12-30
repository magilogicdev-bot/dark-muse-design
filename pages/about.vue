<template>
  <div class="bg-primary text-white min-h-screen font-sans selection:bg-[#d4a574] selection:text-primary">
    <!-- Main Biography Section -->
    <section id="biography-section" class="min-h-[70vh] flex items-center justify-center pb-16 md:pb-20 lg:pb-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative overflow-hidden">
      
      <div class="max-w-[1770px] mx-auto w-full relative z-2">
        
        <!-- Desktop Layout: Grid with 2 columns -->
        <div class="hidden lg:grid grid-cols-[1.2fr_1fr] items-start relative pt-[5%]">
          
          <!-- Screenshot Reference Image -->
          <img 
            src="/images/screenshot-2025-12-25-100143.webp" 
            alt="Screenshot reference" 
            class="absolute"
            style="top: 334px; left: 684px; width: 20.3%; aspect-ratio: 359/75; z-index: 0;"
          />
          
          <!-- Decorative Years Timeline (Fixed) -->
          <div class="years-timeline-fixed">
            <button 
              v-for="item in timelineYears" 
              :key="item.year"
              @click="scrollToYear(item.year)"
              class="text-left w-min font-light text-[13px] xl:text-sm 2xl:text-[15px] tracking-[0.18em] transition-all duration-300 hover:text-white group relative pb-1 cursor-pointer"
              :class="{ 'text-white': activeYear === item.year, 'text-white/40': activeYear !== item.year }"
            >
              {{ item.year }}
              <span 
                class="absolute bottom-0 left-0 h-[1.5px] bg-[#d4a574] transition-all duration-300"
                :class="activeYear === item.year ? 'w-full' : 'w-0 group-hover:w-1/2'"
              ></span>
            </button>
          </div>
          
          <!-- Left: Biography Text & Quote -->
          <div class="flex flex-col pl-24 xl:pl-32 relative z-1">
            <transition name="fade" mode="out-in">
              <div :key="activeYear" class="flex flex-col">
                <!-- Main Biography Text -->
                <p class="bio-text italic text-white/95 leading-[1.8] max-w-[850px]" style="font-size: clamp(16px, 1.5vw, 22px); width: 781px;">
                  {{ currentBiography.text }}
                </p>
                
                <!-- Quote - Centered -->
                <div class="flex flex-col items-center relative">
                  <img 
                    src="/images/quote-image.webp" 
                    alt="Цитата" 
                    class="max-w-full h-auto absolute"
                    style="left: 504px; top: 318px; width: 370px;"
                  />
                </div>
              </div>
            </transition>
          </div>

          <!-- Right: Portrait Column -->
          <div class="flex flex-col items-center lg:items-end relative z-1 pr-[12%] xl:pr-[15%] mt-0 mb-0 pt-[29px]">
            <div class="relative group" style="width: min(210px, 18vw);">
              
              <!-- DECORATIVE LINES (Tethered to Photo at ~20px) -->
              
              <!-- Top horizontal line (at photo top) -->
              <div class="absolute top-[-55px] left-[-2000px] right-[-1000px] h-0.5 bg-white/20 z-0 opacity-80 mb-0"
                   style="mask-image: linear-gradient(to right, transparent, white 20%, white 95%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 95%, transparent);">
              </div>
              <div class="absolute top-[-45px] left-0 right-0 bottom-0 bg-repeat-x opacity-60 mt-0" style="background-image: url('/images/line-46.svg'); background-size: 1000px 100%;"></div>

              <!-- Right vertical line (at 20px from photo) -->
              <div class="absolute top-[-100px] bottom-[-200px] right-[-20px] w-0.5 bg-white/30 z-0 overflow-visible"
                   style="mask-image: linear-gradient(to bottom, transparent, white 5%, white 95%, transparent); -webkit-mask-image: linear-gradient(to bottom, transparent, white 5%, white 95%, transparent);">
                <div class="absolute inset-0 bg-repeat-y opacity-50" style="background-image: url('/images/line-49.svg'); background-size: 100% 120px;"></div>
              </div>

              <!-- Bottom horizontal line (below signature) -->
              <div class="absolute bottom-[-100px] left-[-2000px] right-[-50px] h-0.5 bg-white/30 z-0 opacity-60"
                   style="mask-image: linear-gradient(to right, transparent, white 20%, white 98%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 98%, transparent);">
                <div class="absolute inset-x-0 inset-y-0 bg-repeat-x" style="background-image: url('/images/line-46.svg'); background-size: 800px 100%;"></div>
              </div>

              <!-- Portrait image -->
              <div class="relative aspect-[3/4] shadow-2xl overflow-hidden border border-white/5 z-1">
                <img 
                  src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                  alt="Победоносцев Алексей Николаевич" 
                  class="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              
              <!-- Name/Signature positioned below -->
              <div class="mt-6 xl:mt-8 flex justify-end relative z-1">
                <p class="bio-signature text-sm xl:text-base 2xl:text-lg text-white/80 text-right whitespace-nowrap min-w-max mr-[-10px]">
                  Победоносцев Алексей Николаевич
                </p>
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
                  <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
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
            <div class="flex flex-col items-end relative portrait-wrapper-tablet">
              <div class="relative w-full max-w-[280px] portrait-container">
                <div class="relative aspect-[3/4] shadow-2xl">
                  <img 
                    src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                    alt="Победоносцев Алексей Николаевич" 
                    class="w-full h-full object-cover scale-x-[-1]"
                  />
                </div>
              </div>
              
              <div class="w-full max-w-[280px] mt-5">
                <p class="bio-signature text-base text-white/70 text-right whitespace-nowrap overflow-hidden">
                  Победоносцев Алексей Николаевич
                </p>
                <!-- Decorative Line -->
                <div class="relative mt-2">
                  <div class="h-px bg-white/20"></div>
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
            <div class="relative w-[55vw] max-w-[220px] sm:max-w-[260px] portrait-container">
              <div class="relative aspect-[3/4] shadow-2xl">
                <img 
                  src="/images/395fddf73453a4c5ea047bd09cfa3ef614c29e08.webp" 
                  alt="Победоносцев Алексей Николаевич" 
                  class="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
            </div>
            
            <div class="w-full max-w-[220px] sm:max-w-[260px] mt-4">
              <p class="bio-signature text-xs sm:text-sm text-white/70 text-center whitespace-nowrap overflow-hidden">
                Победоносцев Алексей Николаевич
              </p>
              <!-- Decorative Line -->
              <div class="relative mt-2">
                <div class="h-px bg-white/20"></div>
              </div>
            </div>
          </div>

          <!-- Mobile: Biography Text -->
          <div class="flex flex-col mt-2">
            <transition name="fade" mode="out-in">
              <div :key="activeYear" class="flex flex-col gap-6 sm:gap-8">
                <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
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
    <section id="year-2006" class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-0">
      <div class="max-w-[1920px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          <!-- Architectural Blueprint Image (Left on Desktop) -->
          <div class="relative order-1 lg:order-1 lg:pl-20 overflow-hidden">
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
          <div class="flex flex-col justify-end w-full lg:pr-[220px] order-2 lg:order-2">
            <div class="flex justify-end w-full">
              <div class="relative max-w-[500px] w-full scroll-container-fixed">
                <div class="scrollable-text flex flex-col gap-6 lg:gap-8 text-right font-light max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
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
          </div>
        </div>
      </div>
    </section>

    <!-- Content Block 2: Two Column Layout -->
    <section id="year-2011" class="w-full">
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
                src="/images/ecocity-complex-new.webp" 
                alt="Современное здание" 
                class="w-full h-full object-cover shadow-2xl"
                loading="lazy"
              />
            </div>
        </div>

        <!-- Right Column: Lighter Grey Background -->
        <div class="bg-[#555761] px-5 sm:px-8 md:px-12 lg:pl-20 lg:pr-[220px] py-12 lg:py-16 flex flex-col h-full relative">
            
            <div class="flex flex-col h-full min-h-[600px] lg:min-h-0">
              <!-- Middle: Company Info Text Block - Vertically Centered -->
              <div class="flex-1 flex flex-col justify-center py-10 lg:py-0">
                <div class="flex justify-end w-full">
                  <div class="relative max-w-[500px] scroll-container-fixed">
                    <div class="scrollable-text flex flex-col gap-6 lg:gap-8 text-right font-light max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
                      <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                        АСК "Новый Дом" – это не просто строительная компания, это команда профессионалов, которая много лет воплощает в жизнь самые смелые мечты о собственном пространстве. Индивидуальные жилые дома и коттеджи: от уютных семейных гнездышек до роскошных загородных резиденций.
                      </p>
                      <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                        Большие элитные особняки: воплощение статуса и безупречного вкуса. Таунхаусы и блокированные дома: современное решение для комфортной жизни в гармонии с природой. Многоквартирные жилые дома: создаем комфортное и современное жилье для тысяч семей. Мы гордимся нашими реализованными объектами, среди которых такие знаковые проекты, как: Жилой комплекс "Сирень" Жилые дома на улицах Яковлевская и Пионерская Два современных жилых дома в Заволжье Компания организовала сильную команду талантливых дизайнеров, которые работают в тесном сотрудничестве с архитекторами. Вместе они доводят до совершенства экстерьеры зданий, прорабатывая фасады до мельчайших деталей.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom Right: Townhouse Image -->
              <div class="flex justify-end w-full mt-auto pt-8">
                <div class="max-w-[500px] aspect-[16/10] overflow-hidden shadow-lg w-full">
                   <img 
                    src="/images/ecocity-townhouses-new.webp" 
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
    <section id="year-2012" class="relative py-16 sm:py-20 lg:py-28 px-5 sm:px-6 md:px-10 lg:px-0 bg-[#2A2C38] overflow-hidden">
       
      <!-- Background Blueprint (Absolute Positioned) -->
      <div class="absolute bottom-0 left-0 w-full md:w-[80%] lg:w-[75%] h-[70%] md:h-[90%] opacity-40 pointer-events-none">
         <img 
           src="/images/church-blueprint-group.webp" 
           alt="Чертежи церкви" 
           class="w-full h-full object-contain object-bottom left-0"
         />
      </div>

      <div class="max-w-[1920px] mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-start">
          
          <!-- Left Area: Text (Span 5 cols) -->
          <div class="lg:pl-20 pt-10 lg:pt-20">
            <div class="max-w-[480px]">
              <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
                Возможно, это было что-то, что я видел, слышал, или просто чувствовал. Но эта мысль, как семечко, прорастала во мне, и я представлял себе, как возвожу стены, как украшаю его, как люди приходят туда, чтобы найти покой и свет. Это было нечто большее, чем просто здание, это было место, где душа могла бы обрести свой дом.
              </p>
            </div>
          </div>

          <!-- Right Area: Photo & Description (Span 7 cols) -->
          <div class="flex flex-col items-center lg:items-end lg:pr-[220px]">
             
             <!-- Church Photo Container with Frame -->
              <div class="flex justify-end w-full mb-8 sm:mb-12">
                <div class="relative p-6 sm:p-8 border border-white/20 max-w-[500px] w-full">
                <!-- Crosshair decorations on frame corners -->
                <div class="absolute -top-[1px] -left-[10px] w-[20px] h-[1px] bg-white/40"></div>
                <div class="absolute -top-[10px] -left-[1px] w-[1px] h-[20px] bg-white/40"></div>
                <div class="absolute -top-[1px] -right-[10px] w-[20px] h-[1px] bg-white/40"></div>
                <div class="absolute -top-[10px] -right-[1px] w-[1px] h-[20px] bg-white/40"></div>
                <div class="absolute -bottom-[1px] -right-[10px] w-[20px] h-[1px] bg-white/40"></div>
                <div class="absolute -bottom-[10px] -right-[1px] w-[1px] h-[20px] bg-white/40"></div>
                <div class="absolute -bottom-[1px] -left-[10px] w-[20px] h-[1px] bg-white/40"></div>
                <div class="absolute -bottom-[10px] -left-[1px] w-[1px] h-[20px] bg-white/40"></div>

                <div class="relative w-full aspect-[3/4] overflow-hidden">
                  <img 
                   src="/images/church-photo.webp" 
                   alt="Храм в селе Любилки" 
                   class="w-full h-full object-cover"
                   loading="lazy"
                 />
                </div>
                </div>
              </div>

              <!-- Description Text -->
              <div class="flex justify-end w-full">
                <div class="relative max-w-[500px] w-full scroll-container-fixed">
                  <div class="scrollable-text flex flex-col gap-6 lg:gap-8 text-right font-light max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-center lg:text-right tracking-tight">
                      Село Любилки украшает величественный белокаменный храм, словно жемчужина, посвященный Пресвятой Богородице и святому Феодосию Тотемскому. Его золотой купол, устремленный в небо, является настоящим украшением, подчеркивая и сохраняя неповторимую историческую целостность этого живописного места.
                    </p>
                  </div>
                </div>
              </div>

          </div>

        </div>
      </div>
    </section>



    <!-- Content Block 4: Ecocity Description Layout -->
    <section id="year-2015" class="w-full">
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
        <div class="bg-[#555761] px-5 sm:px-8 md:px-12 lg:pl-20 lg:pr-[220px] py-12 lg:py-16 flex flex-col h-full relative">
            
            <div class="flex flex-col h-full justify-between gap-12">
              
              <!-- Top: Small Grayscale Image -->
              <div class="flex justify-end w-full">
                <div class="max-w-[500px] aspect-[16/10] overflow-hidden shadow-lg w-full">
                 <img 
                  src="/images/ecocity-house-bw.webp" 
                  alt="Экогород ЧБ" 
                  class="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
                </div>
              </div>

              <!-- Bottom: Text Block -->
              <div class="flex justify-end w-full mt-auto">
                <div class="relative max-w-[500px] w-full scroll-container-fixed">
                  <div class="scrollable-text flex flex-col gap-6 lg:gap-8 text-right font-light max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
                    <h3 class="text-white text-[12px] lg:text-[14px] uppercase tracking-[0.15em] leading-[1.6]">
                      ЭКОГОРОД: Новый стандарт жизни в Ярославской области, который говорит сам за себя
                    </h3>
                    
                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      В Ярославской области стремительно набирает обороты популярность жилого комплекса ЭКОГОРОД. Этот проект не нуждается в громкой рекламе – о нем говорят сами жители и с интересом изучают конкуренты. Секрет успеха кроется в продуманных до мелочей решениях, которые делают жизнь здесь по-настоящему комфортной и современной.
                    </p>
                    
                     <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      Представьте себе двор, свободный от автомобилей, где безопасно играют дети, а прогулки проходят в спокойной атмосфере. ЭКОГОРОД воплощает эту мечту в реальность, предлагая двусторонние подъезды и удобную навигацию. Панорамные окна наполняют квартиры светом и открывают живописные виды, а французские балконы добавляют изысканности. Особое внимание уделено ландшафтному дизайну: каждый уголок комплекса утопает в зелени, а детские площадки вынесены в отдельные, безопасные зоны, где малыши могут резвиться и развиваться. Все эти современные и функциональные решения высоко ценятся жителями и становятся предметом обсуждения среди застройщиков города.
                    </p>

                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
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
    <section id="year-2017" class="relative py-8 sm:py-12 lg:py-16 px-5 sm:px-6 md:px-10 lg:px-0 bg-[#2A2C38] overflow-hidden text-white border-t border-white/5">
      
      <!-- Background Sketch (Excavator/Quarry) -->
      <div class="absolute inset-0 w-full h-full opacity-40 pointer-events-none mix-blend-screen">
         <img 
           src="/images/group-134.svg" 
           alt="Фон секции" 
           class="w-full h-full object-cover object-bottom"
         />
      </div>

      <div class="max-w-[1920px] mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
           
           <!-- Left Column: Poetic Quote -->
           <div class="lg:pl-20 pt-10 lg:pt-20">
              <div class="max-w-[500px] pl-4 sm:pl-10 relative">
                 <p class="italic text-white/90 leading-[1.6]" style="font-family: 'Marck Script', cursive; font-size: clamp(16px, 1.6vw, 21px);">
                   Камень - это не просто безмолвный свидетель времени, не просто строительный материал или элемент пейзажа. В нем заключена своя, особая музыка - тихая, глубокая, пронизанная мудростью веков. Это не мелодия, которую можно услышать ухом, а скорее вибрация, ощущение, которое проникает в самую суть
                 </p>
              </div>
           </div>

           <!-- Right Column: Image and Product Description -->
           <div class="flex flex-col gap-16 lg:gap-32 items-end lg:pr-[220px]">
              
              <!-- Top: Building Image -->
               <div class="flex justify-end w-full">
                 <div class="max-w-[500px] relative aspect-[16/10] shadow-2xl w-full">
                 <img 
                  src="/images/dagestan-building-new.webp" 
                  alt="Камни Дагестана Офис" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                 </div>
               </div>
              
              <!-- Bottom: Description Text Block with Right Border -->
               <div class="flex justify-end w-full">
                 <div class="relative max-w-[500px] w-full text-right scroll-container-fixed">
                  <div class="scrollable-text flex flex-col gap-2.5 max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      "Камни Дагестана" является признанным лидером в производстве высококачественных облицовочных материалов. Находясь в самом сердце Дагестана она специализируется на создании продукции, отвечающей самым взыскательным требованиям современного строительства и дизайна.
                    </p>
                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      Компания предлагает впечатляющий ассортимент натурального камня, насчитывающий более 60 эксклюзивных расцветок. В нашем каталоге вы найдете:
                    </p>
                    
                    <div class="flex flex-col gap-4 mt-2">
                      <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                        <span class="font-bold">Песчаник:</span> прочный и долговечный материал с неповторимой текстурой, идеально подходящий для создания классических и современных фасадов.
                      </p>
                      <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                        <span class="font-bold">Известняк:</span> элегантный и благородный камень, придающий зданиям изысканный вид и обеспечивающий превосходную теплоизоляцию.
                      </p>
                      <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                        <span class="font-bold">Доломит:</span> камень с высокой прочностью и устойчивостью к атмосферным воздействиям, идеальный для облицовки фасадов и создания ландшафтных элементов.
                      </p>
                      <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                        <span class="font-bold">Ракушечник:</span> легкий и теплый материал с уникальной пористой структурой, обладающий отличными звукоизоляционными свойствами и создающий неповторимый среднеземноморский стиль.
                      </p>
                    </div>
                  </div>
                 </div>
               </div>

           </div>
        </div>
      </div>
    </section>

    <!-- Content Block 6: Architects & Group Description Layout -->
    <section id="year-2019" class="w-full">
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
        <div class="bg-[#555761] px-5 sm:px-8 md:px-12 lg:pl-20 lg:pr-[220px] py-12 lg:py-16 flex flex-col h-full relative">
            
            <div class="flex flex-col h-full justify-between gap-12 lg:gap-16 ml-0">
              
              <!-- Top: Architects Branding Image/Slider -->
              <div class="flex justify-end w-full">
                <div class="max-w-[500px] aspect-[16/10] overflow-hidden shadow-lg relative group w-full">
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
              </div>

              <!-- Bottom: Text Block -->
              <div class="flex justify-end w-full mt-auto">
                <div class="relative max-w-[500px] w-full scroll-container-fixed">
                  <div class="scrollable-text flex flex-col gap-6 lg:gap-8 text-right font-light max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      Pobedonoscev architects — студию, рожденную из страсти к совершенству и глубокого понимания того, что такое истинная роскошь в архитектуре.
                    </p>
                    
                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      Мы верим, что современная частная архитектура премиум-класса должна быть не только эстетически безупречной, но и функциональной, комфортной и, главное, отражать уникальный стиль жизни своих владельцев. Наша миссия — создавать пространства, которые вдохновляют, дарят ощущение гармонии и становятся настоящим воплощением вашего видения идеального дома.
                    </p>
                    
                     <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
                      Команда профессионалов, объединенных общей целью: создавать архитектуру, которая будет восхищать и служить вам долгие годы. Мы стремимся к тому, чтобы ваш дом стал не просто местом проживания, а настоящим произведением искусства, отражающим ваш успех и утонченный вкус.
                    </p>

                    <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-right tracking-tight">
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
    <section id="year-2025" class="relative py-16 sm:py-20 lg:py-28 px-5 sm:px-6 md:px-10 lg:px-16 bg-[#2A2C38] overflow-hidden">
      
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
         <div class="relative max-w-[800px] scroll-container-fixed">
           <div class="scrollable-text flex flex-col gap-6 lg:gap-8 text-center font-light max-h-[340px] overflow-y-scroll mr-0 pr-5 ">
             <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-center tracking-tight">
               Pobedonoscev Group команда профессионалов строительной отрасли, чья репутация подкреплена многолетним опытом и многочисленными наградами.
             </p>
             <p class="content-text text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[1.65] lg:leading-[1.75] text-white text-center tracking-tight">
               Pobedonoscev Group успешно реализует проекты по строительству многоквартирных жилых комплексов, предлагая современные решения и высочайшие стандарты качества. Мы строим не просто дома, а пространства, где будет комфортно жить и развиваться вашим семьям.
             </p>
           </div>
         </div>

      </div>
    </section>

    <!-- Bottom Section: Awards and Certifications -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div class="max-w-[1770px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 max-w-[1200px] mx-auto items-stretch">
          
          <!-- Award Card 1: CITY VISION AWARDS 2016 -->
          <div class="bg-[#2A2C38] border border-white/30 rounded-lg lg:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 transition-all duration-300 hover:bg-[#353844] hover:border-white/50 cursor-pointer min-h-[170px] sm:min-h-[180px] md:h-full w-full max-w-[220px] sm:max-w-[250px] md:max-w-[280px] mx-auto">
            <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
              <img 
                src="/images/footer-icon-1.webp" 
                alt="CITY VISION AWARDS 2016" 
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <p class="text-white text-xs sm:text-sm md:text-lg lg:text-xl font-semibold uppercase" style="font-family: 'Manrope', sans-serif">
              CITY VISION AWARDS 2016
            </p>
          </div>

          <!-- Award Card 2: СБЕРБАНК -->
          <div class="bg-[#2A2C38] border border-white/30 rounded-lg lg:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 transition-all duration-300 hover:bg-[#353844] hover:border-white/50 cursor-pointer min-h-[170px] sm:min-h-[180px] md:h-full w-full max-w-[220px] sm:max-w-[250px] md:max-w-[280px] mx-auto">
            <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
              <img 
                src="/images/footer-icon-2.webp" 
                alt="СБЕРБАНК" 
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col gap-1 sm:gap-2">
              <p class="text-white text-[10px] sm:text-xs md:text-base lg:text-lg leading-[1.4] uppercase" style="font-family: 'Manrope', sans-serif">
                «ЛУЧШИЙ ПРОЕКТ ЖИЛЬЯ<br/>КОМФОРТ-КЛАССА»
              </p>
              <p class="text-white/80 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-1 sm:mt-2" style="font-family: 'Manrope', sans-serif">
                СБЕРБАНК
              </p>
            </div>
          </div>

          <!-- Award Card 3: КОНКУРС ТОП ЖК -->
          <div class="bg-[#2A2C38] border border-white/30 rounded-lg lg:rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 transition-all duration-300 hover:bg-[#353844] hover:border-white/50 cursor-pointer min-h-[170px] sm:min-h-[180px] md:h-full w-full max-w-[220px] sm:max-w-[250px] md:max-w-[280px] mx-auto">
            <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
              <img 
                src="/images/footer-icon-3.webp" 
                alt="КОНКУРС ТОП ЖК" 
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col gap-1 sm:gap-2">
              <p class="text-white text-[10px] sm:text-xs md:text-base lg:text-lg leading-[1.4] uppercase" style="font-family: 'Manrope', sans-serif">
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
let observer = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // More precise triggering in the central viewport
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    // Collect all intersecting entries to find the one closest to top
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        if (id === 'biography-section' || id === 'year-2006') {
          activeYear.value = '2006'
        } else if (id.startsWith('year-')) {
          activeYear.value = id.replace('year-', '')
        }
      }
    })
  }, options)

  // Observe historical sections
  const sections = [
    document.getElementById('biography-section'),
    document.getElementById('year-2006'),
    ...timelineYears.slice(1).map(year => document.getElementById(`year-${year.year}`))
  ]

  sections.forEach(section => {
    if (section) observer.observe(section)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const currentBiography = computed(() => {
  return timelineYears.find(item => item.year === activeYear.value) || timelineYears[0]
})

const setActiveYear = (year) => {
  activeYear.value = year
}

const scrollToYear = (year) => {
  setActiveYear(year)
  
  // Scroll to corresponding section smoothly
  if (typeof window !== 'undefined') {
    // Map year to section ID
    const sectionId = year === '2006' ? 'biography-section' : `year-${year}`
    const section = document.getElementById(sectionId)
    
    if (section) {
      const headerHeight = 100 // Approximate header height
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }
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

/* Years Timeline Fixed Position */
.years-timeline-fixed {
  position: fixed;
  left: clamp(80px, 5vw, 80px);
  top: 30%;
  transform: translateY(-50%);
  z-index: 1040;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.5vh, 24px);
  pointer-events: auto;
}

@media (max-width: 1023px) {
  .years-timeline-fixed {
    display: none;
  }
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

/* Контейнер для скролла с фиксированной линией-треком */
.scroll-container-fixed {
  position: relative;
}

.scroll-container-fixed::after {
  content: "";
  position: absolute;
  right: 1.5px; /* Центрируем линию под 3px ползунком */
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 0;
  pointer-events: none;
}

.scrollable-text {
  position: relative;
  z-index: 1;
}
</style>

