<script setup lang="ts">
import { useQuoteStore } from '@/stores/QuoteStore'

import UserInfo from '@/components/shared/UserInfo.vue'

import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'

const quoteStore = useQuoteStore()
quoteStore.loadQuotes()

const handleSubmit = async (id: number) => {
  // TODO: implement liking
}
</script>

<template>
  <ul class="grid h-full w-full grid-cols-1 gap-8 lg:gap-12">
    <li
      v-for="quote in quoteStore.quoteList"
      :key="quote.id"
      class="flex h-full w-full flex-col gap-4 bg-black px-9 py-7 text-white lg:gap-8 lg:rounded-xl lg:bg-mirage-dark"
    >
      <div class="flex h-full w-full flex-col gap-4 border-b border-zinc-600 pb-4 lg:gap-8 lg:pb-8">
        <user-info :avatar="quote.user_avatar" :username="quote.username" class="lg:text-xl" />

        <p class="text-white lg:text-xl">
          "{{ quote.title }}" -
          <span class="font-medium text-gold">{{ quote.movie_title }}</span>
          ({{ quote.movie_year }})
        </p>

        <img :src="quote.image" alt="Quote Image" class="h-52 w-full rounded-clg lg:h-1/2" />

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <span class="text-xl text-white">{{ quote.comments }}</span>
            <icon-chat class="lg:h-8 lg:w-8" />
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xl text-white">{{ quote.likes }}</span>

            <form v-on:submit.prevent="handleSubmit(quote.id)">
              <button class="flex items-center">
                <icon-heart class="fill-white hover:fill-rose lg:h-8 lg:w-8" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <ul class="flex flex-col gap-4 pt-4 lg:pt-8">
        <!--  TODO: implement commenting -->
      </ul>
    </li>
  </ul>
</template>
