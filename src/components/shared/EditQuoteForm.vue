<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ErrorMessage, useField, useForm } from 'vee-validate'

import { useMovieStore } from '@/stores/MovieStore'
import { useQuoteStore } from '@/stores/QuoteStore'
import { deleteQuote, updateQuote } from '@/services/api/quotes'
import type { QuoteFormRequest } from '@/types'

import FormHeader from '@/components/base/form/FormHeader.vue'
import UserInfo from '@/components/shared/UserInfo.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

import IconBin from '@/components/icons/IconBin.vue'
import IconCamera from '@/components/icons/IconCamera.vue'

const props = defineProps<{
  id: number
}>()

const emit = defineEmits(['close'])

const route = useRoute()
const movieStore = useMovieStore()
const quoteStore = useQuoteStore()

const handleDelete = async () => {
  try {
    await deleteQuote(props.id)
    await movieStore.loadMovie(route.params.id.toString())
    emit('close')
  } catch (error: any) {
    console.error(error)
  }
}

const { handleSubmit, setErrors } = useForm<QuoteFormRequest>()
const { value } = useField<number>('movie_id', 'required')
if (movieStore.movie) {
  value.value = movieStore.movie.id
}

const { value: titleEn, errorMessage: titleEnError } = useField<string | undefined>(
  'title[en]',
  'required|en'
)

const { value: titleKa, errorMessage: titleKaError } = useField<string | undefined>(
  'title[ka]',
  'required|ka'
)

const imageUrl = ref<string | undefined>('')
const selectedImage = ref<File | null>(null)

const handleImageUpload = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList && fileList.length) {
    const file = fileList[0]
    imageUrl.value = URL.createObjectURL(file)
    selectedImage.value = file
  }
}

const initQuote = async () => {
  try {
    await quoteStore.loadQuote(props.id)

    imageUrl.value = quoteStore.quote?.image
    titleEn.value = quoteStore.quote?.translations.title.en
    titleKa.value = quoteStore.quote?.translations.title.ka
  } catch (error: any) {
    console.error(error)
  }
}
initQuote()

const onSubmit = handleSubmit(async (values) => {
  let formData = {
    ...values
  }

  if (selectedImage.value) {
    formData.image = selectedImage.value
  }

  try {
    await updateQuote(props.id, formData)
    await movieStore.loadMovie(route.params.id.toString())
    emit('close')
  } catch (error: any) {
    console.log(error)
    setErrors(error.response.data.errors)
  }
})

onUnmounted(() => {
  quoteStore.reset()
})
</script>

<template>
  <div
    v-on:click.stop
    class="flex h-full w-full flex-col bg-mirage-dark lg:mx-auto lg:h-max lg:w-1/2 lg:rounded-xl"
  >
    <form-header action="edit-quote" v-on:close="() => emit('close')">
      <form v-on:submit="handleDelete" class="flex items-center">
        <button>
          <icon-bin />
        </button>
      </form>
    </form-header>

    <div class="flex h-full flex-col gap-8 p-9">
      <user-info
        :avatar="quoteStore.quote?.user_avatar"
        :username="quoteStore.quote?.username"
        class="text-xl"
      />

      <form v-on:submit="onSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="relative">
            <textarea
              v-model="titleEn"
              name="title[en]"
              id="title[en]"
              class="w-full rounded border border-gray-500 bg-mirage-dark p-4 pr-16 italic text-white focus:outline-none lg:text-2xl"
            />

            <span class="absolute right-4 top-4 not-italic text-gray-500 lg:text-xl">Eng</span>
          </div>

          <span class="text-sm text-red-500 lg:text-base">{{ titleEnError }}</span>
        </div>

        <div class="flex flex-col gap-2">
          <div class="relative">
            <textarea
              v-model="titleKa"
              name="title[ka]"
              id="title[ka]"
              class="w-full rounded border border-gray-500 bg-mirage-dark p-4 pr-16 italic text-white focus:outline-none lg:text-2xl"
            />

            <span class="absolute right-4 top-4 not-italic text-gray-500 lg:text-xl">ქარ</span>
          </div>

          <span class="text-sm text-red-500 lg:text-base">{{ titleKaError }}</span>
        </div>

        <div class="flex flex-col gap-2">
          <label for="image" class="relative h-80 w-full cursor-pointer rounded-clg lg:h-[32rem]">
            <img :src="imageUrl" alt="Quote Image" class="h-full w-full rounded-clg" />

            <span class="absolute inset-0 flex items-center justify-center">
              <span
                style="
                  background: linear-gradient(
                    187.16deg,
                    #181623 0.07%,
                    #191725 51.65%,
                    #0d0b14 98.75%
                  );
                  opacity: 80%;
                "
                class="flex h-20 flex-col items-center justify-center gap-2 rounded-clg bg-opacity-80 px-4 text-white lg:h-auto lg:py-4"
              >
                <icon-camera />
                {{ $t('change-photo') }}
                <input
                  v-on:change="handleImageUpload"
                  type="file"
                  name="image"
                  id="image"
                  class="absolute left-0 top-0 hidden h-full w-full"
                />
              </span>
            </span>
          </label>

          <ErrorMessage name="image" class="text-sm text-red-500" />
        </div>

        <primary-button action="save-changes" class="h-12 w-full text-xl" />
      </form>
    </div>
  </div>
</template>
