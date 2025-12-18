<template>
  <section class="bg-[#1a1d28] py-16 md:py-20 lg:py-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight mb-12 md:mb-16 lg:mb-20 text-center">
        ВИДЕО О НАС
      </h2>
      
      <div class="relative aspect-video rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden bg-black/50">
        <img
          :src="videoThumbnail"
          alt="Видео"
          class="w-full h-full object-cover"
        />
        <button
          @click="playVideo"
          class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <div class="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <svg class="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  videoThumbnail: {
    type: String,
    default: '/images/video-thumbnail.webp'
  },
  videoUrl: {
    type: String,
    default: ''
  }
})

const playVideo = () => {
  // Handle video play
  console.log('Play video:', props.videoUrl)
}
</script>
