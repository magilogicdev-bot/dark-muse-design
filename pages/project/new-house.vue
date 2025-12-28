<template>
  <div class="bg-[#1A1A1A] text-white">
    <EcocityHeroSection 
      title="НОВЫЙ ДОМ"
      subtitle="ЖИЛОЙ КОМПЛЕКС"
      description="Пространство, где каждая деталь создана для вашего комфорта. Среди сосен, в экологически чистом районе, начинается жизнь, о которой вы мечтали."
      bg-image="/images/newhouse/hero.webp"
      :chips="[
        { label: 'СТАТУС', value: 'СДАН' },
        { label: 'РАЙОН', value: 'ЗАВОЛЖСКИЙ' }
      ]"
      @open3d="handleOpen3D"
    />
    <EcocityAboutSection 
      title="О ПРОЕКТЕ"
      text1="Жилой комплекс «Новый Дом» создан в гармонии и уважении к природе и здоровью человека. Проектом предусмотрено размещение шести 8-9 этажных жилых домов, два из которых дополнены общественной функцией. На первых этажах предполагается размещение магазинов и прочих мест досугового назначения, что позволяет жителям находиться в максимальном комфорте и удобстве."
      text2="Основной идеей организации территории комплекса является формирование двух закрытых дворовых пространств, объединенных пешеходной зоной и многофункциональной спортивной площадкой. Дворы без машин - это современная тенденция организации жилой застройки для обеспечения безопасности и комфортного проживания."
      :images="{
        main: '/images/newhouse/about_1_main.webp',
        courtyard: '/images/newhouse/about_2_top_left.webp',
        playground: '/images/newhouse/about_3_top_right.webp',
        facade: '/images/newhouse/about_5_bot_right.webp',
        gallery: '/images/newhouse/about_4_bot_left.webp'
      }"
    />
    <EcocityFeaturesSection 
      title="ОСОБЕННОСТИ ПРОЕКТА"
      description="В ландшафтном дизайне применены бионические формы. Мягкие, пластичные элементы успокаивают и создают ощущение слияния с природой. Комплекс разработан с учетом глубокого внимания к деталям и безопасности людей."
      :features="[
        { title: 'детские и спортивные площадки', image: '/images/newhouse/features_playgrounds.webp' },
        { title: 'свежий воздух и природа', image: '/images/newhouse/features_nature.webp' },
        { title: 'двор без машин', image: '/images/newhouse/features_courtyard.webp' },
        { title: 'безопасность', image: '/images/newhouse/features_safety.webp' }
      ]"
    />
    <EcocityGeneralPlanSection 
      description="Выбрав дом, перемещайтесь по подъездам, узнавайте больше информации о понравившейся вам квартире в ЖК Новый Дом."
      :images="{ generalPlan: '/images/general_plan_new.png' }"
    />
    <EcocityMediaSection 
      description="Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях, изменения в законодательстве и события из жизни нашей компании."
      :news-items="[
        { title: 'ОБЪЕКТ ЗАВЕРШЕН', description: 'Самые внимательные уже заметили: вокруг ЖК «Новый Дом» не осталось и намёка на строительный забор...', date: '03.12.2025', image: '/images/newhouse/news_1.webp' },
        { title: 'СТРОИТЕЛЬСТВО ЖК «НОВЫЙ ДОМ»', description: 'А вот и общий вид на строительную площадку ЖК «Новый Дом» — дом заметно подрос, и вся картина строительства как на ладони...', date: '03.12.2025', image: '/images/newhouse/news_2.webp' },
        { title: 'НОВОСТИ СО СТРОЙКИ «НОВЫЙ ДОМ»', description: 'Дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...', date: '03.12.2025', image: '/images/newhouse/news_3.webp' }
      ]"
    />
  </div>
</template>

<script setup>
const handleOpen3D = () => {
  window.open('/3d-map', '_blank')
}

usePageMeta({
  title: 'НОВЫЙ ДОМ - Pobedonoscev Group',
  description: 'Жилой комплекс НОВЫЙ ДОМ в гармонии с природой. Завершенный объект.'
})
</script>
