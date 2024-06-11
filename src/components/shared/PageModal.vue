<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@/composables/onClickOutside'

import PageBackdrop from '@/components/shared/PageBackdrop.vue'

const emit = defineEmits(['close'])

const modal = ref<HTMLElement | null>(null)
onClickOutside(modal.value, () => emit('close'))

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <page-backdrop>
    <div
      ref="modal"
      v-on:click.stop
      class="flex h-screen w-screen flex-col gap-8 bg-[linear-gradient(187.16deg,_#181623_0.07%,_#191725_51.65%,_#0d0b14_98.75%)] px-9 py-16 lg:h-max lg:w-1/3 lg:rounded-clg lg:bg-mirage-light lg:bg-none lg:px-20"
    >
      <slot />
    </div>
  </page-backdrop>
</template>
