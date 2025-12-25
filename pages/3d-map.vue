<template>
  <Model3DViewer
    :is-open="true"
    model-path="/models/Plan_1.gltf"
    @close="handleClose"
  />
</template>

<script setup>
usePageMeta({
  title: '3D Генплан - Pobedonoscev Group',
  description: 'Интерактивная 3D модель жилого комплекса'
})

const handleClose = () => {
  // При закрытии возвращаемся на предыдущую страницу или на главную
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}
</script>

