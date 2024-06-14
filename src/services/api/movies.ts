import axios from '@/plugins/axios'
import type { MovieFormRequest, UpdateMovieValues } from '@/types'

export const getMovies = async () => {
  return await axios.get('/api/movies')
}

export const getMovie = async (id: string | number) => {
  return await axios.get(`/api/movies/${id}`)
}

export const addMovie = async (data: MovieFormRequest) => {
  return await axios.post(`/api/movies`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateMovie = async (id: string, data: UpdateMovieValues) => {
  return await axios.post(`/api/movies/${id}`, data, {
    params: {
      _method: 'PATCH'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteMovie = async (id: string) => {
  return await axios.post(`/api/movies/${id}`, null, {
    params: {
      _method: 'DELETE'
    }
  })
}
