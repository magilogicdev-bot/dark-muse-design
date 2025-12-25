<template>
  <div class="bg-primary text-white">
    <EcocityHeroSection @open3d="handleOpen3D" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const handleOpen3D = () => {
  window.open('/3d-map', '_blank')
}

usePageMeta({
  title: 'ЭКОГОРОД 3 - Pobedonoscev Group',
  description: 'Современный жилой комплекс ЭКОГОРОД 3 от Pobedonoscev Group. Экологичность, комфорт и инновации в каждом проекте.'
})
</script>



