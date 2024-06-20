<script setup lang="ts">
import { ref } from 'vue'

import { useMovieStore } from '@/stores/MovieStore'
import { onClickOutside } from '@/composables/onClickOutside'

import SearchMovieForm from '@/components/my-movies/SearchMovieForm.vue'
import FormModal from '@/components/shared/FormModal.vue'
import AddMovieForm from '@/components/my-movies/AddMovieForm.vue'

import IconPlus from '@/components/icons/IconPlus.vue'
import IconQuote from '@/components/icons/IconQuote.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const modalIsOpen = ref(false)
const openModal = () => {
  modalIsOpen.value = true
}

const closeModal = () => {
  modalIsOpen.value = false
}

const movieStore = useMovieStore()
movieStore.loadMovies()

const container = ref<HTMLElement | null>(null)
const containerIsShown = ref(false)

const showInput = () => {
  containerIsShown.value = true
}

const hideInput = () => {
  containerIsShown.value = false
}

onClickOutside(container.value, hideInput)
</script>

<template>
  <div class="flex h-full w-full flex-col gap-9 px-9 pb-40 pt-9 lg:gap-18 lg:pl-0 lg:pr-18">
    <div class="flex h-12 items-center justify-between gap-4">
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center">
        <h1 class="text-2xl font-medium text-white">{{ $t('my-movies') }}</h1>
        <span class="font-medium text-white lg:text-2xl">
          ({{ $t('total') }} {{ movieStore.movieList.length }})
        </span>
      </div>

      <div class="flex items-center gap-8">
        <button
          v-if="!containerIsShown"
          v-on:click.stop="showInput"
          class="hidden w-max gap-4 text-xl text-gray-300 lg:flex"
        >
          <icon-search />
          {{ $t('search') }}
        </button>

        <div
          ref="container"
          v-if="containerIsShown"
          v-on:click.stop
          class="hidden flex-1 flex-col gap-2 lg:flex"
        >
          <search-movie-form v-on:close="hideInput" />
        </div>

        <button
          v-on:click.stop="openModal"
          class="flex h-max min-h-10 max-w-32 items-center justify-center gap-2 rounded bg-red px-2 py-0.5 text-white lg:max-w-max lg:text-xl"
        >
          <icon-plus class="shrink-0" />
          {{ $t('add-movie') }}
        </button>
      </div>
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
