<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { setLocale } from '@vee-validate/i18n'
import { useUserStore } from '@/stores/UserStore'
import { useNotificationStore } from '@/stores/NotificationStore'
import { usePusherListener } from '@/composables/usePusherListener'
import { getCookie, setCookie } from '@/utils/helpers'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const localeCookie: string = getCookie('locale')
const userStore = useUserStore()
const notificationStore = useNotificationStore()

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

if (userStore.user) {
  usePusherListener(
    `quote-interactions.${userStore.user.id}`,
    'quote.interacted',
    notificationStore.updateNotifications
  )
}
</script>

<template>
  <router-view />
</template>
