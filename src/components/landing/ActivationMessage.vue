<script setup lang="ts">
import MessageContainer from '@/components/shared/MessageContainer.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
</script>

<template>
  <message-container>
    <div class="flex flex-col items-center justify-center gap-4">
      <icon-check />
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Thank you!</h1>
    </div>

    <p class="text-white">Your account has been activated.</p>
    <router-link
      to="feed"
      class="flex h-10 w-72 items-center justify-center rounded bg-red text-white lg:w-full"
    >
      Go to news feed
    </router-link>
  </message-container>
</template>
