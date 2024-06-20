import axios from '@/plugins/axios'
import type { QuoteFormRequest, QuoteSearchFormRequest } from '@/types'

export const getQuotes = async () => {
  return await axios.get('/api/quotes')
}

export const getQuote = async (id: string | number) => {
  return await axios.get(`/api/quotes/${id}`)
}

export const addQuote = async (data: QuoteFormRequest) => {
  return await axios.post('/api/quotes', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateQuote = async (id: string | number, data: QuoteFormRequest) => {
  return await axios.post(`/api/quotes/${id}`, data, {
    params: {
      _method: 'PATCH'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteQuote = async (id: string | number) => {
  return await axios.post(`/api/quotes/${id}`, null, {
    params: {
      _method: 'DELETE'
    }
  })
}

export const searchQuote = async (query: QuoteSearchFormRequest) => {
  return await axios.get('/api/quotes', {
    params: {
      filter: query
    }
  })
}
