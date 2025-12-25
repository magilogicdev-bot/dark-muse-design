<template>
  <div class="bg-primary text-white">
    <EcocityHeroSection 
      title="ЭКОГОРОД"
      subtitle="ЖИЛОЙ КОМПЛЕКС"
      description="Жилой квартал Экогород — это целый мир, где природа и современная архитектура живут в гармонии. Шестнадцать домов, утопающих в зелени соснового бора, создают атмосферу уюта, спокойствия и комфорта."
      bg-image="/images/ecocity/hero.webp"
      :chips="[
        { label: 'СДАН', type: 'status' },
        { label: 'РАЙОН', type: 'label' },
        { label: 'ЗАВОЛЖСКИЙ', type: 'value' }
      ]"
      @open3d="handleOpen3D"
    />
    <EcocityAboutSection 
      title="О ПРОЕКТЕ"
      text1="Жилой комплекс «Экогород» создан в гармонии и уважении к природе и здоровью человека. Проектом предусмотрено размещение шести 8-9 этажных жилых домов, два из которых дополнены общественной функцией. На первых этажах предполагается размещение магазинов и прочих мест досугового назначения, что позволяет жителям находиться в максимальном комфорте и удобстве."
      text2="Основной идеей организации территории комплекса является формирование двух закрытых дворовых пространств, объединенных пешеходной зоной и многофункциональной спортивной площадкой. Дворы без машин - это современная тенденция организации жилой застройки для обеспечения безопасности и комфортного проживания."
      :images="{
        main: '/images/ecocity/about_1_main.webp',
        courtyard: '/images/ecocity/about_2_top_left.webp',
        playground: '/images/ecocity/about_3_top_right.webp',
        facade: '/images/ecocity/about_4_bot_left.webp',
        gallery: '/images/ecocity/about_5_bot_right.webp'
      }"
    />
    <EcocityFeaturesSection 
      title="ОСОБЕННОСТИ ПРОЕКТА"
      description="В ландшафтном дизайне применены бионические формы. Мягкие, пластичные элементы успокаивают и создают ощущение слияния с природой. Комплекс разработан с учетом глубокого внимания к деталям и безопасности людей."
      :features="[
        { title: 'детские и спортивные площадки', image: '/images/ecocity/features_playgrounds.webp' },
        { title: 'свежий воздух и природа', image: '/images/ecocity/features_nature.webp' },
        { title: 'двор без машин', image: '/images/ecocity/features_courtyard.webp' },
        { title: 'безопасность', image: '/images/ecocity/features_safety.webp' }
      ]"
    />
    <EcocityGeneralPlanSection 
      description="Выбрав дом, перемещайтесь по подъездам, узнавайте больше информации о понравившейся вам квартире в ЖК Экогород."
      :images="{ generalPlan: '/images/ecocity/general_plan.webp' }"
    />
    <EcocityMediaSection 
      description="Будьте в курсе самых значимых событий: новые реализованные проекты, тенденции в архитектуре и строительных технологиях, изменения в законодательстве и события из жизни нашей компании."
      :news-items="[
        { title: 'ОБЪЕКТ ЗАВЕРШЕН', description: 'Самые внимательные уже заметили: вокруг ЖК «Экогород» не осталось и намёка на строительный забор...', date: '03.12.2025', image: '/images/ecocity/news_1.webp' },
        { title: 'СТРОИТЕЛЬСТВО ЖК «ЭКОГОРОД»', description: 'А вот и общий вид на строительную площадку ЖК «Экогород» — дом заметно подрос, и вся картина строительства как на ладони...', date: '03.12.2025', image: '/images/ecocity/news_2.webp' },
        { title: 'НОВОСТИ СО СТРОЙКИ «ЭКОГОРОД»', description: 'Дом уверенно набирает высоту и меняется буквально на глазах. С высоты будущих этажей уже...', date: '03.12.2025', image: '/images/ecocity/news_3.webp' }
      ]"
    />
  </div>
</template>

<script setup>
const handleOpen3D = () => {
  window.open('/3d-map', '_blank')
}

usePageMeta({
  title: 'ЭКОГОРОД - Pobedonoscev Group',
  description: 'Жилой комплекс ЭКОГОРОД в гармонии с природой. Завершенный объект.'
})
</script>
