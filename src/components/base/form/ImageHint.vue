<script setup lang="ts">
import IconCamera from '@/components/icons/IconCamera.vue'

defineProps<{
  selectedImage: boolean
}>()
</script>

<template>
  <span v-if="!selectedImage" class="flex flex-col items-center gap-2 lg:flex-row">
    <icon-camera />
    {{ $t('dad-image') }}
  </span>

  <span v-if="!selectedImage" class="shrink-0">
    {{ $t('or') }}
  </span>

  <span :class="selectedImage && 'flex w-full flex-col items-center gap-4'">
    <span v-if="selectedImage" class="text-xs font-bold uppercase text-gold lg:text-base">
      {{ $t('replace-image') }}
    </span>

    <span v-if="selectedImage" class="hidden flex-col items-center gap-2 lg:flex lg:flex-row">
      <icon-camera />
      {{ $t('dad-image') }} {{ $t('or') }}
    </span>

    <span
      :class="selectedImage && 'text-sm'"
      class="flex min-h-10 shrink-0 items-center rounded-[2px] bg-purple/40 px-4 text-center lg:text-lg"
    >
      {{ $t('choose-file') }}
    </span>
  </span>
</template>
