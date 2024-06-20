<script setup lang="ts">
import { ref, watch } from 'vue'
import { ErrorMessage, Field, useField, useForm } from 'vee-validate'

import { useUserStore } from '@/stores/UserStore'
import { useGenreStore } from '@/stores/GenresStore'
import { useMovieStore } from '@/stores/MovieStore'
import { addMovie } from '@/services/api/movies'
import type { Genre, MovieFormRequest } from '@/types'

import FormHeader from '@/components/base/form/FormHeader.vue'
import UserInfo from '@/components/shared/UserInfo.vue'
import GenresDropdown from '@/components/base/dropdowns/GenresDropdown.vue'

import TextInputGroup from '@/components/base/form/TextInputGroup.vue'
import TextareaGroup from '@/components/base/form/TextareaGroup.vue'
import ImageHint from '@/components/base/form/ImageHint.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

import IconClose from '@/components/icons/IconClose.vue'
import IconCaret from '@/components/icons/IconCaret.vue'

const emit = defineEmits(['close'])

const userStore = useUserStore()
const genreStore = useGenreStore()
genreStore.loadGenres()
const movieStore = useMovieStore()

const dropdownIsOpen = ref(false)
const switchDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const closeDropdown = () => {
  dropdownIsOpen.value = false
}

const selectedGenres = ref<Set<Genre>>(new Set())
const addGenre = (genre: Genre) => {
  selectedGenres.value.add(genre)
}

const removeGenre = (genre: Genre) => {
  selectedGenres.value.delete(genre)
}

const imageUrl = ref<string>('')
const selectedImage = ref<File | null>(null)

const handleImageUpload = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList && fileList.length) {
    const file = fileList[0]
    imageUrl.value = URL.createObjectURL(file)
    selectedImage.value = file
  }
}

const { handleSubmit, setErrors } = useForm<MovieFormRequest>()
const { value } = useField<Array<Genre> | undefined>('genres', 'required')

watch(selectedGenres.value, (selectedGenres) => {
  if (selectedGenres.size) {
    value.value = [...selectedGenres]
  } else {
    value.value = undefined
  }
})

const onSubmit = handleSubmit(async (values) => {
  let formData = {
    ...values
  }

  if (selectedImage.value) {
    formData.image = selectedImage.value
  }

  try {
    await addMovie(formData)
    await movieStore.loadMovies()
    emit('close')
  } catch (error: any) {
    setErrors(error.response.data.errors)
  }
})
</script>

<template>
  <div class="flex h-max w-full flex-col bg-mirage-dark lg:mx-auto lg:w-1/2 lg:rounded-xl">
    <form-header action="add-movie" v-on:close="() => emit('close')" />

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
            placeholder="Movie title"
          />

          <text-input-group
            lang="ქარ"
            name="title[ka]"
            rules="required|ka"
            placeholder="ფილმის სახელი"
          />

          <div class="flex flex-col gap-2">
            <div
              class="relative flex h-12 w-full items-center justify-between gap-2 rounded border border-gray-500 bg-mirage-dark px-4"
            >
              <div class="h-max overflow-scroll">
                <span v-if="!selectedGenres.size" class="text-gray-400 lg:text-xl">
                  {{ $t('genres-placeholder') }}
                </span>

                <ul v-if="selectedGenres.size" class="flex gap-2 py-2">
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

          <text-input-group name="year" rules="required|num" placeholder="Year / წელი" />

          <text-input-group
            lang="Eng"
            name="directors[en]"
            rules="required|en"
            placeholder="Director(s)"
          />

          <text-input-group
            lang="ქარ"
            name="directors[ka]"
            rules="required|ka"
            placeholder="რეჟისორ(ებ)ი"
          />

          <textarea-group
            lang="Eng"
            name="description[en]"
            rules="required|en"
            placeholder="Movie description"
          />

          <textarea-group
            lang="ქარ"
            name="description[ka]"
            rules="required|ka"
            placeholder="ფილმის აღწერა"
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
        </div>

        <primary-button action="add" class="h-12 w-full text-xl" />
      </form>
    </div>
  </div>
</template>
