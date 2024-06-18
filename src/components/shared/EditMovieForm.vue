<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ErrorMessage, useField, useForm } from 'vee-validate'

import { useUserStore } from '@/stores/UserStore'
import { useMovieStore } from '@/stores/MovieStore'
import { useGenreStore } from '@/stores/GenresStore'
import { updateMovie } from '@/services/api/movies'
import type { Genre, MovieFormRequest } from '@/types'

import UserInfo from '@/components/shared/UserInfo.vue'
import GenresDropdown from '@/components/base/dropdowns/GenresDropdown.vue'

import ImageHint from '@/components/base/form/ImageHint.vue'
import TextInputGroup from '@/components/base/form/TextInputGroup.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

import IconClose from '@/components/icons/IconClose.vue'
import IconCaret from '@/components/icons/IconCaret.vue'
import FormHeader from '@/components/base/form/FormHeader.vue'

const emit = defineEmits(['close'])

const route = useRoute()

const userStore = useUserStore()
const movieStore = useMovieStore()
const genreStore = useGenreStore()
genreStore.loadGenres()

const dropdownIsOpen = ref(false)
const switchDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const closeDropdown = () => {
  dropdownIsOpen.value = false
}

const selectedGenres = ref<Array<Genre> | undefined>([])
if (movieStore.movie?.genres) {
  selectedGenres.value = [...movieStore.movie.genres]
}

const { handleSubmit, setErrors } = useForm<MovieFormRequest>()
const { value: sGenres } = useField<Array<Genre> | undefined>('genres', 'required')
sGenres.value = selectedGenres.value

const addGenre = (genre: Genre) => {
  let inArray = false
  selectedGenres.value?.forEach((sGenre) => {
    if (sGenre.id === genre.id) {
      inArray = true
      return
    }
  })

  if (!inArray) {
    selectedGenres.value?.push(genre)
    sGenres.value = selectedGenres.value
  }
}

const removeGenre = (genre: Genre) => {
  selectedGenres.value = selectedGenres.value?.filter((sGenre) => sGenre.id !== genre.id)
  sGenres.value = selectedGenres.value

  if (sGenres.value?.length === 0) {
    sGenres.value = undefined
  }
}

const imageUrl = ref<string | undefined>(movieStore.movie?.image)
const selectedImage = ref<File | null>(null)

const { value: descEn, errorMessage: descEnError } = useField<string | undefined>(
  'description[en]',
  'required|en'
)
descEn.value = movieStore.movie?.translations.description.en

const { value: descKa, errorMessage: descKaError } = useField<string | undefined>(
  'description[ka]',
  'required|ka'
)
descKa.value = movieStore.movie?.translations.description.ka

const handleImageUpload = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList && fileList.length) {
    const file = fileList[0]
    imageUrl.value = URL.createObjectURL(file)
    selectedImage.value = file
  }
}

const onSubmit = handleSubmit(async (values) => {
  let formData = {
    ...values
  }

  if (descEn.value && descKa.value) {
    formData.description = {
      en: descEn.value,
      ka: descKa.value
    }
  }

  if (selectedImage.value) {
    formData.image = selectedImage.value
  }

  try {
    const id = route.params.id.toString()

    await updateMovie(id, formData)
    await movieStore.loadMovie(id)
    emit('close')
  } catch (error: any) {
    setErrors(error.response.data.errors)
  }
})
</script>

<template>
  <div class="flex h-max w-full flex-col bg-mirage-dark lg:mx-auto lg:w-1/2 lg:rounded-xl">
    <form-header action="edit-movie" v-on:close="() => emit('close')" />

    <div class="flex h-full flex-col gap-8 p-9">
      <user-info
        :avatar="userStore.user?.avatar"
        :username="userStore.user?.username"
        class="text-xl"
      />

      <form v-on:submit="onSubmit" class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <text-input-group
            lang="Eng"
            name="title[en]"
            rules="required|en"
            label="Movie title"
            :value="movieStore.movie?.translations.title.en"
          />

          <text-input-group
            lang="ქარ"
            name="title[ka]"
            rules="required|ka"
            label="ფილმის სახელი"
            :value="movieStore.movie?.translations.title.ka"
          />

          <div class="flex flex-col gap-2">
            <div
              class="relative flex h-12 w-full items-center justify-between gap-2 rounded border border-gray-500 bg-mirage-dark px-4"
            >
              <div class="h-max overflow-scroll">
                <span v-if="!selectedGenres?.length" class="text-gray-400 lg:text-xl">
                  {{ $t('genres-placeholder') }}
                </span>

                <ul v-if="selectedGenres?.length" class="flex gap-2 py-2">
                  <li
                    v-for="sGenre in selectedGenres"
                    :key="sGenre.id"
                    class="flex items-center gap-1 rounded-[2px] bg-gray-500 px-1 py-0.5 text-sm text-white lg:gap-2 lg:px-2 lg:py-1"
                  >
                    {{ sGenre.title }}
                    <button type="button" v-on:click="removeGenre(sGenre)">
                      <icon-close class="h-2 w-2" />
                    </button>
                  </li>
                </ul>
              </div>

              <button type="button" v-on:click.stop="switchDropdown">
                <icon-caret :class="dropdownIsOpen && 'rotate-180'" />
              </button>

              <genres-dropdown
                v-if="dropdownIsOpen"
                :genres="genreStore.genreList"
                v-on:close="closeDropdown"
                v-on:add="addGenre"
              />
            </div>

            <ErrorMessage name="genres" class="text-sm text-red-500" />
          </div>

          <text-input-group
            name="year"
            rules="required|num"
            label="Year / წელი"
            :value="movieStore.movie?.year"
          />

          <text-input-group
            lang="Eng"
            name="directors[en]"
            rules="required|en"
            label="Director(s)"
            :value="movieStore.movie?.translations.directors.en"
          />

          <text-input-group
            lang="ქარ"
            name="directors[ka]"
            rules="required|ka"
            label="რეჟისორ(ებ)ი"
            :value="movieStore.movie?.translations.directors.ka"
          />

          <div class="flex flex-col gap-2">
            <div
              class="flex flex-col gap-2 rounded border border-gray-500 bg-mirage-dark pt-2 lg:text-xl"
            >
              <div class="flex w-full justify-between px-4 text-gray-500">
                <label for="description[en]" class="text-base">Movie description:</label>
                <span class="lg:text-xl">Eng</span>
              </div>

              <textarea
                v-model="descEn"
                name="description[en]"
                id="description[en]"
                class="w-full bg-transparent px-4 pb-4 text-white focus:outline-none"
              />
            </div>

            <span class="text-sm text-red-500">{{ descEnError }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <div
              class="flex flex-col gap-2 rounded border border-gray-500 bg-mirage-dark pt-2 lg:text-xl"
            >
              <div class="flex w-full justify-between px-4 text-gray-500">
                <label for="description[en]" class="text-base">ფილმის აღწერა:</label>
                <span>ქარ</span>
              </div>

              <textarea
                v-model="descKa"
                name="description[ka]"
                id="description[ka]"
                class="w-full bg-transparent px-4 pb-4 text-white focus:outline-none"
              />
            </div>

            <span class="text-sm text-red-500">{{ descKaError }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <div class="rounded border border-gray-500 bg-mirage-dark">
              <label
                for="image"
                :class="imageUrl && 'gap-4'"
                class="relative flex w-full items-center justify-between p-4 text-white lg:justify-normal lg:gap-4 lg:text-xl"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Movie Image"
                  class="h-28 w-44 shrink-0 border border-dashed border-gray-500 lg:h-40 lg:w-1/2"
                />

                <image-hint :selected-image="!!imageUrl" />

                <input
                  v-on:change="handleImageUpload"
                  name="image"
                  type="file"
                  id="image"
                  accept="image/*"
                  class="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>

            <ErrorMessage name="image" class="text-sm text-red-500" />
          </div>
        </div>

        <primary-button action="save-changes" class="h-12 w-full text-xl" />
      </form>
    </div>
  </div>
</template>
