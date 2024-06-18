<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ErrorMessage, Field, useField, useForm } from 'vee-validate'

import { useUserStore } from '@/stores/UserStore'
import { useMovieStore } from '@/stores/MovieStore'
import { useQuoteStore } from '@/stores/QuoteStore'
import { addQuote } from '@/services/api/quotes'
import type { MovieList, QuoteFormRequest } from '@/types'

import FormHeader from '@/components/base/form/FormHeader.vue'
import UserInfo from '@/components/shared/UserInfo.vue'
import MoviesDropdown from '@/components/base/dropdowns/MoviesDropdown.vue'

import TextareaGroup from '@/components/base/form/TextareaGroup.vue'
import ImageHint from '@/components/base/form/ImageHint.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

import IconCaret from '@/components/icons/IconCaret.vue'
import IconVideoCamera from '@/components/icons/IconVideoCamera.vue'

const props = defineProps<{
  fromMovie?: boolean
}>()

const emit = defineEmits(['close'])

const route = useRoute()
const userStore = useUserStore()
const movieStore = useMovieStore()
movieStore.loadMovies()
const quoteStore = useQuoteStore()

const dropdownIsOpen = ref(false)
const switchDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const closeDropdown = () => {
  dropdownIsOpen.value = false
}

const imageUrl = ref<string>('')
const selectedImage = ref<File | null>(null)
const selectedMovie = ref<MovieList | undefined>(undefined)

const handleImageUpload = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList && fileList.length) {
    const file = fileList[0]
    imageUrl.value = URL.createObjectURL(file)
    selectedImage.value = file
  }
}

const { handleSubmit, setErrors } = useForm<QuoteFormRequest>()
const { value } = useField<number>('movie_id', 'required')

const chooseMovie = (movie: MovieList) => {
  value.value = movie.id
  selectedMovie.value = movie
}

if (props.fromMovie && movieStore.movie) {
  value.value = movieStore.movie.id
}

const onSubmit = handleSubmit(async (values) => {
  let formData = {
    ...values
  }

  if (selectedImage.value) {
    formData.image = selectedImage.value
  }

  try {
    await addQuote(formData)

    if (props.fromMovie) {
      await movieStore.loadMovie(route.params.id.toString())
    } else {
      await quoteStore.loadQuotes()
    }

    emit('close')
  } catch (error: any) {
    setErrors(error.response.data.errors)
  }
})
</script>

<template>
  <div
    class="flex h-full w-full flex-col bg-mirage-dark lg:mx-auto lg:h-max lg:w-1/2 lg:rounded-xl"
  >
    <form-header
      :action="fromMovie ? 'add-quote' : 'write-quote'"
      v-on:close="() => emit('close')"
    />

    <div class="flex h-full flex-col gap-8 p-9">
      <user-info
        :avatar="userStore.user?.avatar"
        :username="userStore.user?.username"
        class="text-xl"
      />

      <div v-if="fromMovie" class="rounded bg-black px-2 py-4 lg:bg-transparent">
        <div class="flex w-full items-center gap-4 lg:gap-8">
          <img
            :src="movieStore.movie?.image"
            alt="Movie Image"
            class="h-20 w-1/3 rounded-clg lg:h-40"
          />

          <div class="flex flex-col gap-2 lg:gap-4">
            <p class="font-medium text-gold lg:text-2xl">{{ movieStore.movie?.title }}</p>

            <div class="flex gap-4 lg:order-last">
              <span class="font-bold text-gray-300 lg:text-lg">{{ $t('director') }}: </span>
              <p class="font-medium text-white lg:text-lg">{{ movieStore.movie?.directors }}</p>
            </div>

            <ul class="flex flex-wrap items-center gap-2">
              <li
                v-for="genre in movieStore.movie?.genres"
                :key="genre.id"
                class="h-5 rounded bg-gray-500 px-2 text-center text-xs font-bold text-white lg:h-8 lg:text-lg"
              >
                {{ genre.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form v-on:submit="onSubmit" class="flex flex-col gap-4">
        <textarea-group lang="Eng" name="title[en]" rules="required|en" placeholder="Enter Quote" />

        <textarea-group
          lang="ქარ"
          name="title[ka]"
          rules="required|ka"
          placeholder="შეიყვანეთ ციტატა"
        />

        <div class="flex flex-col gap-2">
          <div class="rounded border border-gray-500 bg-mirage-dark">
            <label
              for="image"
              :class="selectedImage && 'gap-4'"
              class="relative flex w-full items-center justify-between p-4 text-white lg:justify-normal lg:gap-4 lg:text-xl"
            >
              <img
                v-if="selectedImage"
                :src="imageUrl"
                alt="Movie Image"
                class="h-28 w-44 shrink-0 border border-dashed border-gray-500 lg:h-40 lg:w-1/2"
              />

              <image-hint :selected-image="!!selectedImage" />

              <Field
                v-on:change="handleImageUpload"
                name="image"
                rules="required"
                type="file"
                id="image"
                accept="image/*"
                class="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>

          <ErrorMessage name="image" class="text-sm text-red-500" />
        </div>

        <div v-if="!fromMovie && !value" class="flex flex-col gap-2">
          <div
            class="relative flex h-20 w-full items-center justify-between rounded bg-black p-4 ring-2 ring-black"
          >
            <div class="flex items-center gap-4">
              <icon-video-camera />
              <span class="text-white">{{ $t('choose-movie') }}</span>
            </div>

            <button type="button" v-on:click.stop="switchDropdown">
              <icon-caret :class="dropdownIsOpen && 'rotate-180'" />
            </button>

            <movies-dropdown
              v-if="dropdownIsOpen"
              :movies="movieStore.movieList"
              v-on:close="closeDropdown"
              v-on:choose="chooseMovie"
            />
          </div>

          <ErrorMessage name="movie_id" class="text-sm text-red-500" />
        </div>

        <div
          v-if="!fromMovie && value"
          class="flex items-center gap-4 rounded bg-black p-4 text-white ring-2 ring-black"
        >
          <img :src="selectedMovie?.image" alt="Movie Image" class="h-10 w-10 rounded-full" />
          <span>{{ selectedMovie?.title }} ({{ selectedMovie?.year }})</span>
        </div>

        <primary-button action="add" class="h-12 w-full text-xl" />
      </form>
    </div>
  </div>
</template>
