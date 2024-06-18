<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-full w-screen overflow-auto bg-mirage-medium/70 lg:py-32">
    <slot />
  </div>
</template>
