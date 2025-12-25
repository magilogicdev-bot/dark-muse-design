<template>
  <article class="group cursor-pointer flex flex-col hover:scale-[1.02] transition-transform duration-300">
    <!-- Image Container with Overlays -->
    <div class="relative aspect-[4/3] w-full overflow-hidden mb-3 md:mb-4 bg-black">
      <NuxtImg
        :src="news.image"
        :alt="news.title"
        class="w-full h-full object-cover scale-[1.03]"
        loading="lazy"
        format="webp"
      />
      
      <!-- Date Overlay (Top Left) -->
      <div class="absolute top-3 md:top-4 left-3 md:left-4">
        <span class="text-white text-xs md:text-sm font-medium">
          {{ news.date }}
        </span>
      </div>

      <!-- VK Icon Overlay (Top Right) -->
      <a
        :href="config.contacts.social.vk"
        class="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition hover:scale-110 relative z-10"
        aria-label="Поделиться в VK"
        target="_blank"
        rel="noopener noreferrer"
        @click.stop
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
    </div>

    <!-- Caption/Description -->
    <p class="text-white text-sm md:text-base lg:text-lg leading-relaxed mt-2 md:mt-3">
      {{ news.title }}
    </p>
  </article>
</template>

<script setup>
import { siteConfig } from '~/config/contacts'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const config = siteConfig
</script>
