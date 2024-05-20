<script setup lang="ts">
import IconCaretDown from '@/components/icons/IconCaretDown.vue'

const emit = defineEmits<{
  open: [modal: string]
}>()
</script>

<template>
  <header class="w-full bg-dark-mirage px-4 py-6 lg:px-18">
    <div class="flex items-center justify-between">
      <div class="z-50">
        <router-link to="/" class="font-medium uppercase text-gold">movie quotes</router-link>
      </div>

      <div class="z-50 flex gap-4 lg:gap-10">
        <button class="flex items-center gap-2">
          <span class="text-sm text-white lg:text-base">Eng</span>
          <icon-caret-down />
        </button>

        <div class="z-50 flex gap-3 lg:gap-4">
          <button
            v-on:click.stop="emit('open', 'signup')"
            class="flex h-8 min-w-20 items-center justify-center rounded bg-red px-2 text-white lg:h-10 lg:w-28 lg:px-4"
          >
            <!--            Sign Up-->
            რეგისტაცია
          </button>
          <button
            v-on:click.stop="emit('open', 'login')"
            class="flex h-8 min-w-[4.5rem] items-center justify-center rounded border border-white px-2 text-white lg:h-10 lg:w-24 lg:px-4"
          >
            <!--            Log In-->
            შესვლა
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
