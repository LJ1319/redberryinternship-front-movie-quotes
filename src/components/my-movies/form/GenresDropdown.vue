<script setup lang="ts">
import { ref } from 'vue'
import type { Genre } from '@/types'
import { onClickOutside } from '@/composables/onClickOutside'

const dropdown = ref<HTMLElement | null>(null)

defineProps<{
  genres: Array<Genre>
}>()

const emit = defineEmits<{
  close: []
  add: [genre: Genre]
}>()

onClickOutside(dropdown.value, () => emit('close'))
</script>

<template>
  <ul
    ref="dropdown"
    class="absolute left-0 top-14 z-50 w-full rounded bg-mirage-black ring-2 ring-gray-500"
  >
    <li
      v-for="genre in genres"
      v-on:click="emit('add', genre)"
      :key="genre.id"
      class="cursor-pointer border-b border-gray-500 p-4 text-white last-of-type:border-0"
    >
      {{ genre.title }}
    </li>
  </ul>
</template>
