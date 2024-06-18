<script setup lang="ts">
import type { Quote } from '@/types'

import MovieQuote from '@/components/single-movie/MovieQuote.vue'

defineProps<{
  quotes?: Array<Quote>
}>()
</script>

<template>
  <ul class="grid grid-cols-1 gap-6 lg:w-3/5">
    <li
      v-for="quote in quotes"
      :key="quote.id"
      class="relative flex h-max flex-col gap-4 bg-mirage-dark px-9 py-5 lg:rounded-clg lg:py-8"
    >
      <movie-quote :quote="quote" />
    </li>
  </ul>
</template>
