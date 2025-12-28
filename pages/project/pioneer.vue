<template>
  <div class="bg-[#1A1A1A] text-white">
    <EcocityHeroSection 
      title="ПИОНЕРСКИЙ"
      subtitle="ЖИЛОЙ КОМПЛЕКС"
      description="Пространство, где каждая деталь создана для вашего комфорта. Среди сосен, в экологически чистом районе, начинается жизнь, о которой вы мечтали."
      bg-image="/images/pioneer/hero.webp"
      :chips="[
        { label: 'СТАТУС', value: 'СДАН' },
        { label: 'РАЙОН', value: 'ЗАВОЛЖСКИЙ' }
      ]"
      @open3d="handleOpen3D"
    />
    <EcocityAboutSection 
      title="О ПРОЕКТЕ"
      text1="Жилой комплекс «Пионерский» создан в гармонии и уважении к природе и здоровью человека. Проектом предусмотрено размещение шести 8-9 этажных жилых домов, два из которых дополнены общественной функцией. На первых этажах предполагается размещение магазинов и прочих мест досугового назначения, что позволяет жителям находиться в максимальном комфорте и удобстве."
      text2="Основной идеей организации территории комплекса является формирование двух закрытых дворовых пространств, объединенных пешеходной зоной и многофункциональной спортивной площадкой. Дворы без машин - это современная тенденция организации жилой застройки для обеспечения безопасности и комфортного проживания."
      :images="{
        main: '/images/pioneer/about_1_main.webp',
        courtyard: '/images/pioneer/about_2_top_left.webp',
        playground: '/images/pioneer/about_3_top_right.webp',
        facade: '/images/pioneer/about_5_bot_right.webp',
        gallery: '/images/pioneer/about_4_bot_left.webp'
      }"
    />
    <EcocityFeaturesSection 
      title="ОСОБЕННОСТИ ПРОЕКТА"
      description="В ландшафтном дизайне применены бионические формы. Мягкие, пластичные элементы успокаивают и создают ощущение слияния с природой. Комплекс разработан с учетом глубокого внимания к деталям и безопасности людей."
      :features="[
        { title: 'детские и спортивные площадки', image: '/images/pioneer/features_playgrounds.webp' },
        { title: 'свежий воздух и природа', image: '/images/pioneer/features_nature.webp' },
        { title: 'двор без машин', image: '/images/pioneer/features_courtyard.webp' },
        { title: 'дизайнерские входные группы', image: '/images/pioneer/features_entrance.webp' }
      ]"
    />
    <EcocityMediaSection 
      description="Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях, изменения в законодательстве и события из жизни нашей компании."
      :news-items="[
        { title: 'ОБЪЕКТ ЗАВЕРШЕН', description: 'Самые внимательные уже заметили: вокруг ЖК «Пионерский» не осталось и намёка на строительный забор...', date: '03.12.2025', image: '/images/pioneer/about_1_main.webp' },
        { title: 'СТРОИТЕЛЬСТВО ЖК «ПИОНЕРСКИЙ»', description: 'А вот и общий вид на строительную площадку ЖК «Пионерский» — дом заметно подрос, и вся картина строительства как на ладони...', date: '03.12.2025', image: '/images/pioneer/about_2_top_left.webp' },
        { title: 'НОВОСТИ СО СТРОЙКИ «ПИОНЕРСКИЙ»', description: 'Дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...', date: '03.12.2025', image: '/images/pioneer/about_3_top_right.webp' }
      ]"
    />
  </div>
</template>

<script setup>
const handleOpen3D = () => {
  window.open('/3d-map', '_blank')
}

usePageMeta({
  title: 'ПИОНЕРСКИЙ - Pobedonoscev Group',
  description: 'Жилой комплекс ПИОНЕРСКИЙ в гармонии с природой. Завершенный объект.'
})
</script>
