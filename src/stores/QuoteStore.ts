import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Quote } from '@/types'
import { getQuote, getQuotes } from '@/services/api/quotes'

export const useQuoteStore = defineStore('quote', () => {
  const quoteList = ref<Array<Quote>>()
  const quote = ref<Quote | null>(null)

  const loadQuotes = async () => {
    try {
      const { data } = await getQuotes()
      quoteList.value = data.data
    } catch (error: any) {
      console.error(error)
    }
  }

  const loadQuote = async (id: string | number) => {
    try {
      const { data } = await getQuote(id)
      quote.value = data
    } catch (error: any) {
      console.error(error)
    }
  }

  const reset = () => {
    quote.value = null
  }

  return { quoteList, quote, loadQuotes, loadQuote, reset }
})
