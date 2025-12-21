<template>
  <section class="ecocity-hero">
    <!-- Background Image -->
    <div class="ecocity-hero__bg">
      <img
        src="/images/c128e2cbdc01ecd9ac287c89ce18f16ad7d56854.webp"
        alt="Жилой комплекс Экогород 3"
        class="ecocity-hero__image"
      />
      <div class="ecocity-hero__overlay"></div>
    </div>

    <div class="container-fluid h-full relative z-10">
      <!-- Top Info Chips -->
      <div class="ecocity-hero__chips">
        <div class="hero-chip hero-chip--green">
          <span class="hero-chip__label">В ПРОДАЖЕ</span>
          <span class="hero-chip__value">192 КВАРТИРЫ</span>
        </div>
        <div class="hero-chip">
          <span class="hero-chip__label">РАЙОН</span>
          <span class="hero-chip__value">ЗАВОЛЖСКИЙ</span>
        </div>
        <div class="hero-chip">
          <span class="hero-chip__label">СТАТУС</span>
          <span class="hero-chip__value">СТРОИТСЯ</span>
        </div>
        <div class="hero-chip">
          <span class="hero-chip__label">СРОК СДАЧИ</span>
          <span class="hero-chip__value">4 КВАРТАЛ 2025</span>
        </div>
      </div>

      <!-- Bottom Layout -->
      <div class="ecocity-hero__content-wrapper">
        <!-- Bottom Left Text -->
        <div class="ecocity-hero__info">
          <span class="ecocity-hero__subtitle uppercase tracking-widest text-[10px] md:text-sm font-light opacity-80 mb-2 block">
            ЖИЛОЙ КОМПЛЕКС
          </span>
          <h1 class="ecocity-hero__title font-black text-4xl md:text-7xl lg:text-[84px] leading-[0.9] mb-6">
            ЭКОГОРОД 3
          </h1>
          <p class="ecocity-hero__description text-sm md:text-base opacity-90 max-w-[420px] font-light leading-relaxed">
            Пространство, где каждая деталь создана для вашего комфорта. Среди сосен, в экологически чистом районе, начинается жизнь, о которой вы мечтали.
          </p>
        </div>

        <!-- Floating Vertical Actions (Right) -->
        <div class="ecocity-hero__side-actions">
           <div class="vertical-group">
            <button class="side-btn" aria-label="WhatsApp">
              <img src="/images/menu-icons/menu-icon-1.webp" alt="WhatsApp" />
            </button>
            <button class="side-btn" aria-label="Telegram">
              <img src="/images/menu-icons/menu-icon-2.webp" alt="Telegram" />
            </button>
            <button class="side-btn" aria-label="Phone">
              <img src="/images/menu-icons/menu-icon-3.webp" alt="Phone" />
            </button>
            <button class="side-btn side-btn--orange" aria-label="Scroll Down">
              <!-- TODO: Replace with /images/icons/ecocity-scroll-down.webp after downloading from Figma -->
              <img 
                src="/images/icons/chevron-down.webp" 
                alt="Scroll Down" 
                class="w-5 h-5 object-contain"
              />
            </button>
           </div>
        </div>

        <!-- Bottom Right Circle Buttons -->
        <div class="ecocity-hero__bottom-actions">
           <button class="circle-btn" @click="$emit('open3d')" aria-label="3D Model">
             <img src="/images/icons/Group 134.webp" alt="3D" class="w-full h-full object-contain" />
           </button>
           <button class="circle-btn" aria-label="Location">
             <img src="/images/icons/ecocity-location.webp" alt="Location" class="w-full h-full object-contain" />
           </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open3d'])

// TODO: After downloading icons from Figma, update these paths:
// scrollDownIcon: '/images/icons/ecocity-scroll-down.webp'
// locationIcon: '/images/icons/ecocity-location.webp' (then change v-if to use img instead of svg)
</script>

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
  padding: 0 40px;
}

.ecocity-hero__chips {
  position: absolute;
  top: 140px;
  left: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 20;
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

.hero-chip--green {
  background: #467c51; 
  border-color: rgba(255, 255, 255, 0.2);
}

.hero-chip--green .hero-chip__label {
  color: #fff;
  opacity: 1;
  font-weight: 600;
}

.ecocity-hero__content-wrapper {
  position: absolute;
  inset: 0;
  padding: 40px;
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
  right: 40px;
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
  right: 120px;
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
  .container-fluid {
    padding: 0 20px;
  }
  .ecocity-hero__chips {
    top: 100px;
    left: 20px;
    gap: 10px;
  }
  .hero-chip {
    height: 36px;
  }
  .hero-chip__label {
    padding: 0 10px;
  }
  .hero-chip__value {
    padding: 0 15px;
  }
  .ecocity-hero__content-wrapper {
    padding: 20px;
  }
  .ecocity-hero__bottom-actions {
    right: 20px;
    bottom: 40px;
  }
  .ecocity-hero__side-actions {
    right: 20px;
    bottom: 120px;
  }
}
</style>

