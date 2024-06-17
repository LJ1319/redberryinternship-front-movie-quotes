<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@/composables/onClickOutside'

import IconCheckFill from '@/components/icons/IconCheckFill.vue'
import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits(['close'])

const alert = ref<HTMLElement | null>(null)
onClickOutside(alert.value, () => emit('close'))
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-screen w-screen bg-mirage-medium/70 px-4 lg:hidden">
    <div
      ref="alert"
      v-on:click.stop
      class="my-40 flex h-16 w-full items-center justify-between rounded bg-[#D1E7DD] px-5"
    >
      <div class="flex items-center gap-2">
        <icon-check-fill class="h-7 w-8" />
        <p class="text-[#0F5132]">{{ $t('updated-changes') }}</p>
      </div>

      <button v-on:click="emit('close')">
        <icon-close color="gray" />
      </button>
    </div>
  </div>
</template>
