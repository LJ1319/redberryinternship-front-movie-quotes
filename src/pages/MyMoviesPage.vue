<script setup lang="ts">
import { ref } from 'vue'

import AddMovieForm from '@/components/my-movies/AddMovieForm.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const movieModalIsOpen = ref(false)

const openMovieModal = () => {
  movieModalIsOpen.value = true
}

const closeMovieModal = () => {
  movieModalIsOpen.value = false
}
</script>

<template>
  <div class="h-full w-full">
    <div class="mx-9 my-8 flex items-center justify-between gap-4">
      <h1 class="text-2xl font-medium capitalize text-white">{{ $t('my-movies') }}</h1>

      <button
        v-on:click.stop="openMovieModal"
        class="flex h-max min-h-10 max-w-32 items-center justify-center gap-2 rounded bg-red px-2 py-0.5 capitalize text-white lg:w-max"
      >
        <icon-plus class="shrink-0" />
        {{ $t('add-movie') }}
      </button>
    </div>

    <div
      v-if="movieModalIsOpen"
      class="fixed left-0 top-0 z-50 min-h-screen w-screen overflow-scroll bg-transparent backdrop-blur-sm"
    >
      <add-movie-form v-on:close="closeMovieModal" />
    </div>
  </div>
</template>
