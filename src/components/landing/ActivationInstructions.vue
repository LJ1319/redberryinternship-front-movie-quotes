<script setup lang="ts">
import MessageContainer from '@/components/shared/MessageContainer.vue'
import IconMailSent from '@/components/icons/IconMailSent.vue'

defineProps<{
  email: string
}>()
</script>

<template>
  <message-container>
    <div class="flex flex-col items-center justify-center gap-4">
      <icon-mail-sent />
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">{{ $t('thanks') }}!</h1>
    </div>

    <p class="text-white">
      {{ $t('activation-instructions') }}
    </p>
    <a
      :href="`https://www.${email ?? 'gmail.com'}`"
      target="_blank"
      class="flex h-10 w-72 items-center justify-center rounded bg-red capitalize text-white lg:w-full"
    >
      {{ $t('go-to-mail') }}
    </a>
  </message-container>
</template>
