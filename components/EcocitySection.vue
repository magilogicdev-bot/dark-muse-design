<template>
  <section class="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
    <div class="max-w-[1770px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-start">
        
        <!-- ROW 1: Quote Text (Top Left) -->
        <div class="text-white order-1 lg:order-1">
          <p class="quote-text font-light leading-[1.2]">
            Когда меня по-настоящему захватывает какое-то  дело, я не могу остановиться на достигнутом. Всегда вырастает до чего-то по-настоящему значимого хочется большего, хочется увидеть, как моя идея И вот, после долгих размышлений и вдохновения, я принял твердое решение: пора воплощать в жизнь мою мечту о современном, экологичном и по-настоящему комфортном пространстве.
          </p>
        </div>

        <!-- ROW 1: Grayscale House Image (Top Right) -->
        <div class="relative w-full aspect-[4/3] overflow-hidden order-2 lg:order-2">
          <NuxtImg
            src="/images/ecocity-house-bw.webp"
            alt="Современный дом ЭКОГОРОД"
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
          />
        </div>

        <!-- ROW 2: Townhouses Image with Carousel (Bottom Left) -->
        <div class="relative w-full order-3 lg:order-3">
          <!-- Image Container -->
          <div class="relative w-full aspect-[4/3] overflow-hidden">
            <NuxtImg
              src="/images/ecocity-townhouses.webp"
              alt="Жилой комплекс ЭКОГОРОД"
              class="w-full h-full object-cover"
              loading="lazy"
              format="webp"
            />
          </div>

          <!-- Carousel Dots -->
          <div class="flex justify-center gap-2 mt-3">
            <button
              v-for="(dot, index) in carouselDots"
              :key="index"
              :class="[
                'w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50',
                dot.active ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              ]"
              @click="setActiveDot(index)"
              :aria-label="`Перейти к слайду ${index + 1}`"
              :aria-current="dot.active ? 'true' : 'false'"
            ></button>
          </div>
        </div>

        <!-- ROW 2: Description Text + Button (Bottom Right) -->
        <div class="flex flex-col gap-5 md:gap-6 lg:gap-7 order-4 lg:order-4">
          <!-- Description Text (Figma 992:54) -->
          <div class="description-text space-y-4 text-left">
            <p>
              ЭКОГОРОД: Новый стандарт жизни в Ярославской области, который говорит сам за себя
            </p>

            <p>
              В Ярославской области стремительно набирает обороты популярность жилого комплекса ЭКОГОРОД. Этот проект не нуждается в громкой рекламе – о нем говорят сами жители и с интересом изучают конкуренты. Секрет успеха кроется в продуманных до мелочей решениях, которые делают жизнь здесь по-настоящему комфортной и современной.
            </p>

            <p>
              Представьте себе двор, свободный от автомобилей, где безопасно играют дети, а прогулки проходят в спокойной атмосфере. ЭКОГОРОД воплощает эту мечту в реальность, предлагая двусторонние подъезды и удобную навигацию. Панорамные окна наполняют квартиры светом и открывают живописные виды, а французские балконы добавляют изысканности. Особое внимание уделено ландшафтному дизайну: каждый уголок комплекса утопает в зелени, а детские площадки вынесены в отдельные, безопасные зоны, где малыши могут резвиться и развиваться. Все эти современные и функциональные решения высоко ценятся жителями и становятся предметом обсуждения среди застройщиков города.
            </p>

            <p>
              Но что делает ЭКОГОРОД еще более уникальным? Это его стремление к полной независимости и контролю качества. Компания не просто строит, а активно инвестирует в собственное производство, обеспечивая до 42% строительных материалов из собственных ресурсов. Это не только гарантирует высокое качество, но и позволяет оптимизировать сроки и стоимость строительства.
            </p>
          </div>

          <!-- Button (Figma 992:55 + 992:56) -->
          <div class="flex justify-start">
            <button 
              @click="navigateTo('/project/ecocity')"
              class="group inline-flex items-center gap-3 text-white hover:text-white/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary rounded-sm px-2 py-1 cursor-pointer relative z-50"
              aria-label="Узнать подробнее о проекте ЭКОГОРОД"
            >
              <span class="button-text uppercase">
                ПОДРОБНЕЕ
              </span>
              <img 
                src="/images/arrow-right.svg" 
                alt="" 
                class="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Carousel dots state
const carouselDots = ref([
  { active: true },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
  { active: false }
])

const setActiveDot = (index) => {
  carouselDots.value.forEach((dot, i) => {
    dot.active = i === index
  })
}
</script>

<style scoped>
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Marck+Script&display=swap');

/* Quote Text - smaller sizes matching screenshot */
.quote-text {
  font-family: 'LeoHand', 'Marck Script', cursive;
  font-size: clamp(14px, 1.4vw, 18px);
  letter-spacing: 0.14em;
  line-height: 1.3;
  font-weight: 300;
}

/* Description Text - smaller sizes matching screenshot */
.description-text {
  font-family: 'Mazzard', 'Manrope', 'Inter', sans-serif;
}

.description-text p {
  font-size: clamp(10px, 1vw, 13px);
  letter-spacing: 0.14em;
  line-height: 1.4;
  font-weight: 400;
}

/* Button Text - smaller size */
.button-text {
  font-family: 'Mazzard', 'Manrope', 'Inter', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  letter-spacing: 0.14em;
  font-weight: 400;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .quote-text {
    font-size: clamp(16px, 4vw, 20px);
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
    font-size: clamp(16px, 2vw, 20px);
  }
  
  .description-text p {
    font-size: clamp(11px, 1.5vw, 13px);
  }
}
</style>

