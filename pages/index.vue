<template>
  <div class="bg-primary text-white">
    <EcocityHeroSection @open3d="is3DOpen = true" />
    <EcocityFiltersSection />
    <EcocityAboutSection />
    <EcocityFeaturesSection />
    <EcocityGeneralPlanSection />
    <EcocityWhiteBoxSection />
    <EcocityCTASection />
    <EcocityExcursionsSection />
    <EcocityConstructionProgressSection />
    <EcocityDocumentsSection />
    <EcocityMediaSection />
    
    <!-- 3D Modal if needed -->
    <Model3DViewer
      v-if="is3DOpen"
      :is-open="is3DOpen"
      model-path="/models/4.gltf"
      @close="is3DOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const is3DOpen = ref(false)

usePageMeta({
  title: 'Pobedonoscev Group - Строим будущее',
  description: 'Современные жилые комплексы от Pobedonoscev Group. Экологичность, комфорт и инновации в каждом проекте.'
})
</script>
