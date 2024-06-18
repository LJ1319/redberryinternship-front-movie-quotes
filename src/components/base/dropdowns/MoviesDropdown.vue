<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@/composables/onClickOutside'
import type { MovieList } from '@/types'

defineProps<{
  movies: Array<MovieList>
}>()

const emit = defineEmits<{
  close: []
  choose: [movie: MovieList]
}>()

const dropdown = ref<HTMLElement | null>(null)
onClickOutside(dropdown.value, () => emit('close'))
</script>

<template>
  <ul
    v-if="movies.length"
    ref="dropdown"
    class="absolute left-0 top-20 z-50 w-full rounded bg-black ring-1 ring-gray-500"
  >
    <li
      v-for="movie in movies"
      :key="movie.id"
      v-on:click="emit('choose', movie)"
      class="flex cursor-pointer items-center gap-4 border-b border-gray-500 p-4 text-white last-of-type:border-0"
    >
      <img :src="movie.image" alt="Movie Image" class="h-10 w-10 rounded-full" />
      {{ movie.title }} ({{ movie.year }})
    </li>
  </ul>

  <p
    v-else
    v-on:click.stop
    class="absolute left-0 top-24 z-50 w-full rounded border border-gray-500 bg-black p-4 text-white"
  >
    {{ $t('no-movies') }}
  </p>
</template>
