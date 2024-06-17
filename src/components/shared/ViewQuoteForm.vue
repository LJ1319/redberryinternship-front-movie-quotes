<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuoteStore } from '@/stores/QuoteStore'
import { useMovieStore } from '@/stores/MovieStore'
import { deleteQuote } from '@/services/api/quotes'

import FormHeader from '@/components/base/form/FormHeader.vue'
import UserInfo from '@/components/shared/UserInfo.vue'

import IconPencil from '@/components/icons/IconPencil.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'

const props = defineProps<{
  id: number
}>()

const emit = defineEmits(['close', 'switch'])

const route = useRoute()
const quoteStore = useQuoteStore()
quoteStore.loadQuote(props.id)
const movieStore = useMovieStore()

const handleDelete = async () => {
  try {
    await deleteQuote(props.id)
    await movieStore.loadMovie(route.params.id.toString())
    emit('close')
  } catch (error: any) {
    console.error(error)
  }
}

const handleLike = async () => {
  // TODO: implement liking
}
</script>

<template>
  <div
    v-on:click.stop
    class="flex h-full w-full flex-col bg-mirage-dark lg:mx-auto lg:h-max lg:w-1/2 lg:rounded-xl"
  >
    <form-header action="view-quote" v-on:close="() => emit('close')">
      <div class="flex items-center gap-4">
        <button v-on:click="emit('switch')">
          <icon-pencil />
        </button>

        <div class="h-4 w-px bg-gray-300"></div>

        <form v-on:submit.prevent="handleDelete" class="flex items-center">
          <button>
            <icon-bin />
          </button>
        </form>
      </div>
    </form-header>

    <div class="flex flex-col gap-8 p-9">
      <user-info
        :avatar="quoteStore.quote?.user_avatar"
        :username="quoteStore.quote?.username"
        class="lg:text-xl"
      />

      <div class="flex h-full w-full flex-col gap-4 border-b border-zinc-600 lg:gap-8 lg:pb-8">
        <div class="flex w-full flex-col gap-4">
          <div
            class="flex min-h-20 w-full justify-between rounded border border-gray-500 bg-mirage-dark p-4 focus:outline-none"
          >
            <p class="italic text-white lg:text-2xl">
              {{ quoteStore.quote?.translations.title.en }}
            </p>

            <span class="text-gray-500 lg:text-xl">Eng</span>
          </div>

          <div
            class="flex min-h-20 w-full justify-between rounded border border-gray-500 bg-mirage-dark p-4 focus:outline-none"
          >
            <p class="italic text-white lg:text-2xl">
              {{ quoteStore.quote?.translations.title.ka }}
            </p>

            <span class="text-gray-500 lg:text-xl">ქარ</span>
          </div>
        </div>

        <img
          :src="quoteStore.quote?.image"
          alt="Quote Image"
          class="h-52 w-full rounded-clg lg:h-1/2"
        />

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <span class="text-xl text-white">{{ quoteStore.quote?.comments }}</span>
            <icon-chat class="lg:h-8 lg:w-8" />
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xl text-white">{{ quoteStore.quote?.likes }}</span>

            <form v-on:submit.prevent="handleLike">
              <button class="flex items-center">
                <icon-heart class="fill-white hover:fill-rose lg:h-8 lg:w-8" />
              </button>
            </form>
          </div>
        </div>

        <ul class="flex flex-col gap-4">
          <!--  TODO: implement commenting -->
        </ul>
      </div>
    </div>
  </div>
</template>
