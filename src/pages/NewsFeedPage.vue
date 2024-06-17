<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@/composables/onClickOutside'

import AddQuoteForm from '@/components/shared/AddQuoteForm.vue'
import FormModal from '@/components/shared/FormModal.vue'
import QuotesGrid from '@/components/news-feed/QuotesGrid.vue'

import IconPencilSquared from '@/components/icons/IconPencilSquared.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const quoteModalIsOpen = ref(false)
const openQuoteModal = () => {
  quoteModalIsOpen.value = true
}

const closeQuoteModal = () => {
  quoteModalIsOpen.value = false
}

const container = ref<HTMLElement | null>(null)
const containerIsShown = ref(false)

const showInput = () => {
  containerIsShown.value = true
}

const hideInput = () => {
  containerIsShown.value = false
}

onClickOutside(container.value, hideInput)
</script>

<template>
  <div class="flex h-full w-full flex-col gap-8 pt-9 lg:w-2/3 lg:pb-40">
    <div class="flex items-center justify-between gap-4 px-9 lg:h-14 lg:px-0">
      <div
        :class="!containerIsShown && 'flex-1'"
        class="flex h-full items-center rounded-clg lg:bg-mirage/60 lg:px-4"
      >
        <button v-on:click.stop="openQuoteModal" class="flex gap-4 text-white lg:text-xl">
          <icon-pencil-squared />
          {{ $t('write-quote') }}
        </button>
      </div>

      <button
        v-if="!containerIsShown"
        v-on:click.stop="showInput"
        class="hidden gap-4 text-xl text-gray-300 lg:flex"
      >
        <icon-search />
        {{ $t('search') }}
      </button>

      <div
        ref="container"
        v-show="containerIsShown"
        v-on:click.stop
        class="relative hidden flex-1 items-center gap-4 border-b border-zinc-600 py-4 lg:flex"
      >
        <icon-search />
        <input
          type="text"
          :placeholder="`${$t('enter')} @ ${$t('search-movie')}, ${$t('enter')} # ${$t('search-quote')}`"
          class="w-full bg-transparent text-xl text-white focus:outline-none"
        />
      </div>
    </div>

    <form-modal v-if="quoteModalIsOpen" v-on:click.self="closeQuoteModal">
      <add-quote-form v-on:close="closeQuoteModal" />
    </form-modal>

    <quotes-grid />
  </div>
</template>
