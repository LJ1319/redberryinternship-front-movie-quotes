<script setup lang="ts">
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-screen w-screen backdrop-blur-sm lg:hidden">
    <div
      style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
      class="my-20 flex h-full w-full justify-center px-6 py-16"
    >
      <div class="h-52 w-full rounded-xl bg-mirage">
        <div
          class="flex h-2/3 w-full items-center justify-center border-b border-gray-300 border-opacity-20"
        >
          <p class="px-8 text-white">
            {{ $t('make-sure') }}
          </p>
        </div>

        <div class="flex h-1/3 w-full items-center justify-between px-8 lg:hidden">
          <button v-on:click="emit('close')" type="button" class="capitalize text-white">
            {{ $t('cancel') }}
          </button>

          <primary-button action="confirm" class="h-10 px-2" />
        </div>
      </div>
    </div>
  </div>
</template>
