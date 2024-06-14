<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores/UserStore'
import { useMovieStore } from '@/stores/MovieStore'
import { logout } from '@/services/api/auth'

const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()
const movieStore = useMovieStore()

const handleLogout = async () => {
  try {
    await logout()

    userStore.reset()
    movieStore.reset()

    await router.push({ name: 'landing', params: { locale: locale.value } })
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <button
    v-if="userStore.user"
    v-on:click="handleLogout"
    class="h-8 min-w-[4.5rem] rounded border border-white px-2 text-white lg:h-10 lg:w-24 lg:px-4"
  >
    {{ $t('logout') }}
  </button>
</template>
