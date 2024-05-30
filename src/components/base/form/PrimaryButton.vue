<script setup lang="ts">
defineProps<{
  action: string
}>()
</script>

<template>
  <button class="h-10 w-full rounded bg-red capitalize text-white">{{ $t(action) }}</button>
</template>
