<script setup lang="ts">
import { useQuoteStore } from '@/stores/QuoteStore'

import MovieQuote from '@/components/news-feed/MovieQuote.vue'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const quoteStore = useQuoteStore()
quoteStore.loadQuotes()

const handleScroll = () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
  if (bottomOfWindow) {
    quoteStore.loadQuotes()
  }
}
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
  <!--  <button v-on:click="() => quoteStore.loadQuotes()" class="text-white">load more</button>-->
</template>
