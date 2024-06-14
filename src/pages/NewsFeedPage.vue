<script setup lang="ts">
import { ref } from 'vue'

import AddQuoteForm from '@/components/news-feed/AddQuoteForm.vue'
import IconPencilSquared from '@/components/icons/IconPencilSquared.vue'

const quoteModalIsOpen = ref(false)

const openQuoteModal = () => {
  quoteModalIsOpen.value = true
}

const closeQuoteModal = () => {
  quoteModalIsOpen.value = false
}
</script>

<template>
  <div class="flex h-full w-full flex-col gap-9 px-9 py-9 lg:pl-0 lg:pr-18">
    <div class="flex items-center">
      <button
        v-on:click.stop="openQuoteModal"
        class="flex items-center gap-4 text-white lg:text-xl"
      >
        <icon-pencil-squared />
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
