<template>
  <div class="home-page bg-primary text-white">
    <!-- Background 3D Model - Pinned to bottom right -->
    <div class="home-page__background">
      <img
        src="/images/menu-3d-background.webp"
        alt="3D модель жилого комплекса"
        class="home-page__background-image"
      />
    </div>
    
    <!-- 3D Icon Button - Outside menu-background to be clickable -->
    <button 
      class="home-page__3d-button" 
      aria-label="Интерактивная 3D модель"
      @click="handle3DButtonClick"
    >
      <img
        src="/images/3d-icon-button.webp"
        alt="3D"
        class="home-page__3d-button-icon"
      />
    </button>

    <div class="home-page__menu">
      <div class="home-page__mobile-links">
        <a :href="phoneHref" class="home-page__phone">
          {{ config.contacts.phone.primary }}
        </a>
        <a :href="config.navigation.getPresentation" class="home-page__presentation-link">
          ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
        </a>
      </div>
    </div>

    <!-- Action Menu Button -->
    <ActionMenuButton />

    <!-- Bottom Right Buttons (Audio + Video) -->
    <div class="home-page__bottom-buttons">
      <button
        @click="handleAudioClick"
        class="home-page__audio-button"
        aria-label="Аудио"
      >
        <svg
          class="home-page__audio-button-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="12" width="2" height="8" fill="currentColor"/>
          <rect x="8" y="8" width="2" height="16" fill="currentColor"/>
          <rect x="12" y="4" width="2" height="24" fill="currentColor"/>
          <rect x="16" y="10" width="2" height="12" fill="currentColor"/>
        </svg>
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
        <img
          src="/images/menu-icons/menu-video-button.webp"
          alt="ВИДЕО"
          class="home-page__video-button-image"
        />
      </button>
      <img
        src="/images/menu-tagline.webp"
        alt="Легко трудно быть уникальным"
        class="home-page__video-text"
      />
    </div>

    <!-- 3D Model Viewer Modal -->
    <Model3DViewer
      v-if="is3DViewerOpen"
      :is-open="is3DViewerOpen"
      model-path="/models/4.gltf"
      @close="close3DViewer"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { siteConfig } from '~/config/contacts'

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
  is3DViewerOpen.value = true
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
  min-height: 90vh;
  background: #2a2c38;
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
  display: block !important;
  width: auto;
  height: auto;
  max-width: 60vw;
  max-height: 70vh;
  min-width: 400px;
  min-height: 300px;
  object-fit: contain;
  object-position: bottom right;
  opacity: 1;
  visibility: visible;
}

/* 3D Icon Button */
.home-page__3d-button {
  position: absolute;
  left: 50%;
  top: 50%;
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
  display: none;
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
  right: clamp(120px, 12vw, 200px);
  bottom: clamp(32px, 4vh, 64px);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 20px);
  pointer-events: auto;
}

.home-page__audio-button {
  position: relative;
  width: clamp(40px, 4vw, 52px);
  height: clamp(40px, 4vw, 52px);
  border-radius: 50%;
  background: rgba(42, 44, 56, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  outline: none;
  flex-shrink: 0;
}

.home-page__audio-button:hover {
  transform: scale(1.1);
  opacity: 0.9;
  background: rgba(42, 44, 56, 0.95);
  border-color: rgba(255, 255, 255, 0.5);
}

.home-page__audio-button:active {
  transform: scale(0.95);
}

.home-page__audio-button-icon {
  width: clamp(16px, 2vw, 22px);
  height: clamp(16px, 2vw, 22px);
  color: rgba(255, 255, 255, 0.9);
  display: block;
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
  width: clamp(300px, 35vw, 427px);
  height: clamp(45px, 5.5vh, 55px);
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
  position: absolute;
  left: 44px;
  top: 90px;
  display: block;
  width: auto;
  height: auto;
  max-width: clamp(200px, 25vw, 300px);
  max-height: clamp(50px, 6vh, 80px);
  object-fit: contain;
  margin: 0;
}

@media (max-width: 1024px) {
  .home-page__mobile-links {
    display: flex;
  }

  .home-page__menu {
    padding-top: 44px;
    padding-left: clamp(1rem, 3vw, 2rem);
    padding-right: clamp(1rem, 3vw, 2rem);
  }

  .home-page__background-image {
    max-width: min(80vw, 1000px);
    max-height: min(85vh, 800px);
  }


  .home-page__video-container {
    margin-top: clamp(40px, 6vh, 80px);
    gap: 12px;
  }

  .home-page__video-button-image {
    max-width: clamp(180px, 28vw, 350px);
    max-height: clamp(35px, 4.5vh, 70px);
  }

  .home-page__video-text {
    max-width: clamp(180px, 28vw, 280px);
    max-height: clamp(45px, 5.5vh, 70px);
  }

  .home-page__3d-button {
    transform: translate(calc(50% + clamp(90px, 9vw, 180px)), calc(-50% + clamp(70px, 9vh, 140px)));
    width: clamp(120px, 12vw, 160px);
    height: clamp(100px, 11vw, 135px);
  }

  .home-page__3d-button:hover {
    transform: translate(calc(50% + clamp(90px, 9vw, 180px)), calc(-50% + clamp(70px, 9vh, 140px))) scale(1.15);
  }

  .home-page__3d-button:active {
    transform: translate(calc(50% + clamp(90px, 9vw, 180px)), calc(-50% + clamp(70px, 9vh, 140px))) scale(1.05);
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

  .home-page__3d-button {
    transform: translate(calc(50% + clamp(60px, 7vw, 120px)), calc(-50% + clamp(50px, 7vh, 100px)));
    width: clamp(110px, 11vw, 160px);
    height: clamp(95px, 10vw, 135px);
  }

  .home-page__3d-button:hover {
    transform: translate(calc(50% + clamp(60px, 7vw, 120px)), calc(-50% + clamp(50px, 7vh, 100px))) scale(1.15);
  }

  .home-page__3d-button:active {
    transform: translate(calc(50% + clamp(60px, 7vw, 120px)), calc(-50% + clamp(50px, 7vh, 100px))) scale(1.05);
  }

  .home-page__background-image {
    max-width: min(85vw, 900px);
    max-height: min(90vh, 700px);
  }
}

@media (max-width: 640px) {
  .home-page__3d-button {
    transform: translate(calc(50% + clamp(40px, 5vw, 80px)), calc(-50% + clamp(30px, 4vh, 70px)));
    width: clamp(90px, 9vw, 130px);
    height: clamp(75px, 8vw, 110px);
  }

  .home-page__3d-button:hover {
    transform: translate(calc(50% + clamp(40px, 5vw, 80px)), calc(-50% + clamp(30px, 4vh, 70px))) scale(1.15);
  }

  .home-page__3d-button:active {
    transform: translate(calc(50% + clamp(40px, 5vw, 80px)), calc(-50% + clamp(30px, 4vh, 70px))) scale(1.05);
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
    max-width: min(90vw, 800px);
    max-height: min(95vh, 600px);
  }

  .home-page__3d-button {
    transform: translate(calc(50% + clamp(30px, 4vw, 60px)), calc(-50% + clamp(20px, 3vh, 50px)));
    width: clamp(70px, 7vw, 100px);
    height: clamp(60px, 6vw, 85px);
  }

  .home-page__3d-button:hover {
    transform: translate(calc(50% + clamp(30px, 4vw, 60px)), calc(-50% + clamp(20px, 3vh, 50px))) scale(1.15);
  }

  .home-page__3d-button:active {
    transform: translate(calc(50% + clamp(30px, 4vw, 60px)), calc(-50% + clamp(20px, 3vh, 50px))) scale(1.05);
  }


  .home-page__video-button-image {
    max-width: clamp(150px, 30vw, 300px);
    max-height: clamp(30px, 4vh, 60px);
  }
}
</style>
