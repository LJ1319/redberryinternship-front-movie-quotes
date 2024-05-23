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
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Thank you!</h1>
    </div>

    <p class="text-white">
      Please check your email and follow the instructions to activate your account.
    </p>
    <a
      :href="`https://www.${email ?? 'gmail.com'}`"
      target="_blank"
      class="flex h-10 w-72 items-center justify-center rounded bg-red text-white lg:w-full"
    >
      Go to my email
    </a>
  </message-container>
</template>
