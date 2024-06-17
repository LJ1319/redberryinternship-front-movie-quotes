<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/MovieStore'

import FormModal from '@/components/shared/FormModal.vue'
import AddMovieForm from '@/components/my-movies/AddMovieForm.vue'

import IconPlus from '@/components/icons/IconPlus.vue'
import IconQuote from '@/components/icons/IconQuote.vue'

const modalIsOpen = ref(false)
const openModal = () => {
  modalIsOpen.value = true
}

const closeModal = () => {
  modalIsOpen.value = false
}

const movieStore = useMovieStore()
movieStore.loadMovies()
</script>

<template>
  <div class="flex h-full w-full flex-col gap-9 px-9 pb-40 pt-9 lg:pl-0 lg:pr-18">
    <div class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-medium text-white">{{ $t('my-movies') }}</h1>
        <span class="font-medium text-white">
          ({{ $t('total') }} {{ movieStore.movieList.length }})
        </span>
      </div>

      <button
        v-on:click.stop="openModal"
        class="flex h-max min-h-10 max-w-32 items-center justify-center gap-2 rounded bg-red px-2 py-0.5 text-white lg:max-w-max lg:text-xl"
      >
        <icon-plus class="shrink-0" />
        {{ $t('add-movie') }}
      </button>
    </div>

    <form-modal v-if="modalIsOpen" v-on:click.self="closeModal">
      <add-movie-form v-on:close="closeModal" />
    </form-modal>

    <ul class="grid h-full w-full grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-8">
      <li v-for="movie in movieStore.movieList" :key="movie.id">
        <router-link
          :to="{
            name: 'single-movie',
            params: { id: movie.id }
          }"
          class="flex flex-col gap-4"
        >
          <img :src="movie.image" alt="Movie Image" class="h-80 rounded-xl lg:h-96" />
          <p class="text-2xl font-medium text-white">{{ movie.title }} ({{ movie.year }})</p>
          <p class="flex items-center gap-2 text-xl text-white">
            {{ movie.quotes }}
            <icon-quote />
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
