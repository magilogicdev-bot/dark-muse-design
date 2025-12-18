<template>
  <section class="relative py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
    <!-- Background Decorative Elements: Mountains and Excavator -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <!-- Excavator Illustration (positioned in lower-left area) -->
      <img
        src="/images/dagestan-excavator.png"
        alt=""
        class="absolute top-[530px] left-[81px] w-[40%] md:w-[35%] lg:w-[45%] max-w-[650px] h-auto object-contain opacity-30"
        aria-hidden="true"
      />
    </div>
    
    <div class="relative max-w-[1770px] mx-auto z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
        
        <!-- LEFT COLUMN: Poetic Text Only -->
        <div class="flex flex-col gap-6 lg:gap-8 order-1 lg:order-1 lg:pt-8">
          <!-- Poetic Text Block -->
          <div class="text-white max-w-[500px]">
            <p class="quote-text italic font-light leading-[1.3]">
              Камень - это не просто безмолвный свидетель времени, не просто строительный материал или элемент пейзажа. В нем заключена своя, особая музыка - тихая, глубокая, пронизанная мудростью веков. Это не мелодия, которую можно услышать ухом, а скорее вибрация, ощущение, которое проникает в самую суть
            </p>
          </div>
        </div>

        <!-- RIGHT COLUMN: Building + Description + Button -->
        <div class="flex flex-col gap-6 md:gap-8 lg:gap-10 order-2 lg:order-2">
          
          <!-- Building Image "Камни Дагестана" -->
          <div class="relative aspect-[16/10] overflow-hidden rounded-sm shadow-lg">
            <img 
              src="/images/dagestan-building-new.png" 
              alt="Здание Камни Дагестана" 
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Company and Product Description Text -->
          <div class="description-text space-y-3 text-right text-white/90">
            <p>
              "Камни Дагестана" является признанным лидером в производстве высококачественных облицовочных материалов. Находясь в самом сердце Дагестана, она специализируется на создании продукции, отвечающей самым взыскательным требованиям современного строительства и дизайна.
            </p>

            <p>
              Компания предлагает впечатляющий ассортимент натурального камня, насчитывающий более 60 эксклюзивных расцветок. В нашем каталоге вы найдете:
            </p>

            <p>
              <strong>Песчаник:</strong> прочный и долговечный материал с неповторимой текстурой, идеально подходящий для создания классических и современных фасадов.
            </p>

            <p>
              <strong>Известняк:</strong> элегантный и благородный камень, придающий зданиям изысканный вид и обеспечивающий превосходную теплоизоляцию.
            </p>

            <p>
              <strong>Доломит:</strong> камень с высокой прочностью и устойчивостью к атмосферным воздействиям, идеальный для облицовки фасадов и создания ландшафтных элементов.
            </p>

            <p>
              <strong>Ракушечник:</strong> легкий и теплый материал с уникальной пористой структурой, обладающий отличными звукоизоляционными свойствами и создающий неповторимый средиземноморский стиль.
            </p>
          </div>

          <!-- Button "ПОДРОБНЕЕ" with down arrow -->
          <div class="flex justify-end">
            <button 
              class="group inline-flex flex-col items-center gap-2 text-white hover:text-white/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary rounded-sm px-4 py-2"
              aria-label="Узнать подробнее о Камнях Дагестана"
            >
              <span class="button-text uppercase tracking-[0.14em]">
                ПОДРОБНEE
              </span>
              <!-- Down Arrow SVG -->
              <svg 
                class="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-y-1" 
                viewBox="0 0 12 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// No reactive state needed for this component
</script>

<style scoped>
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Marck+Script&display=swap');

/* Quote Text - poetic style */
.quote-text {
  font-family: 'LeoHand', 'Marck Script', cursive;
  font-size: clamp(18px, 2vw, 28px);
  letter-spacing: 0.02em;
  line-height: 1.4;
  font-weight: 300;
  font-style: italic;
}

/* Description Text */
.description-text {
  font-family: 'Mazzard', 'Manrope', 'Inter', sans-serif;
}

.description-text p {
  font-size: clamp(10px, 1vw, 13px);
  letter-spacing: 0.14em;
  line-height: 1.5;
  font-weight: 400;
}

.description-text p strong {
  font-weight: 500;
}

/* Button Text */
.button-text {
  font-family: 'Mazzard', 'Manrope', 'Inter', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  letter-spacing: 0.14em;
  font-weight: 400;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .quote-text {
    font-size: clamp(16px, 4.5vw, 22px);
  }
  
  .description-text p {
    font-size: clamp(12px, 3vw, 14px);
  }
  
  .button-text {
    font-size: clamp(14px, 3.5vw, 16px);
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .quote-text {
    font-size: clamp(18px, 2.5vw, 24px);
  }
  
  .description-text p {
    font-size: clamp(11px, 1.5vw, 13px);
  }
}
</style>
