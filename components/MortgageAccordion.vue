<template>
  <div class="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
    <button
      @click="toggle"
      class="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
    >
      <span class="text-lg md:text-xl lg:text-2xl font-semibold text-white uppercase">
        {{ title }}
      </span>
      <svg
        :class="['w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 text-white', isOpen && 'rotate-180']"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="px-6 pb-4 md:px-8 md:pb-5">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.isOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>
