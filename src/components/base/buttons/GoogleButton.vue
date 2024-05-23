<script setup lang="ts">
import IconGoogle from '@/components/icons/IconGoogle.vue'

defineProps<{
  action: string
}>()
</script>

<template>
  <button
    type="button"
    class="flex h-10 w-full items-center justify-center gap-2 rounded border border-white text-white"
  >
    <icon-google />
    {{ action }} with google
  </button>
</template>
