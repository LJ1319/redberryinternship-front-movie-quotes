<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores/UserStore'
import { useNotificationStore } from '@/stores/NotificationStore'

import PageSidebar from '@/components/shared/PageSidebar.vue'
import SearchBar from '@/components/news-feed/SearchBar.vue'
import NotificationsDropdown from '@/components/shared/NotificationsDropdown.vue'
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
const notificationStore = useNotificationStore()

if (userStore.user) {
  notificationStore.loadNotifications()
}

const sidebarIsOpen = ref(false)
const openSidebar = () => {
  sidebarIsOpen.value = true
}

const closeSidebar = () => {
  sidebarIsOpen.value = false
}

watch(route, closeSidebar)

const searchBarIsOpen = ref(false)
const openSearchBar = () => {
  searchBarIsOpen.value = true
}

const closeSearchBar = () => {
  searchBarIsOpen.value = false
}

const notificationsDropdownIsOpen = ref(false)
const switchNotificationsDropdown = () => {
  notificationsDropdownIsOpen.value = !notificationsDropdownIsOpen.value
}

const closeNotificationsDropdown = () => {
  notificationsDropdownIsOpen.value = false
}
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
    :class="route.name !== 'landing' && 'sticky left-0 top-0 z-40'"
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

    <div :class="!userStore.user && 'z-40'" class="flex items-center justify-end gap-4 lg:gap-8">
      <button v-if="route.name === 'news-feed'" v-on:click="openSearchBar" class="lg:hidden">
        <icon-search />
      </button>

      <search-bar v-if="searchBarIsOpen" v-on:close="closeSearchBar" />

      <button v-if="userStore.user" v-on:click.stop="switchNotificationsDropdown" class="relative">
        <icon-bell class="lg:h-8 lg:w-8" />
        <span
          class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white lg:-right-2 lg:-top-2 lg:h-6 lg:w-6 lg:text-base"
        >
          {{ notificationStore.unreadNotificationsCount }}
        </span>
      </button>

      <notifications-dropdown
        v-if="notificationsDropdownIsOpen"
        v-on:close="closeNotificationsDropdown"
      />

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
