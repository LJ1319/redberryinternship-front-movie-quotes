import axios from '@/plugins/axios'
import type { AddMovieValues, UpdateMovieValues } from '@/types'

export const getGenres = async () => {
  return await axios.get('/api/genres')
}

export const addMovie = async (data: AddMovieValues) => {
  return await axios.post(`/api/movies`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateMovie = async (id: number | undefined, data: UpdateMovieValues) => {
  return await axios.post(`/api/movies/${id}`, data, {
    params: {
      _method: 'PATCH'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
