<template>
  <section class="ecocity-hero">
    <!-- Background Image -->
    <div class="ecocity-hero__bg">
      <NuxtImg
        :src="bgImage"
        :alt="title"
        class="ecocity-hero__image"
        format="webp"
        preload
      />
      <div class="ecocity-hero__overlay"></div>
    </div>

    <div class="container-fluid h-full relative z-10">
      <!-- Top Info Chips -->
      <div class="ecocity-hero__chips">
        <div 
          v-for="(chip, index) in chips" 
          :key="index"
          class="hero-chip hero-chip--combined"
          :class="chip.class"
        >
          <span class="hero-chip__label-part uppercase">{{ chip.label }}</span>
          <span class="hero-chip__value-part uppercase">{{ chip.value }}</span>
        </div>
      </div>

      <!-- Bottom Layout -->
      <div class="ecocity-hero__content-wrapper">
        <!-- Bottom Left Text -->
        <div class="ecocity-hero__info">
          <span class="ecocity-hero__subtitle uppercase tracking-widest text-[10px] md:text-sm font-light opacity-80 mb-2 block">
            {{ subtitle }}
          </span>
          <h1 class="ecocity-hero__title font-black text-3xl md:text-5xl lg:text-[84px] leading-[0.9] mb-6">
            {{ title }}
          </h1>
          <p class="ecocity-hero__description text-sm md:text-base opacity-90 max-w-[420px] font-light leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Bottom Right Circle Buttons -->
        <div class="ecocity-hero__bottom-actions">
           <button class="circle-btn" @click="$emit('open3d')" aria-label="3D Model">
             <NuxtImg src="/images/icons/Group 134.webp" alt="3D" class="w-full h-full object-contain" loading="lazy" format="webp" />
           </button>
           <button class="circle-btn" aria-label="Location">
             <NuxtImg src="/images/icons/ecocity-location.webp" alt="Location" class="w-full h-full object-contain" loading="lazy" format="webp" />
           </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'ЭКОГОРОД 3'
  },
  subtitle: {
    type: String,
    default: 'ЖИЛОЙ КОМПЛЕКС'
  },
  description: {
    type: String,
    default: 'Пространство, где каждая деталь создана для вашего комфорта. Среди сосен, в экологически чистом районе, начинается жизнь, о которой вы мечтали.'
  },
  bgImage: {
    type: String,
    default: '/images/alfa/1125-16257.webp'
  },
  chips: {
    type: Array,
    default: () => [
      { label: 'В ПРОДАЖЕ', value: '192 КВАРТИРЫ', class: 'hero-chip--green' },
      { label: 'РАЙОН', value: 'ЗАВОЛЖСКИЙ' },
      { label: 'СТАТУС', value: 'СТРОИТСЯ' },
      { label: 'СРОК СДАЧИ', value: '4 КВАРТАЛ 2025' }
    ]
  }
})

defineEmits(['open3d'])
</script>

<style scoped>
/* ... existing styles ... */
</style>

<style scoped>
.ecocity-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  color: #fff;
  background: #000;
}

.ecocity-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.ecocity-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
}

.ecocity-hero__overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at bottom left, rgba(0,0,0,0.5) 0%, transparent 60%);
}

.container-fluid {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4.16vw, 80px); /* Matches px-4 to 2xl:px-20 */
}

.ecocity-hero__chips {
  position: absolute;
  top: 140px;
  left: clamp(16px, 4.16vw, 80px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 20;
}

.chips-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.hero-chip {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 100px;
  height: 48px;
  width: fit-content;
  overflow: hidden;
}

.hero-chip__label {
  padding: 0 16px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.hero-chip__value {
  background: #fff;
  color: #000;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
}

.hero-chip__single {
  padding: 0 24px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.hero-chip--combined {
  background: rgba(50, 50, 50, 0.9);
  padding: 0;
  overflow: hidden;
}

.hero-chip__label-part {
  padding: 0 20px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #fff;
}

.hero-chip__value-part {
  background: #fff;
  color: #000;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.hero-chip--orange {
  background: #F2994A;
  border-color: transparent;
}

.hero-chip--orange .hero-chip__single {
  color: #fff;
}

.hero-chip--dark {
  background: rgba(50, 50, 50, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
}

.hero-chip--dark .hero-chip__single {
  color: #fff;
}

.hero-chip--white {
  background: #fff;
  border-color: transparent;
}

.hero-chip--white .hero-chip__single {
  color: #000;
}

.hero-chip--green {
  background: #467c51 !important;
  border-color: rgba(255, 255, 255, 0.2);
}

.ecocity-hero__content-wrapper {
  position: absolute;
  inset: 0;
  padding: 40px clamp(16px, 4.16vw, 80px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
}

.ecocity-hero__info {
  margin-bottom: 20px;
  pointer-events: auto;
}

.ecocity-hero__side-actions {
  position: absolute;
  right: clamp(16px, 4.16vw, 80px);
  bottom: 140px;
  z-index: 30;
  pointer-events: auto;
}

.vertical-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.side-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(42, 44, 56, 0.6);
  backdrop-filter: blur(4px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.side-btn:hover {
  background: #fff;
  transform: scale(1.1);
}

.side-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.side-btn:hover img {
  filter: invert(1);
}

.side-btn--orange {
  background: #d4952d;
  border: none;
}

.ecocity-hero__bottom-actions {
  position: absolute;
  right: clamp(16px, 4.16vw, 80px);
  bottom: 40px;
  display: flex;
  gap: 20px;
  pointer-events: auto;
}

.circle-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.circle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #fff;
  transform: translateY(-5px);
}

@media (max-width: 1024px) {
  .ecocity-hero__title {
    font-size: 56px;
  }
}

@media (max-width: 768px) {
  .ecocity-hero__title {
    font-size: 42px;
  }
  .container-fluid {
    padding: 0 clamp(16px, 4.16vw, 80px);
  }
  .ecocity-hero__chips {
    top: 100px;
    gap: 8px;
  }
  .hero-chip {
    height: 32px;
  }
  .hero-chip__label-part {
    padding: 0 12px;
    font-size: 9px;
  }
  .hero-chip__value-part {
    padding: 0 16px;
    font-size: 9px;
  }
  .ecocity-hero__content-wrapper {
    padding: 20px;
  }
  .ecocity-hero__bottom-actions {
    display: none;
  }
  .ecocity-hero__side-actions {
    right: 20px;
    bottom: 120px;
  }
}
</style>

