<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { useQuoteStore } from '@/stores/QuoteStore'

import { useField, useForm } from 'vee-validate'
import type { CommentFormRequest, Quote } from '@/types'
import { addComment } from '@/services/api/comments'

import UserInfo from '@/components/shared/UserInfo.vue'
import IconUser from '@/components/icons/IconUser.vue'

const props = defineProps<{
  quote: Quote
  fromMovie?: boolean
}>()

const userStore = useUserStore()
const quoteStore = useQuoteStore()

const { handleSubmit, setErrors } = useForm<CommentFormRequest>()
const { value, errorMessage, resetField } = useField<string | undefined>('body', 'required')

const handleCommenting = handleSubmit(async (values) => {
  try {
    await addComment(props.quote.id, values)

    if (props.fromMovie) {
      await quoteStore.loadQuote(props.quote.id)
    } else {
      await quoteStore.loadQuotes()
    }

    resetField({
      value: ''
    })
  } catch (error: any) {
    setErrors(error.response.data.errors)
  }
})
</script>

<template>
  <ul v-if="quote.comments.length" class="flex w-full flex-col gap-4 lg:gap-8">
    <li
      v-for="comment in quote.comments"
      :key="comment.id"
      class="flex flex-col gap-4 text-wrap border-b border-zinc-600 pb-4 lg:pb-8"
    >
      <user-info :avatar="comment.user_avatar" :username="comment.username" class="lg:text-xl" />
      <p class="break-words text-white lg:text-xl">{{ comment.body }}</p>
    </li>
  </ul>

  <div class="flex gap-4">
    <div class="h-10 w-10 shrink-0 lg:h-16 lg:w-16">
      <img
        v-if="userStore.user?.avatar"
        :src="userStore.user?.avatar"
        alt="User Avatar"
        class="h-full w-full rounded-full"
      />
      <icon-user v-if="!userStore.user?.avatar" class="h-full w-full rounded-full" />
    </div>

    <form v-on:submit.prevent v-on:keyup.enter="handleCommenting" class="w-full">
      <div class="flex flex-col gap-2">
        <input
          v-model="value"
          type="text"
          name="body"
          :placeholder="$t('write-comment')"
          class="flex h-10 w-full items-center rounded-clg bg-mirage px-4 text-white focus:outline-none lg:h-14 lg:text-xl"
        />
        <span v-if="errorMessage" class="text-sm text-red-500 lg:text-base">
          {{ errorMessage }}
        </span>
      </div>
    </form>
  </div>
</template>
