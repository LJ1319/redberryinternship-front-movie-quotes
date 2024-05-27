<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { setCookie } from '@/utils/helpers'

const userStore = useUserStore()

userStore.$subscribe((mutation, state) => {
  setCookie('user', JSON.stringify(state.user), 30)
})
</script>

<template>
  <router-view />
</template>
