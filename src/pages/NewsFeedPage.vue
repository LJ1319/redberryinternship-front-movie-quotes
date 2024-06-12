<script setup lang="ts">
import { ref } from 'vue'

import AddQuoteForm from '@/components/news-feed/AddQuoteForm.vue'
import IconPencil from '@/components/icons/IconPencil.vue'

const quoteModalIsOpen = ref(false)

const openQuoteModal = () => {
  quoteModalIsOpen.value = true
}

const closeQuoteModal = () => {
  quoteModalIsOpen.value = false
}
</script>

<template>
  <div class="h-full w-full">
    <div class="mx-9 my-8">
      <button v-on:click.stop="openQuoteModal" class="flex gap-4 capitalize text-white lg:text-xl">
        <icon-pencil />
        {{ $t('write-quote') }}
      </button>
    </div>

    <div
      v-if="quoteModalIsOpen"
      v-on:click="closeQuoteModal"
      class="fixed left-0 top-0 z-50 min-h-screen w-screen bg-transparent backdrop-blur-sm"
    >
      <add-quote-form v-on:close="closeQuoteModal" />
    </div>
  </div>
</template>
