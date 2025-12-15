<template>
  <img
    :src="src"
    :alt="alt"
    :class="class"
    :style="style"
    :loading="loading"
    :width="width"
    :height="height"
    v-bind="$attrs"
  />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  style: {
    type: String,
    default: ''
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
</script>

