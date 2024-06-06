<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/UserStore'
import { Logout } from '@/services/api/auth'

import IconBurger from '@/components/icons/IconBurger.vue'
import PageSidebar from '@/components/shared/PageSidebar.vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import IconBell from '@/components/icons/IconBell.vue'

const emit = defineEmits<{
  open: [content: string]
}>()

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const userStore = useUserStore()
const isAuth = ref(userStore.user)

const handleLogout = async () => {
  try {
    await Logout()
    userStore.user = null
    await router.push({ name: 'landing', params: { locale: locale.value } })
  } catch (error) {
    console.error(error)
  }
}

const sidebarIsOpen = ref(false)
const openSidebar = () => {
  sidebarIsOpen.value = true
}

const closeSidebar = () => {
  sidebarIsOpen.value = false
}

watch(route, closeSidebar)
</script>

<template>
  <div
    v-if="sidebarIsOpen"
    v-on:click="closeSidebar"
    class="fixed left-0 top-0 z-50 h-screen w-screen bg-transparent backdrop-blur"
  >
    <page-sidebar v-on:click.stop class="bg-mirage-dark" />
  </div>

  <header class="w-full bg-mirage px-4 py-6 lg:px-18">
    <div class="flex items-center justify-between">
      <div :class="!isAuth && 'z-50'" class="flex shrink-0 gap-4">
        <button v-if="isAuth" v-on:click.stop="openSidebar" class="lg:hidden">
          <icon-burger />
        </button>

        <router-link :to="`/${locale}`" class="font-medium uppercase text-gold">
          movie quotes
        </router-link>
      </div>

      <div :class="!isAuth && 'z-50'" class="flex w-full justify-end gap-4 lg:gap-10">
        <language-switcher />

        <div v-if="!isAuth" class="flex gap-3 lg:gap-4">
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

        <button v-if="isAuth">
          <icon-bell />
        </button>

        <button
          v-if="isAuth"
          v-on:click="handleLogout"
          class="flex h-8 min-w-[4.5rem] items-center justify-center rounded border border-white px-2 capitalize text-white lg:h-10 lg:w-24 lg:px-4"
        >
          {{ $t('logout') }}
        </button>
      </div>
    </div>
  </header>
</template>
