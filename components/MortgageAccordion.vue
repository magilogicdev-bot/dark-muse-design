<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <button
      @click="handleToggle"
      class="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
    >
      <span class="text-lg md:text-xl lg:text-2xl font-medium text-[#1A1A1A] uppercase">
        {{ title }}
      </span>
      <div class="flex-shrink-0 w-12 h-12 md:w-15 md:h-15 rounded-full bg-[#1A1A1A] flex items-center justify-center">
        <svg
          :class="['w-6 h-6 transition-transform duration-200 text-white', localIsOpen && 'rotate-180']"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="localIsOpen" class="px-6 pb-4 md:px-8 md:pb-5">
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

const emit = defineEmits(['toggle'])

const localIsOpen = ref(props.isOpen)

watch(() => props.isOpen, (newVal) => {
  localIsOpen.value = newVal
})

const handleToggle = () => {
  localIsOpen.value = !localIsOpen.value
  emit('toggle')
}
</script>
