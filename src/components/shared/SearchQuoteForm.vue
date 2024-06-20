<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useField, useForm } from 'vee-validate'

import { useQuoteStore } from '@/stores/QuoteStore'
import type { QuoteSearchFormRequest } from '@/types'
import { searchQuote } from '@/services/api/quotes'

defineProps<{
  placeholder: string
}>()

const emit = defineEmits(['close'])

const { locale } = useI18n()
const quoteStore = useQuoteStore()

const { handleSubmit } = useForm<QuoteSearchFormRequest>()
const { value, errorMessage } = useField<string | undefined>(
  'title',
  `required|${locale.value}Search`
)

const handleSearch = handleSubmit(async (values) => {
  let formData = {
    title: '',
    movie_title: ''
  }

  if (values.title && values.title.includes('@')) {
    const newValues = values.title.split('@')
    formData.movie_title = newValues[1].trim()
  }

  if (values.title && values.title.includes('#')) {
    const newValues = values.title.split('#')
    formData.title = newValues[1].trim()
  }

  try {
    const { data } = await searchQuote(formData)
    quoteStore.setFiltered(data.data)
    emit('close')
  } catch (error: any) {
    console.error(error)
  }
})
</script>

<template>
  <div class="flex h-full w-full flex-col gap-2 border-b border-zinc-600 px-6 py-5 lg:px-0 lg:py-2">
    <div class="flex items-center gap-4">
      <slot />

      <form v-on:submit.prevent v-on:keyup.enter="handleSearch" class="w-full">
        <input
          v-model.trim="value"
          type="text"
          name="search"
          id="search"
          :placeholder="placeholder"
          class="w-full bg-transparent text-white focus:outline-none lg:text-lg"
        />
      </form>
    </div>
  </div>
  <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
</template>
