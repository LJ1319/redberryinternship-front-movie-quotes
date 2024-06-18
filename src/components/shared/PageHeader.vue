<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/UserStore'

import PageSidebar from '@/components/shared/PageSidebar.vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import LogoutButton from '@/components/base/buttons/LogoutButton.vue'

import IconBurger from '@/components/icons/IconBurger.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconBell from '@/components/icons/IconBell.vue'

const emit = defineEmits<{
  open: [content: string]
}>()

const route = useRoute()
const { locale } = useI18n()
const userStore = useUserStore()

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
    class="fixed left-0 top-0 z-50 h-screen w-screen bg-mirage-medium/70"
  >
    <page-sidebar v-on:click.stop class="h-full bg-mirage-dark" />
  </div>

  <header
    :class="route.name !== 'landing' && 'fixed left-0 top-0 z-40'"
    class="flex min-h-20 w-full items-center justify-between bg-mirage px-9 py-6 lg:px-18"
  >
    <div :class="!userStore.user && 'z-40'" class="flex gap-4">
      <button v-if="userStore.user" v-on:click.stop="openSidebar" class="lg:hidden">
        <icon-burger />
      </button>

      <router-link :to="`/${locale}`" class="font-medium uppercase text-gold">
        movie quotes
      </router-link>
    </div>

    <div :class="!userStore.user && 'z-40'" class="flex items-center justify-end gap-4">
      <button v-if="route.name === 'news-feed'" class="lg:hidden">
        <icon-search />
      </button>

      <button v-if="userStore.user">
        <icon-bell />
      </button>

      <language-switcher />

      <div v-if="!userStore.user" class="flex gap-3 lg:gap-4">
        <button
          v-on:click.stop="emit('open', 'signup')"
          class="flex h-8 min-w-20 items-center justify-center rounded bg-red px-2 text-white lg:h-10 lg:min-w-28 lg:px-4"
        >
          {{ $t('signup') }}
        </button>

        <button
          v-on:click.stop="emit('open', 'login')"
          class="flex h-8 min-w-[4.5rem] items-center justify-center rounded border border-white px-2 text-white lg:h-10 lg:w-24 lg:px-4"
        >
          {{ $t('login') }}
        </button>
      </div>

      <logout-button class="hidden lg:block" />
    </div>
  </header>
</template>
