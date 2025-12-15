<template>
  <section class="bg-[#2a2c38] py-4 md:py-6">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-lg">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <a
            :href="crumb.url"
            :class="[
              'transition-colors',
              index === breadcrumbs.length - 1
                ? 'text-white font-semibold'
                : 'text-gray-400 hover:text-[#F2994A]'
            ]"
          >
            {{ crumb.label }}
          </a>
          <span v-if="index < breadcrumbs.length - 1" class="text-gray-400 mx-2">/</span>
        </template>
      </nav>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [
      { label: 'Главная', url: '/' },
      { label: 'Проекты', url: '/projects' },
      { label: 'Текущая страница', url: '#' }
    ]
  }
})
</script>
