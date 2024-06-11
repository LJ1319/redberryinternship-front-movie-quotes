<script setup lang="ts">
import { googleRedirect } from '@/services/api/auth'
import IconGoogle from '@/components/icons/IconGoogle.vue'

defineProps<{
  action: string
}>()

const handleGoogleRedirect = async () => {
  try {
    const { data } = await googleRedirect()
    window.location.replace(data)
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <button
    v-on:click="handleGoogleRedirect"
    type="button"
    class="flex h-10 w-full items-center justify-center gap-2 rounded border border-white capitalize text-white"
  >
    <icon-google />
    {{ $t(action) }} {{ $t('google') }}
  </button>
</template>
