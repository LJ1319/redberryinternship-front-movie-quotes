import axios from '@/plugins/axios'

export const likeQuote = async (id: number | string) => {
  return await axios.post(`/api/quotes/${id}/likes`, {})
}

export const unlikeQuote = async (id: number | string) => {
  return await axios.post(`/api/quotes/${id}/likes`, null, {
    params: {
      _method: 'DELETE'
    }
  })
}
