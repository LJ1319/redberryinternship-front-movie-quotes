import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Genre } from '@/types'
import { getGenres } from '@/services/api/genres'

export const useGenreStore = defineStore('genre', () => {
  const genreList = ref<Genre[]>([])

  const loadGenres = async () => {
    try {
      const { data } = await getGenres()
      genreList.value = data
    } catch (error: any) {
      console.error(error)
    }
  }

  return { genreList, loadGenres }
})
