import { useState } from '#app'
import { watch, computed } from 'vue'

export const useFavorites = () => {
    // Состояние избранного (массив ID)
    const favoriteIds = useState<number[]>('favorite-ids', () => [])

    // Инициализация из localStorage на клиенте
    const initFavorites = () => {
        if (process.client) {
            const stored = localStorage.getItem('favorites')
            if (stored) {
                try {
                    favoriteIds.value = JSON.parse(stored)
                } catch (e) {
                    console.error('Failed to parse favorites from localStorage', e)
                }
            }
        }
    }

    // Сохранение в localStorage при изменении на клиенте
    if (process.client) {
        watch(favoriteIds, (newVal) => {
            localStorage.setItem('favorites', JSON.stringify(newVal))
        }, { deep: true })
    }

    const toggleFavorite = (id: number) => {
        const index = favoriteIds.value.indexOf(id)
        if (index === -1) {
            favoriteIds.value.push(id)
        } else {
            favoriteIds.value.splice(index, 1)
        }
    }

    const isFavorite = (id: number) => {
        return favoriteIds.value.includes(id)
    }

    const favoritesCount = computed(() => favoriteIds.value.length)

    return {
        favoriteIds,
        toggleFavorite,
        isFavorite,
        favoritesCount,
        initFavorites
    }
}
