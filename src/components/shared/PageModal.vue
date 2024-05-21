<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import PageBackdrop from '@/components/shared/PageBackdrop.vue'
import IconClose from '@/components/icons/IconClose.vue'

const modal = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['close'])

onMounted(() => {
  document.body.classList.add('overflow-hidden')

  window.addEventListener('click', (evt) => {
    if (!modal.value?.contains(evt.target as Node)) {
      emit('close')
    }
  })
})

onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <page-backdrop>
    <div
      ref="modal"
      class="lg:rounded-clg flex h-screen w-screen flex-col gap-8 bg-[linear-gradient(187.16deg,_#181623_0.07%,_#191725_51.65%,_#0d0b14_98.75%)] px-6 py-16 lg:h-max lg:w-1/3 lg:bg-light-mirage lg:bg-none lg:px-32 lg:py-14"
    >
      <div class="flex justify-end lg:hidden">
        <button v-on:click="emit('close')">
          <icon-close />
        </button>
      </div>

      <slot />
    </div>
  </page-backdrop>
</template>
