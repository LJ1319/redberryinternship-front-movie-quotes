import axios from '@/plugins/axios'

export const getGenres = async () => {
  return await axios.get('/api/genres')
}
