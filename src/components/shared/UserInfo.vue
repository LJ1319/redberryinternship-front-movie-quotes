<script setup lang="ts">
import IconUser from '@/components/icons/IconUser.vue'

defineProps<{
  avatar?: string
  username?: string
}>()
</script>

<template>
  <div class="flex w-max items-center justify-center gap-4">
    <div class="h-10 w-10 lg:h-16 lg:w-16">
      <img v-if="avatar" :src="avatar" alt="User Avatar" class="h-full w-full rounded-full" />
      <icon-user v-if="!avatar" class="h-full w-full rounded-full" />
    </div>

    <p class="text-white">{{ username }}</p>
  </div>
</template>
