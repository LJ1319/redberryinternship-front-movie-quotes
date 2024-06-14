import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, MovieList } from '@/types'
import { getMovie, getMovies } from '@/services/api/movies'

export const useMovieStore = defineStore('movie', () => {
  const movieList = ref<MovieList[]>([])
  const movie = ref<Movie | null>(null)

  const loadMovies = async () => {
    try {
      const { data } = await getMovies()
      movieList.value = data.data
    } catch (error: any) {
      console.error(error)
    }
  }

  const loadMovie = async (id: string) => {
    try {
      const { data } = await getMovie(id)
      movie.value = data
    } catch (error: any) {
      console.error(error)
    }
  }

  const reset = () => {
    movie.value = null
    movieList.value = []
  }

  return { movieList, movie, loadMovies, loadMovie, reset }
})
