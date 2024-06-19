<script setup lang="ts">
import { ref } from 'vue'
import type { Quote } from '@/types'

import QuoteActionsMenu from '@/components/single-movie/QuoteActionsMenu.vue'

import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconDots from '@/components/icons/IconDots.vue'

defineProps<{
  quote: Quote
}>()

const actionsMenuIsOpen = ref(false)
const openActionsMenu = () => {
  actionsMenuIsOpen.value = true
}

const closeActionsMenu = () => {
  actionsMenuIsOpen.value = false
}

const handleSubmit = async () => {}
</script>

<template>
  <div
    class="relative flex flex-col gap-4 border-b border-zinc-600 pb-4 lg:flex-row lg:items-center"
  >
    <img :src="quote.image" alt="Quote Image" class="h-36 w-full rounded-xl lg:w-1/3" />
    <p class="items-center text-2xl italic text-gray-300">"{{ quote.title }}"</p>
    <button v-on:click.stop="openActionsMenu" class="absolute right-0 top-0 hidden lg:block">
      <icon-dots />
    </button>
  </div>

  <div class="flex items-center justify-between">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ quote.comments.length }}</span>
        <icon-chat class="lg:h-8 lg:w-8" />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ quote.likes }}</span>

        <form v-on:submit.prevent="handleSubmit">
          <button class="flex items-center">
            <icon-heart class="fill-white hover:fill-rose lg:h-8 lg:w-8" />
          </button>
        </form>
      </div>
    </div>

    <button v-on:click.stop="openActionsMenu" class="lg:hidden">
      <icon-dots />
    </button>
  </div>

  <quote-actions-menu v-if="actionsMenuIsOpen" :id="quote.id" v-on:close="closeActionsMenu" />
</template>
