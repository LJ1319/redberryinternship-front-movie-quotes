<script setup lang="ts">
import { useQuoteStore } from '@/stores/QuoteStore'

import MovieQuote from '@/components/news-feed/MovieQuote.vue'

const quoteStore = useQuoteStore()
quoteStore.loadQuotes()
</script>

<template>
  <ul class="grid h-full w-full grid-cols-1 gap-8 lg:gap-12">
    <li
      v-for="quote in quoteStore.quoteList"
      :key="quote.id"
      class="flex h-full w-full flex-col gap-4 bg-black px-9 py-7 text-white lg:gap-8 lg:rounded-xl lg:bg-mirage-dark"
    >
      <movie-quote :quote="quote" />
    </li>
  </ul>
</template>
