<script setup lang="ts">
import PageSidebar from '@/components/shared/PageSidebar.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
</script>

<template>
  <div
    style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
    class="flex min-h-screen w-screen flex-col"
  >
    <page-header />

    <div class="mt-20 flex h-full w-full flex-1 flex-col justify-end lg:mt-24 lg:flex-row">
      <page-sidebar class="hidden lg:block" />

      <main class="flex h-full w-full flex-1 flex-col">
        <router-view />
      </main>
    </div>
  </div>
</template>
