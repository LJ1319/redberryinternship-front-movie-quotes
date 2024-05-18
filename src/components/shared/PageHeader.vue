<script setup lang="ts">
import IconCaretDown from '@/components/icons/IconCaretDown.vue'
</script>

<template>
  <header class="w-full px-4 py-6 lg:px-18">
    <div class="flex items-center justify-between">
      <div class="z-50">
        <router-link to="/" class="font-helvetica-neue font-medium uppercase text-gold">
          movie quotes
        </router-link>
      </div>

      <div class="z-50 flex gap-4 lg:gap-10">
        <button class="flex items-center gap-2">
          <span class="font-helvetica-neue text-sm text-white lg:text-base">Eng</span>
          <icon-caret-down />
        </button>

        <div class="z-50 flex gap-3 lg:gap-4">
          <button
            class="bg-red flex h-8 w-20 items-center justify-center rounded font-helvetica-neue text-white lg:h-10 lg:w-28"
          >
            Sign Up
          </button>
          <button
            class="flex h-8 w-[4.5rem] items-center justify-center rounded border border-white font-helvetica-neue text-white lg:h-10 lg:w-24"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
