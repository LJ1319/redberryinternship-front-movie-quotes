<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useMovieStore } from '@/stores/MovieStore'
import { deleteMovie } from '@/services/api/movies'

import FormModal from '@/components/shared/FormModal.vue'
import EditMovieForm from '@/components/shared/EditMovieForm.vue'
import AddQuoteForm from '@/components/shared/AddQuoteForm.vue'
import MovieQuotesGrid from '@/components/single-movie/MovieQuotesGrid.vue'

import IconPencil from '@/components/icons/IconPencil.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const { locale } = useI18n()

const movieStore = useMovieStore()
movieStore.loadMovie(props.id)

watch(locale, () => {
  movieStore.loadMovie(props.id)
})

onUnmounted(() => {
  movieStore.reset()
})

const addModalIsOpen = ref(false)
const editModalIsOpen = ref(false)

const openModal = (modal: string) => {
  switch (modal) {
    case 'add':
      addModalIsOpen.value = true
      break
    case 'edit':
      editModalIsOpen.value = true
      break
  }
}

const closeModal = (modal: string) => {
  switch (modal) {
    case 'add':
      addModalIsOpen.value = false
      break
    case 'edit':
      editModalIsOpen.value = false
      break
  }
}

const handleSubmit = async () => {
  try {
    await deleteMovie(props.id)
    await router.push({ name: 'my-movies' })
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex h-full w-full flex-col gap-9 pb-40 pt-9 lg:pl-0 lg:pr-18">
    <h1 class="hidden w-max text-2xl text-white lg:block">{{ $t('movie-description') }}</h1>

    <form-modal v-if="editModalIsOpen" v-on:click.self="closeModal('edit')">
      <edit-movie-form v-on:close="closeModal('edit')" />
    </form-modal>

    <form-modal v-if="addModalIsOpen" v-on:click.self="closeModal('add')">
      <add-quote-form :from-movie="true" v-on:close="closeModal('add')" />
    </form-modal>

    <div class="flex flex-col gap-4 px-9 lg:flex-row lg:gap-8 lg:px-0">
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
            <button v-on:click="openModal('edit')">
              <icon-pencil />
            </button>

            <div class="h-2/5 w-px bg-zinc-600"></div>

            <form v-on:submit.prevent="handleSubmit" class="flex items-center">
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
            v-on:click="openModal('add')"
            class="flex h-10 w-32 min-w-max items-center justify-center gap-2 rounded bg-red px-2 py-0.5 text-white lg:max-w-max lg:text-xl"
          >
            <icon-plus class="shrink-0" />
            {{ $t('add-quote') }}
          </button>

          <div class="flex items-center gap-4">
            <button v-on:click="openModal('edit')">
              <icon-pencil />
            </button>

            <form v-on:submit.prevent="handleSubmit" class="flex items-center">
              <button>
                <icon-bin />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 border-t border-zinc-600 py-9 lg:gap-12 lg:border-0 lg:py-0">
      <div class="items-center gap-4 px-9 lg:flex lg:px-0">
        <div class="flex flex-col gap-2 lg:flex-row lg:items-center">
          <h2 class="text-2xl text-white">{{ $t('all-quotes') }}</h2>
          <span class="text-white lg:text-2xl">
            ({{ $t('total') }} {{ movieStore.movie?.quotes.length }})
          </span>
        </div>

        <div class="hidden h-6 w-px bg-zinc-600 lg:block"></div>

        <button
          v-on:click="openModal('add')"
          class="hidden h-12 w-32 min-w-max items-center justify-center gap-2 rounded bg-red px-2 py-0.5 text-white lg:flex lg:max-w-max lg:text-xl"
        >
          <icon-plus class="shrink-0" />
          {{ $t('add-quote') }}
        </button>
      </div>

      <movie-quotes-grid :quotes="movieStore.movie?.quotes" />
    </div>
  </div>
</template>
