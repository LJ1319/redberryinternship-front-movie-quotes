<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'

defineProps<{
  action: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div class="flex items-center justify-between border-b border-zinc-600 p-9">
    <slot />

    <h1 class="flex-1 text-center text-xl font-medium capitalize text-white lg:text-2xl">
      {{ $t(action) }}
    </h1>

    <button v-on:click="emit('close')" class="shrink-0">
      <icon-close color="white" />
    </button>
  </div>
</template>
