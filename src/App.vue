<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'

import { useUserStore } from '@/stores/UserStore'
import { useMovieStore } from '@/stores/MovieStore'
import { getCookie, setCookie } from '@/utils/helpers'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const userStore = useUserStore()
const movieStore = useMovieStore()
const localeCookie: string = getCookie('locale')

const initLocale = () => {
  setLocale(locale.value)
  setCookie('locale', locale.value, 30)
  document.documentElement.lang = locale.value

  router.replace({ params: { locale: locale.value }, query: { ...route.query } })
}

if (localeCookie) {
  locale.value = localeCookie
  setLocale(locale.value)
  document.documentElement.lang = locale.value
} else {
  initLocale()
}

const syncData = () => {
  switch (route.name) {
    case 'my-movies':
      movieStore.loadMovies()
      break
    case 'single-movie':
      movieStore.loadMovie(route.params.id.toString())
      break
  }
}

watch(locale, () => {
  initLocale()
  syncData()
})

userStore.$subscribe((mutation, state) => {
  setCookie('user', JSON.stringify(state.user), 30)
})
</script>

<template>
  <router-view />
</template>
