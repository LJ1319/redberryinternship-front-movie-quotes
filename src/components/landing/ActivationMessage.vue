<script setup lang="ts">
import MessageContainer from '@/components/shared/MessageContainer.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const emit = defineEmits<{
  switch: [content: string]
}>()
</script>

<template>
  <message-container>
    <div class="flex flex-col items-center justify-center gap-4">
      <icon-check />
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">{{ $t('thanks') }}!</h1>
    </div>

    <p class="text-white">{{ $t('activation-message') }}</p>
    <button
      v-on:click="emit('switch', 'login')"
      class="h-10 w-72 rounded bg-red text-white lg:w-full"
    >
      {{ $t('go-to-news-feed') }}
    </button>
  </message-container>
</template>
