<script setup lang="ts">
import { useQuoteStore } from '@/stores/QuoteStore'
import type { Quote } from '@/types'
import { likeQuote, unlikeQuote } from '@/services/api/likes'

import UserInfo from '@/components/shared/UserInfo.vue'
import QuoteComments from '@/components/shared/QuoteComments.vue'

import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconHeartFill from '@/components/icons/IconHeartFill.vue'

const props = defineProps<{
  quote: Quote
}>()

const quoteStore = useQuoteStore()

const handleLiking = async () => {
  try {
    if (!props.quote.isLiked) {
      await likeQuote(props.quote.id)
      await quoteStore.loadQuote(props.quote.id)
    } else {
      await unlikeQuote(props.quote.id)
      await quoteStore.loadQuote(props.quote.id)
    }

    await quoteStore.loadQuotes()
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex h-full w-full flex-col gap-4 border-b border-zinc-600 pb-4 lg:gap-8 lg:pb-8">
    <user-info :avatar="quote.user_avatar" :username="quote.username" class="lg:text-xl" />

    <p class="text-white lg:text-xl">
      "{{ quote.title }}" -
      <span class="font-medium text-gold">{{ quote.movie_title }}</span>
      ({{ quote.movie_year }})
    </p>

    <img :src="quote.image" alt="Quote Image" class="h-52 w-full rounded-clg lg:h-[32rem]" />

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ quote.comments.length }}</span>
        <icon-chat class="lg:h-8 lg:w-8" />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ quote.likes }}</span>

        <form v-on:submit.prevent="handleLiking">
          <button class="flex items-center">
            <icon-heart
              v-if="!props.quote.isLiked"
              class="fill-white hover:fill-rose lg:h-8 lg:w-8"
            />

            <icon-heart-fill v-if="props.quote.isLiked" class="lg:h-8 lg:w-8" />
          </button>
        </form>
      </div>
    </div>
  </div>

  <quote-comments :quote="props.quote" />
</template>
