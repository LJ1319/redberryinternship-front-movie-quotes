<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/UserStore'
import { Logout } from '@/services/api/auth'

import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'

const emit = defineEmits<{
  open: [content: string]
}>()

const router = useRouter()
const userStore = useUserStore()
const { locale } = useI18n()

const handleLogOut = async () => {
  try {
    await Logout()
    userStore.user = null
    await router.push({ name: 'landing', params: { locale: locale.value } })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <header class="w-full bg-dark-mirage px-4 py-6 lg:px-18">
    <div class="flex items-center justify-between">
      <div class="z-50">
        <router-link :to="`/${locale}`" class="font-medium uppercase text-gold">
          movie quotes
        </router-link>
      </div>

      <div class="z-50 flex gap-4 lg:gap-10">
        <language-switcher />

        <div v-if="!userStore.user" class="z-50 flex gap-3 lg:gap-4">
          <button
            v-on:click.stop="emit('open', 'signup')"
            class="flex h-8 min-w-20 items-center justify-center rounded bg-red px-2 capitalize text-white lg:h-10 lg:min-w-28 lg:px-4"
          >
            {{ $t('signup') }}
          </button>
          <button
            v-on:click.stop="emit('open', 'login')"
            class="flex h-8 min-w-[4.5rem] items-center justify-center rounded border border-white px-2 capitalize text-white lg:h-10 lg:w-24 lg:px-4"
          >
            {{ $t('login') }}
          </button>
        </div>

        <button
          v-if="userStore.user"
          v-on:click="handleLogOut"
          class="flex h-8 min-w-[4.5rem] items-center justify-center rounded border border-white px-2 capitalize text-white lg:h-10 lg:w-24 lg:px-4"
        >
          {{ $t('logout') }}
        </button>
      </div>
    </div>
  </header>
</template>
