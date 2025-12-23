<template>
  <div class="bg-primary text-white min-h-screen font-sans">
    <!-- Main Content -->
    <section class="container max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 md:py-12 lg:py-16 xl:py-20 relative">
      <!-- Main Grid: Left Text + Right News Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(280px,35%)_1fr] gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">
        <!-- Left Section: Social Icons, Title and Description -->
        <div class="flex flex-col">
          <!-- Social Media Icons -->
          <div class="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 lg:mb-12">
            <!-- VK Icon -->
            <a
              :href="config.contacts.social.vk"
              class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition hover:scale-105 relative"
              aria-label="VKontakte"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://www.figma.com/api/mcp/asset/54d0f66b-b601-41f4-aa21-e69f71bfa8c4" 
                alt="" 
                class="absolute inset-0 w-full h-full object-cover rounded-full"
              />
              <img 
                src="https://www.figma.com/api/mcp/asset/91373bff-ac3b-4736-977d-166869d00832" 
                alt="VK" 
                class="relative z-10 w-[40%] h-[40%] object-contain"
              />
            </a>
            <!-- Telegram Icon -->
            <a
              :href="config.contacts.social.telegram"
              class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition hover:scale-105 relative"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://www.figma.com/api/mcp/asset/3256f975-f004-4f9d-86a3-5eb85f9d85fb" 
                alt="" 
                class="absolute inset-0 w-full h-full object-cover rounded-full"
              />
              <img 
                src="https://www.figma.com/api/mcp/asset/3c609572-383a-4756-896c-c4a192efdaba" 
                alt="Telegram" 
                class="relative z-10 w-[40%] h-[40%] object-contain"
              />
            </a>
          </div>

          <!-- Page Title -->
          <h1 class="text-5xl font-bold uppercase mb-6 md:mb-8 lg:mb-10 text-white leading-tight">
            НОВОСТИ
          </h1>

          <!-- Description Paragraph 1 -->
          <p class="text-lg text-white leading-relaxed mb-4 md:mb-6">
            Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях, изменения в законодательстве и события из жизни нашей компании.
          </p>

          <!-- Description Paragraph 2 -->
          <p class="text-lg text-white leading-relaxed">
            Здесь мы делимся опытом, успехами и полезными знаниями.
          </p>
        </div>

        <!-- Right Section: News Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6 w-full">
          <NewsCard
            v-for="(news, index) in newsItems"
            :key="index"
            :news="news"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const config = siteConfig

// News data - will be replaced with actual images from Figma
const newsItems = ref([
  {
    id: 1,
    image: '/images/news/news-1.webp',
    date: '26.11.2025',
    title: 'Важное событие для будущих жителей!',
    description: 'Важное событие для будущих жителей!'
  },
  {
    id: 2,
    image: '/images/news/news-2.webp',
    date: '26.11.2025',
    title: 'вокруг ЖК «Экогород 2» был убран забор',
    description: 'вокруг ЖК «Экогород 2» был убран забор'
  },
  {
    id: 3,
    image: '/images/news/news-3.webp',
    date: '26.11.2025',
    title: 'ЖК «Экогород 3» – дом заметно подрос',
    description: 'ЖК «Экогород 3» – дом заметно подрос'
  },
  {
    id: 4,
    image: '/images/news/news-4.webp',
    date: '26.11.2025',
    title: 'ЖК «Экогород 3» – дом заметно подрос',
    description: 'ЖК «Экогород 3» – дом заметно подрос'
  },
  {
    id: 5,
    image: '/images/news/news-5.webp',
    date: '26.11.2025',
    title: 'Новости со стройки',
    description: 'Новости со стройки'
  },
  {
    id: 6,
    image: '/images/news/news-6.webp',
    date: '26.11.2025',
    title: 'Новости со стройки',
    description: 'Новости со стройки'
  }
])
</script>
