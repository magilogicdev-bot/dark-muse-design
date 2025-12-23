import { ref } from 'vue'

// Global state for menu
const isMenuOpen = ref(false)

export function useMenu() {
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const openMenu = () => {
        isMenuOpen.value = true
    }

    const closeMenu = () => {
        isMenuOpen.value = false
    }

    return {
        isMenuOpen,
        toggleMenu,
        openMenu,
        closeMenu
    }
}
