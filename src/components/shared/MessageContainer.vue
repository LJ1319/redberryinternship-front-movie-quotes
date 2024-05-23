<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    v-on:click="emit('close')"
    class="absolute left-0 top-0 flex h-screen w-screen justify-center py-20 lg:static lg:h-full lg:w-full lg:p-0"
  >
    <div v-on:click.stop class="relative h-1/2 w-10/12 lg:h-full">
      <div
        class="h-full w-full -rotate-180 rounded-clg bg-[linear-gradient(112.94deg,_rgba(239,_239,_239,_0.3)_-1.81%,_rgba(239,_239,_239,_0.00514528)_102.5%,_rgba(1,_1,_1,_0.00260417)_102.51%,_rgba(239,_239,_239,_0.05)_102.52%)] opacity-30 backdrop-blur-[25px] backdrop-filter lg:hidden"
      ></div>

      <div
        class="absolute left-0 top-0 flex w-full flex-col items-center justify-center gap-6 py-20 text-center lg:static lg:gap-8 lg:py-0"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
