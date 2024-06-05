<script setup lang="ts">
const emit = defineEmits(['cancel', 'switch'])
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm lg:hidden"></div>

  <div
    class="absolute left-0 top-0 z-50 flex h-full w-full flex-col gap-8 rounded-t-xl bg-mirage-dark lg:static lg:z-0 lg:block lg:bg-transparent"
  >
    <div
      class="flex flex-col gap-4 rounded-xl bg-mirage px-8 py-16 lg:rounded-none lg:bg-transparent lg:p-0"
    >
      <slot />
    </div>

    <div class="flex w-full items-center justify-between px-8 lg:hidden">
      <button v-on:click="emit('cancel')" type="button" class="capitalize text-white">
        {{ $t('cancel') }}
      </button>

      <button
        v-on:click="emit('switch')"
        type="button"
        class="h-12 rounded bg-red px-4 capitalize text-white"
      >
        {{ $t('edit') }}
      </button>
    </div>
  </div>
</template>
