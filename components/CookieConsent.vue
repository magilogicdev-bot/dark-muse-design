<template>
  <Transition name="cookie-fade">
    <div v-if="!isAccepted" class="cookie-consent">
      <div class="cookie-consent__content">
        <div class="cookie-consent__header">
          <p class="cookie-consent__label">МЫ ИСПОЛЬЗУЕМ</p>
          <h2 class="cookie-consent__title">COOKIES</h2>
        </div>
        
        <div class="cookie-consent__footer">
          <p class="cookie-consent__description">
            они помогают показывать лучшие предложения для вас
          </p>
          <button @click="acceptCookies" class="cookie-consent__button">
            Принять
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isAccepted = ref(false)

const acceptCookies = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cookieConsent', 'accepted')
    isAccepted.value = true
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const consent = localStorage.getItem('cookieConsent')
    if (consent === 'accepted') {
      isAccepted.value = true
    }
  }
})
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  top: clamp(40px, 2vw, 24px);
  right: clamp(40px, 2vw, 24px);
  z-index: 1000;
  max-width: clamp(280px, 30vw, 400px);
  background: #ffffff;
  border-radius: clamp(12px, 1.5vw, 20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: clamp(16px, 2vw, 24px);
}

.cookie-consent__content {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vw, 20px);
}

.cookie-consent__header {
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.5vw, 8px);
}

.cookie-consent__label {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(8px, 0.8vw, 12px);
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #000000;
  text-transform: uppercase;
  margin: 0;
}

.cookie-consent__title {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(70px, 4vw, 56px);
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #000000;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
}

.cookie-consent__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(12px, 1.5vw, 20px);
}

.cookie-consent__description {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(10px, 1vw, 14px);
  font-weight: 400;
  color: #000000;
  margin: 0;
  flex: 1;
  line-height: 1.4;
}

.cookie-consent__button {
  font-family: 'Mazzard', 'Inter', sans-serif;
  font-size: clamp(12px, 1.2vw, 16px);
  font-weight: 400;
  font-style: italic;
  color: #000000;
  background: #e5e5e5;
  border: none;
  border-radius: clamp(8px, 1vw, 12px);
  padding: clamp(8px, 1vw, 12px) clamp(16px, 2vw, 24px);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.cookie-consent__button:hover {
  background: #d5d5d5;
  transform: translateY(-1px);
}

.cookie-consent__button:active {
  transform: translateY(0);
  background: #cccccc;
}

/* Transition animations */
.cookie-fade-enter-active {
  animation: cookieSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.cookie-fade-leave-active {
  animation: cookieSlideOut 0.3s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}

@keyframes cookieSlideIn {
  0% {
    opacity: 0;
    transform: translateX(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes cookieSlideOut {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(20px) scale(0.95);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cookie-consent {
    top: clamp(12px, 2vh, 20px);
    right: clamp(12px, 2vw, 20px);
    left: clamp(12px, 2vw, 20px);
    max-width: 100%;
  }

  .cookie-consent__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .cookie-consent__button {
    width: 100%;
    text-align: center;
  }
}
</style>

