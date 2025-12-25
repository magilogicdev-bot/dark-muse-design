<template>
  <section class="py-8 md:py-12 lg:py-16 xl:py-20 bg-primary text-white">
    <div class="container mx-auto max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Section Header Row - 2 columns on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 mb-6 md:mb-8 lg:mb-10">
        <!-- Left: Section title -->
        <div>
          <p class="text-white/60 uppercase text-xs md:text-sm tracking-[-0.02em] mb-1 md:mb-2">НАШИ ПРОЕКТЫ</p>
          <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase leading-tight">ЗАВЕРШЕННЫЕ<br>ПРОЕКТЫ</h2>
        </div>
        
        <!-- Right: Description -->
        <div class="lg:pt-6 xl:pt-10">
          <p class="text-[11px] md:text-[12px] lg:text-[14px] xl:text-[18px] text-white leading-relaxed tracking-[0.08em]">
            Село Любилки украшает величественный белокаменный храм, словно жемчужина, посвященный Пресвятой Богородице и святому Феодосию Тотемскому. Его золотой купол, устремленный в небо, является настоящим украшением, подчеркивая и сохраняя неповторимую историческую целостность этого живописного места.
          </p>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="space-y-3 lg:space-y-4 xl:space-y-5">
        <!-- Main Large Image -->
        <article 
          @click="navigateTo('/project/ecocity-2')"
          class="relative overflow-hidden rounded-[12px] lg:rounded-[18px] xl:rounded-[22px] shadow-lg bg-black group cursor-pointer"
        >
          <div class="aspect-[16/9] lg:aspect-[2.2/1] xl:aspect-[2.5/1]">
            <NuxtImg 
              src="/images/completed-projects-main.webp" 
              alt="ЖК Экогород 2" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
              format="webp"
            />
          </div>
          <!-- Dark overlay on hover -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Text Content -->
          <div class="absolute bottom-6 md:bottom-8 lg:bottom-10 left-0 w-full text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p class="text-[10px] md:text-[12px] lg:text-[14px] uppercase tracking-[0.05em] text-white/80 mb-1 md:mb-2">жилой комплекс</p>
            <h3 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium uppercase text-white">Экогород 2</h3>
          </div>
        </article>

        <!-- 2x2 Grid of smaller images -->
        <div class="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-5">
          <article 
            v-for="(item, idx) in galleryItems" 
            :key="idx"
            @click="navigateTo(item.link)"
            class="relative overflow-hidden rounded-[12px] lg:rounded-[18px] xl:rounded-[22px] shadow-lg bg-black group cursor-pointer"
          >
            <div class="aspect-[16/10] lg:aspect-[16/9]">
              <NuxtImg 
                :src="item.image" 
                :alt="item.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="lazy"
                format="webp"
              />
            </div>
            <!-- Dark overlay on hover -->
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Text Content -->
            <div class="absolute bottom-4 md:bottom-6 lg:bottom-8 left-0 w-full text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p class="text-[8px] md:text-[10px] lg:text-[12px] uppercase tracking-[0.05em] text-white/80 mb-1">жилой комплекс</p>
              <h3 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium uppercase text-white">
                {{ item.title }}
              </h3>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const galleryItems = [
  { title: 'новый дом', image: '/images/completed-projects-1.webp', link: '/project/new-house' },
  { title: 'экогород', image: '/images/completed-projects-2.webp', link: '/project/ecocity' },
  { title: 'пионерский', image: '/images/completed-projects-3.webp', link: '/project/pioneer' },
  { title: 'в разработке', image: '/images/completed-projects-4.webp', link: '#' }
]
</script>
