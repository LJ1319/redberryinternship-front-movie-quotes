<script setup lang="ts">
defineProps<{
  action: string
}>()
</script>

<template>
  <button class="rounded bg-red capitalize text-white">{{ $t(action) }}</button>
</template>
