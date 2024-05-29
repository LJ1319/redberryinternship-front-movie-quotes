<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/UserStore'
import { SyncLocale } from '@/services/api/auth'
import { getCookie, setCookie } from '@/utils/helpers'

const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()

const localeCookie: string = getCookie('locale')

const syncLocale = async () => {
  try {
    await SyncLocale(locale.value)
    await router.replace({ params: { locale: locale.value } })
  } catch (error) {
    console.error(error)
  }
}

const initLocale = () => {
  syncLocale()
  setCookie('locale', locale.value, 30)
}

if (localeCookie) {
  locale.value = localeCookie
  syncLocale()
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
