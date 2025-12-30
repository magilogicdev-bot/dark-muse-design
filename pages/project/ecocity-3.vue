<template>
  <div class="bg-[#1A1A1A] text-white">
    <EcocityHeroSection 
      title="ЭКОГОРОД 3"
      subtitle="ЖИЛОЙ КОМПЛЕКС"
      description="Пространство, где каждая деталь создана для вашего комфорта. Среди сосен, в экологически чистом районе, начинается жизнь, о которой вы мечтали."
      bg-image="/images/ecocity3/hero.webp"
      :chips="[
        { label: 'В ПРОДАЖЕ', value: '192 КВАРТИРЫ', class: 'hero-chip--green' },
        { label: 'РАЙОН', value: 'ЗАВОЛЖСКИЙ' },
        { label: 'СТАТУС', value: 'СТРОИТСЯ' },
        { label: 'СРОК СДАЧИ', value: '4 КВАРТАЛ 2025' }
      ]"
      @open3d="handleOpen3D" 
    />
    <EcocityFiltersSection />
    <EcocityAboutSection 
      title="О ПРОЕКТЕ"
      text1="Жилой комплекс «Экогород 3» создан в гармонии и уважении к природе и здоровью человека. Проектом предусмотрено размещение шести 8-9 этажных жилых домов, два из которых дополнены общественной функцией. На первых этажах предполагается размещение магазинов и прочих мест досугового назначения, что позволяет жителям находиться в максимальном комфорте и удобстве."
      text2="Основной идеей организации территории комплекса является формирование двух закрытых дворовых пространств, объединенных пешеходной зоной и многофункциональной спортивной площадкой. Дворы без машин - это современная тенденция организации жилой застройки для обеспечения безопасности и комфортного проживания."
      :images="{
        main: '/images/current-projects-main.webp',
        courtyard: '/images/ecocity3/about_1.webp',
        playground: '/images/ecocity3/about_2.webp',
        facade: '/images/ecocity3/about_3.webp',
        gallery: '/images/ecocity3/about_main.webp'
      }"
    />
    <EcocityFeaturesSection 
      :features="[
        { title: 'детские и спортивные площадки', image: '/images/ecocity3/features/feature_playground.webp' },
        { title: 'свежий воздух и природа', image: '/images/ecocity3/features/feature_nature.webp' },
        { title: 'двор без машин', image: '/images/ecocity3/features/feature_no_cars.webp' },
        { title: 'безопасность', image: '/images/ecocity3/features/feature_safety.webp' }
      ]"
    />
    <EcocityGeneralPlanSection show-houses />
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



