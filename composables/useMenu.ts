import { ref } from 'vue'

export const useMenu = () => {
  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    if (isMenuOpen.value) {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }

  const closeMenu = () => {
    isMenuOpen.value = false
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  }
}

