<script setup lang="ts">
import MessageContainer from '@/components/shared/MessageContainer.vue'
import IconTimeExpired from '@/components/icons/IconTimeExpired.vue'
import { ResendVerification } from '@/services/api/auth'

const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  switch: [content: string]
}>()

const onSubmit = async () => {
  try {
    await ResendVerification({ email: props.email })
    emit('switch', 'activation-instructions')
  } catch (error: any) {
    console.log(error)
  }
}
</script>

<template>
  <message-container>
    <div class="flex flex-col items-center justify-center gap-4">
      <icon-time-expired />
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Link expired?</h1>
    </div>

    <p class="text-white">Verification link expired due to inactivity</p>

    <form v-on:submit.prevent="onSubmit" class="w-full">
      <button class="h-10 w-72 rounded bg-red text-white lg:w-full">Request another link</button>
    </form>
  </message-container>
</template>
