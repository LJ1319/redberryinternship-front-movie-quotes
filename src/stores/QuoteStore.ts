import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Quote } from '@/types'
import { getQuote, getQuotes } from '@/services/api/quotes'

export const useQuoteStore = defineStore('quote', () => {
  const quoteList = ref<Array<Quote>>([])
  const quote = ref<Quote | null>(null)

  const loading = ref(false)
  const canLoadMore = ref(true)
  const page = ref(0)

  const loadQuotes = async () => {
    if (!loading.value && canLoadMore.value) {
      loading.value = true
      page.value++

      try {
        const { data } = await getQuotes(page.value)
        quoteList.value = [...quoteList.value, ...data.data]

        canLoadMore.value = data.links.next !== null
        loading.value = false
      } catch (error: any) {
        console.error(error)
      }
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

  const setFiltered = (filtered: Array<Quote>) => {
    quoteList.value = filtered
  }

  return { quoteList, quote, loadQuotes, loadQuote, reset, setFiltered }
})
