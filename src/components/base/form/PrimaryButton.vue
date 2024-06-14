<script setup lang="ts">
defineProps<{
  action: string
}>()
</script>

<template>
  <button class="rounded bg-red text-white">{{ $t(action) }}</button>
</template>
