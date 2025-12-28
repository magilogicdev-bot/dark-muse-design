<template>
  <div class="home-page bg-primary text-white">
    <!-- Background 3D Model - Pinned to bottom right -->
    <div class="home-page__background">
      <NuxtImg
        src="/images/menu-3d-background.webp"
        alt="3D модель жилого комплекса"
        class="home-page__background-image"
        format="webp"
        loading="lazy"
      />
    </div>
    
    <!-- 3D Icon Button - Outside menu-background to be clickable -->
    <button 
      class="home-page__3d-button" 
      aria-label="Интерактивная 3D модель"
      @click="handle3DButtonClick"
    >
      <NuxtImg
        src="/images/3d-icon-button.webp"
        alt="3D"
        class="home-page__3d-button-icon"
        format="webp"
        loading="lazy"
      />
    </button>



    <!-- Bottom Right Buttons (Audio + Video) -->
    <div class="home-page__bottom-buttons">
      <button
        @click="handleAudioClick"
        class="home-page__audio-button"
        aria-label="Аудио"
      >
        <NuxtImg
          src="/images/menu-icons/audio-button.png"
          alt="Аудио"
          class="home-page__audio-button-icon"
          format="png"
          loading="lazy"
        />
      </button>
      <button
        @click="handleVideoClick"
        class="home-page__bottom-video-button"
        aria-label="ВИДЕО"
      >
        <svg
          class="home-page__bottom-video-button-play-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5v14l11-7z" fill="currentColor"/>
        </svg>
        <span class="home-page__bottom-video-button-text">ВИДЕО</span>
      </button>

    </div>

    <!-- Video Button (Center) -->
    <div class="home-page__video-container">
      <button
        @click="handleVideoClick"
        class="home-page__video-button"
        aria-label="ВИДЕО"
      >
        <NuxtImg
          src="/images/menu-icons/menu-video-button.webp"
          alt="ВИДЕО"
          class="home-page__video-button-image"
          format="webp"
          loading="lazy"
        />
      </button>
      <NuxtImg
        src="/images/menu-tagline.png"
        alt="Легко трудно быть уникальным"
        class="home-page__video-text"
        loading="lazy"
      />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteConfig } from '~/config/contacts'

// Используем layout без футера
definePageMeta({
  layout: 'home'
})

const config = siteConfig
const is3DViewerOpen = ref(false)

// Menu items
const menuItems = [
  { label: 'КОМПАНИЯ', to: '/about' },
  { label: 'ПРОЕКТЫ', to: '/projects' },
  { label: 'ВЫБОР КВАРТИРЫ', to: '/apartment-selection' },
  { label: 'ИПОТЕКА', to: '/mortgage' },
  { label: 'КОНТАКТЫ', to: '/contacts' },
  { label: 'НОВОСТИ', to: '/news' },
]

// Computed для телефонных ссылок
const phoneHref = 'tel:' + config.contacts.phone.formatted

// Handle 3D button click
const handle3DButtonClick = () => {
  window.open('/3d-map', '_blank')
}

const close3DViewer = () => {
  is3DViewerOpen.value = false
}


const handleAudioClick = () => {
  // Обработка клика на кнопку аудио
  console.log('Аудио открыто')
}

const handleVideoClick = () => {
  // Обработка клика на кнопку видео
  console.log('Видео открыто')
}

usePageMeta({
  title: 'Pobedonoscev Group - Строим будущее',
  description: 'Современные жилые комплексы от Pobedonoscev Group. Экологичность, комфорт и инновации в каждом проекте.'
})
</script>

<style scoped>
.home-page {
  position: relative;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  background: #2a2c38;
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: hidden;
}

/* Background 3D Model - Pinned to bottom right */
.home-page__background {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
  display: block;
  width: auto;
  height: auto;
}

.home-page__background-image {
  position: absolute;
  left: -467px;
  top: -740px;
  display: block !important;
  width: auto;
  height: auto;
  max-width: 95vw;
  max-height: 95vh;
  min-width: 800px;
  min-height: 700px;
  object-fit: contain;
  object-position: bottom right;
  opacity: 1;
  visibility: visible;
}

@media (min-width: 1025px) {
  .home-page__background {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
  }
  .home-page__background-image {
    left: auto;
    top: auto;
    right: 0;
    bottom: 0;
    width: 90vw;
    height: 90vh;
    max-width: none;
    max-height: none;
    min-width: 0;
    min-height: 0;
    object-position: bottom right;
  }
}

/* 3D Icon Button */
.home-page__3d-button {
  position: absolute;
  left: -41px;
  top: 674px;
  transform: translate(calc(50% + clamp(120px, 12vw, 220px)), calc(-50% + clamp(100px, 12vh, 180px)));
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  pointer-events: auto;
  transition: transform 0.3s ease, opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  width: clamp(140px, 14vw, 180px);
  height: clamp(120px, 12vw, 155px);
}

.home-page__3d-button:hover {
  opacity: 0.9;
  transform: translate(calc(50% + clamp(120px, 12vw, 220px)), calc(-50% + clamp(100px, 12vh, 180px))) scale(1.15);
}

.home-page__3d-button:active {
  opacity: 0.8;
  transform: translate(calc(50% + clamp(120px, 12vw, 220px)), calc(-50% + clamp(100px, 12vh, 180px))) scale(1.05);
}

.home-page__3d-button-icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

@media (min-width: 1025px) {
  .home-page__3d-button {
    left: auto;
    right: 35%;
    top: auto;
    bottom: 45%;
    transform: translate(50%, 50%);
    width: clamp(160px, 15vw, 200px);
    height: clamp(140px, 13vw, 175px);
  }
  
  .home-page__3d-button:hover {
    transform: translate(50%, 50%) scale(1.1);
  }
}

.home-page__menu {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1rem, 4vw, 3.75rem);
  padding-right: clamp(1rem, 4vw, 3.75rem);
  padding-top: clamp(72px, 16vh, 220px);
  padding-bottom: clamp(48px, 8vh, 120px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.home-page__content {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  gap: clamp(12px, 2vw, 28px);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.home-page__rail-lines {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin-top: clamp(-20px, -2vh, -10px);
}

.home-page__rail-line {
  flex-shrink: 0;
  width: 1px;
  height: clamp(320px, 62vh, 820px);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.75) 35%,
    rgba(255, 255, 255, 0.75) 65%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.18);
  margin-top: clamp(8px, 1vh, 12px);
}

.home-page__rail-line--left {
  width: 0.5px;
  background: linear-gradient(
    180deg,
    rgba(218, 165, 32, 0) 0%,
    rgba(218, 165, 32, 0.4) 35%,
    rgba(218, 165, 32, 0.4) 65%,
    rgba(218, 165, 32, 0) 100%
  );
  box-shadow: 0 0 8px rgba(218, 165, 32, 0.15);
  margin-top: 0;
}

.home-page__nav {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 3vh, 32px);
  padding-top: 0;
}

.home-page__link {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(16px, 1.2vw, 20px);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
  display: inline-block;
}

.home-page__link:hover {
  opacity: 0.9;
  transform: translateX(8px);
  color: #f8b543;
}

.home-page__mobile-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.home-page__phone {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
}

.home-page__presentation-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
}


/* Bottom Right Buttons (Audio + Video) */
.home-page__bottom-buttons {
  position: absolute;
  left: 53px;
  bottom: clamp(98px, 10vh, 120px);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 20px);
  pointer-events: auto;
}

@media (min-width: 1025px) {
  .home-page__bottom-buttons {
    left: auto;
    align-items: bottom;
    right: clamp(120px, 10vw, 200px);
  }
}

.home-page__audio-button {
  position: relative;
  width: clamp(40px, 4vw, 40px);
  height: clamp(40px, 4vw, 40px);
  border-radius: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  outline: none;
  flex-shrink: 0;
}

.home-page__audio-button:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.home-page__audio-button:active {
  transform: scale(0.95);
}

.home-page__audio-button-icon {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  background: transparent;
}

.home-page__bottom-video-button {
  position: relative;
  padding: clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 18px);
  border-radius: clamp(20px, 2.5vw, 26px);
  background: rgba(42, 44, 56, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  outline: none;
  white-space: nowrap;
}

.home-page__bottom-video-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
  background: rgba(42, 44, 56, 0.95);
  border-color: rgba(255, 255, 255, 0.5);
}

.home-page__bottom-video-button:active {
  transform: scale(0.98);
}

.home-page__bottom-video-button-play-icon {
  width: clamp(12px, 1.2vw, 15px);
  height: clamp(12px, 1.2vw, 15px);
  color: rgba(255, 255, 255, 0.9);
  display: block;
  flex-shrink: 0;
}

.home-page__bottom-video-button-text {
  font-size: clamp(11px, 1.1vw, 14px);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  line-height: 1;
}



/* Video Button Container (Aligned with КОМПАНИЯ) */
.home-page__video-container {
  position: absolute;
  top: clamp(60px, 8vh, 120px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 2vh, 24px);
  pointer-events: auto;
  margin-top: clamp(60px, 8vh, 120px);
}

/* Video Button */
.home-page__video-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  outline: none;
  width: clamp(400px, 45vw, 850px);
  height: clamp(55px, 7vh, 120px);
  font-size: clamp(18px, 2vw, 20px);
  line-height: 1.2;
  color: rgba(255, 255, 255, 1);
}

.home-page__video-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.home-page__video-button:active {
  transform: scale(0.98);
}

.home-page__video-button-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* Video Text Below Button (Image) */
.home-page__video-text {
  position: relative;
  display: block;
  width: 350px;
  height: 148px;
  object-fit: contain;
  margin: 0;
  line-height: 42px;
}

@media (max-width: 768px) {
  .home-page__mobile-links {
    display: none;
  }

  .home-page__menu {
    padding-top: 44px;
    padding-left: clamp(1rem, 3vw, 2rem);
    padding-right: clamp(1rem, 3vw, 2rem);
  }

  .home-page__background-image {
    max-width: min(95vw, 1400px);
    max-height: min(95vh, 1200px);
  }


  .home-page__video-container {
    margin-top: clamp(40px, 6vh, 80px);
    gap: 12px;
  }

  .home-page__video-button-image {
    max-width: clamp(250px, 35vw, 450px);
    max-height: clamp(45px, 6vh, 90px);
  }

  .home-page__video-text {
    width: 350px;
    height: 148px;
    line-height: 42px;
  }

  .home-page__3d-button {
    left: 20px;
    bottom: 135px;
    top: auto;
    transform: none;
    width: 130px;
    height: auto;
  }

  .home-page__3d-button:hover {
    transform: scale(1.05);
  }

  .home-page__bottom-buttons {
    left: 20px;
    bottom: 55px;
    top: auto;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .home-page__content {
    gap: clamp(12px, 2.5vw, 18px);
  }

  .home-page__nav {
    gap: clamp(16px, 2.5vh, 20px);
  }

  .home-page__link {
    font-size: clamp(14px, 2vw, 16px);
  }

  .home-page__menu {
    padding-left: clamp(0.75rem, 4vw, 1.5rem);
    padding-right: clamp(0.75rem, 4vw, 1.5rem);
  }

  .home-page__background-image {
    max-width: min(95vw, 1300px);
    max-height: min(95vh, 1100px);
  }
}



@media (max-width: 480px) {
  .home-page__content {
    gap: clamp(10px, 2vw, 14px);
  }

  .home-page__link {
    font-size: clamp(12px, 1.8vw, 14px);
  }

  .home-page__menu {
    padding-left: clamp(0.75rem, 4vw, 1rem);
    padding-right: clamp(0.75rem, 4vw, 1rem);
  }

  .home-page__phone {
    font-size: 18px;
  }

  .home-page__background-image {
    max-width: min(95vw, 1200px);
    max-height: min(95vh, 1000px);
  }

  .home-page__3d-button {
    left: 15px;
    bottom: 120px;
    width: 110px;
  }

  .home-page__bottom-buttons {
    left: 15px;
    bottom: 65px;
    gap: 10px;
  }

  .home-page__video-button-image {
    max-width: clamp(200px, 35vw, 380px);
    max-height: clamp(40px, 5vh, 75px);
  }
}
</style>
