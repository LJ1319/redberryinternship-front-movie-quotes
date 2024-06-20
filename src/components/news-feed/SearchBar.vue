<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import QuoteSearchForm from '@/components/shared/SearchQuoteForm.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-full w-full bg-mirage-black lg:hidden">
    <quote-search-form :placeholder="$t('search')" v-on:close="() => emit('close')">
      <button v-on:click="emit('close')" class="h-4 w-4 lg:hidden">
        <icon-arrow-left class="h-full w-full" />
      </button>
    </quote-search-form>

    <div class="flex flex-col gap-8 px-14 py-8">
      <p class="text-gray-300">
        {{ $t('enter') }}
        <span class="text-white">@</span>
        {{ $t('search-movie') }}
      </p>

      <p class="text-gray-300">
        {{ $t('enter') }}
        <span class="text-white">#</span>
        {{ $t('search-quote') }}
      </p>
    </div>
  </div>
</template>
