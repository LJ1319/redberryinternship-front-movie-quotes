<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { setLocale } from '@vee-validate/i18n'
import { useUserStore } from '@/stores/UserStore'
import { getCookie, setCookie } from '@/utils/helpers'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const userStore = useUserStore()
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

watch(locale, () => {
  initLocale()
})

userStore.$subscribe((mutation, state) => {
  setCookie('user', JSON.stringify(state.user), 30)
})
</script>

<template>
  <router-view />
</template>
