import { ref } from 'vue'

const favorites = ref([])

export function useFavoritesStore() {
  const toggle = (id) => {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(id)
    }
  }

  const isFavorite = (id) => {
    return favorites.value.includes(id)
  }

  const clear = () => {
    favorites.value = []
  }

  return {
    favorites,
    toggle,
    isFavorite,
    clear
  }
}