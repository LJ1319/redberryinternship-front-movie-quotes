<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/MovieStore'
import { deleteMovie } from '@/services/api/movies'

import EditMovieForm from '@/components/my-movies/EditMovieForm.vue'

import IconPencil from '@/components/icons/IconPencil.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const movieStore = useMovieStore()
movieStore.loadMovie(props.id)

const modalIsOpen = ref(false)
const openModal = () => {
  modalIsOpen.value = true
}

const closeModal = () => {
  modalIsOpen.value = false
}

const onSubmit = async (event: Event) => {
  event.preventDefault()
  try {
    await deleteMovie(props.id)
    await router.push({ name: 'my-movies' })
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex h-full w-full flex-col gap-9 px-9 py-9 lg:pl-0 lg:pr-18">
    <h1 class="hidden text-white lg:block">{{ $t('movie-description') }}</h1>

    <div
      v-if="modalIsOpen"
      v-on:click.self="closeModal"
      class="lg: fixed left-0 top-0 z-50 h-full w-screen overflow-auto bg-transparent backdrop-blur-sm lg:py-32"
    >
      <edit-movie-form v-on:close="closeModal" />
    </div>

    <div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <img
        :src="movieStore.movie?.image"
        alt="Movie Image"
        class="h-80 shrink-0 rounded-xl lg:h-auto lg:w-3/5"
      />

      <div class="flex w-full flex-col gap-4">
        <div class="flex justify-between gap-4">
          <p class="text-2xl font-medium text-gold">
            {{ movieStore.movie?.title }} ({{ movieStore.movie?.year }})
          </p>

          <div class="hidden h-10 items-center gap-6 rounded-xl bg-mirage px-6 lg:flex">
            <button v-on:click="openModal">
              <icon-pencil />
            </button>

            <div class="h-2/5 w-px bg-zinc-600"></div>

            <form v-on:submit="onSubmit" class="flex items-center">
              <button>
                <icon-bin />
              </button>
            </form>
          </div>
        </div>

        <ul class="flex flex-wrap gap-2">
          <li
            v-for="genre in movieStore.movie?.genres"
            :key="genre.id"
            class="h-8 rounded bg-gray-500 px-2 text-center text-lg font-bold text-white"
          >
            {{ genre.title }}
          </li>
        </ul>

        <div class="flex gap-4">
          <span class="text-lg font-bold text-gray-300">{{ $t('director') }}: </span>
          <p class="text-lg font-medium text-white">{{ movieStore.movie?.directors }}</p>
        </div>

        <p class="text-lg text-gray-300">{{ movieStore.movie?.description }}</p>

        <div class="flex justify-between lg:hidden">
          <button
            class="flex h-10 w-32 min-w-max items-center justify-center gap-2 rounded bg-red px-2 py-0.5 text-white lg:max-w-max lg:text-xl"
          >
            <icon-plus class="shrink-0" />
            {{ $t('add-quote') }}
          </button>

          <div class="flex items-center gap-4">
            <button v-on:click="openModal">
              <icon-pencil />
            </button>

            <form v-on:submit="onSubmit" class="flex items-center">
              <button>
                <icon-bin />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 border-t border-zinc-600 py-9 lg:border-0 lg:py-0">
      <div class="items-center gap-4 lg:flex">
        <div class="flex items-center gap-2">
          <h2 class="text-2xl text-white">{{ $t('all-quotes') }}</h2>
          <span class="text-white lg:text-2xl">({{ $t('total') }} 4)</span>
        </div>

        <div class="hidden h-6 w-px bg-zinc-600 lg:block"></div>

        <button
          class="hidden h-12 w-32 min-w-max items-center justify-center gap-2 rounded bg-red px-2 py-0.5 text-white lg:flex lg:max-w-max lg:text-xl"
        >
          <icon-plus class="shrink-0" />
          {{ $t('add-quote') }}
        </button>
      </div>

      <div>
        <!--  TODO: Quotes  -->
      </div>
    </div>
  </div>
</template>
