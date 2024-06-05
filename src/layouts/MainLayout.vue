<script setup lang="ts">
import PageSidebar from '@/components/shared/PageSidebar.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
</script>

<template>
  <div
    style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
    class="flex h-screen flex-col justify-between lg:h-auto"
  >
    <page-header />

    <div class="flex h-screen w-screen lg:h-auto">
      <page-sidebar class="hidden lg:block" />

      <main class="w-screen lg:min-h-screen">
        <router-view />
      </main>
    </div>
  </div>
</template>
