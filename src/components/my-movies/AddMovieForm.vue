<script setup lang="ts">
import { ref, watch } from 'vue'
import { ErrorMessage, Field, useField, useForm } from 'vee-validate'

import { useUserStore } from '@/stores/UserStore'
import { addMovie, getGenres } from '@/services/api/resources'
import type { AddMovieValues, Genre } from '@/types'

import TextInputGroup from '@/components/my-movies/form/TextInputGroup.vue'
import GenresDropdown from '@/components/my-movies/form/GenresDropdown.vue'
import TextareaGroup from '@/components/my-movies/form/TextareaGroup.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

import IconClose from '@/components/icons/IconClose.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconCaret from '@/components/icons/IconCaret.vue'
import IconCamera from '@/components/icons/IconCamera.vue'

const emit = defineEmits(['close'])

const userStore = useUserStore()
const user = ref(userStore.user)
const genres = ref<Array<Genre>>([])

const loadGenres = async () => {
  try {
    const { data } = await getGenres()
    genres.value = data
  } catch (error: any) {
    console.error(error)
  }
}
loadGenres()

const dropdownIsOpen = ref(false)
const selectedGenres = ref<Set<Genre>>(new Set())

const switchDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const closeDropdown = () => {
  dropdownIsOpen.value = false
}

const addGenre = (genre: Genre) => {
  selectedGenres.value.add(genre)
}

const removeGenre = (genre: Genre) => {
  selectedGenres.value.delete(genre)
}

const imageUrl = ref(user.value?.avatar)
const selectedImage = ref<File | null>(null)

const handleImageUpload = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList && fileList.length) {
    const file = fileList[0]
    imageUrl.value = URL.createObjectURL(file)
    selectedImage.value = file
  }
}

const { handleSubmit, setErrors } = useForm<AddMovieValues>()
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
  } catch (error: any) {
    setErrors(error.response.data.errors)
  }
})
</script>

<template>
  <div class="absolute left-0 top-0 z-50 flex h-max w-full flex-col bg-mirage-dark">
    <div class="flex items-center border-b border-gray-300/20 p-9">
      <h1 class="flex-1 text-center text-xl font-medium capitalize text-white">
        {{ $t('add-movie') }}
      </h1>
      <button v-on:click="emit('close')" class="shrink-0">
        <icon-close color="white" />
      </button>
    </div>

    <div class="item flex h-full flex-col gap-8 p-9">
      <div class="flex items-center gap-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-full">
          <img
            v-if="user?.avatar"
            :src="user?.avatar"
            alt="User Avatar"
            class="h-10 w-10 rounded-full"
          />

          <icon-user v-if="!user?.avatar" class="h-10 w-10 rounded-full" />
        </div>

        <p class="text-xl text-white">{{ user?.username }}</p>
      </div>

      <form v-on:submit="onSubmit" class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <text-input-group
            lang="eng"
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
                <span v-if="!selectedGenres.size" class="capitalize text-gray-400">
                  {{ $t('genres-placeholder') }}
                </span>

                <ul v-if="selectedGenres.size" class="flex gap-2 py-2">
                  <li
                    v-for="sGenre in selectedGenres"
                    :key="sGenre.id"
                    class="flex items-center gap-1 rounded-[2px] bg-gray-500 px-1 text-sm text-white"
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
                :genres="genres"
                v-on:close="closeDropdown"
                v-on:add="addGenre"
              />
            </div>

            <ErrorMessage name="genres" class="text-sm text-red-500" />
          </div>

          <text-input-group name="year" rules="required|num" placeholder="Year / წელი" />

          <text-input-group
            lang="eng"
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
            lang="eng"
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
                class="relative flex w-full items-center justify-between p-4 text-white lg:text-xl"
              >
                <img
                  v-if="selectedImage"
                  :src="imageUrl"
                  alt="Movie Image"
                  class="w-44 shrink-0 border border-dashed border-gray-500"
                />

                <span v-if="!selectedImage" class="flex flex-col items-center gap-2">
                  <icon-camera />
                  {{ $t('dad-image') }}
                </span>

                <span v-if="!selectedImage" class="shrink-0">
                  {{ $t('or') }}
                </span>

                <span :class="selectedImage && 'flex flex-col gap-4'">
                  <span v-if="selectedImage" class="text-xs font-bold uppercase text-gold">
                    {{ $t('replace-image') }}
                  </span>

                  <span
                    :class="selectedImage && 'text-sm'"
                    class="flex min-h-10 shrink-0 items-center rounded-[2px] bg-purple/40 px-4 text-center"
                  >
                    {{ $t('choose-file') }}
                  </span>
                </span>

                <Field
                  ref="movieImage"
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
