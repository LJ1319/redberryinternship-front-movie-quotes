<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useField, useForm } from 'vee-validate'

import { useMovieStore } from '@/stores/MovieStore'
import type { MovieSearchFormRequest } from '@/types'
import { searchMovie } from '@/services/api/movies'

import IconSearch from '@/components/icons/IconSearch.vue'

const emit = defineEmits(['close'])

const { locale } = useI18n()
const movieStore = useMovieStore()

const { handleSubmit } = useForm<MovieSearchFormRequest>()
const { value, errorMessage } = useField<string | undefined>('title', `required|${locale.value}`)

const handleSearch = handleSubmit(async (values) => {
  try {
    const { data } = await searchMovie(values)
    movieStore.setFiltered(data)
    emit('close')
  } catch (error: any) {
    console.error(error)
  }
})
</script>

<template>
  <div class="flex h-full w-full flex-col gap-2 border-b border-zinc-600 py-2">
    <div class="flex items-center gap-4">
      <icon-search />

      <form v-on:submit.prevent v-on:keyup.enter="handleSearch" class="w-full">
        <input
          v-model.trim="value"
          type="text"
          name="search"
          id="search"
          :placeholder="$t('search')"
          class="w-full bg-transparent text-white focus:outline-none lg:text-lg"
        />
      </form>
    </div>
  </div>

  <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
</template>
