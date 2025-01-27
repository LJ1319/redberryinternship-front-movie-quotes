<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { setLocale } from '@vee-validate/i18n'
import { useMovieStore } from '@/stores/MovieStore'
import { useQuoteStore } from '@/stores/QuoteStore'
import { useNotificationStore } from '@/stores/NotificationStore'
import { onClickOutside } from '@/composables/onClickOutside'

import IconCaret from '@/components/icons/IconCaret.vue'

const route = useRoute()
const { locale, availableLocales } = useI18n()

const movieStore = useMovieStore()
const quoteStore = useQuoteStore()
const notificationStore = useNotificationStore()

const setUserLocale = (currentLocale: string) => {
  locale.value = currentLocale
  setLocale(currentLocale)

  if (route.name !== 'landing') {
    movieStore.loadMovies()
    quoteStore.loadQuotes()
    notificationStore.loadNotifications()
  }
}

const dropdown = ref<HTMLElement | null>(null)
const dropdownIsOpen = ref(false)

const switchDropdown = () => {
  dropdownIsOpen.value = !dropdownIsOpen.value
}

const closeDropdown = () => {
  dropdownIsOpen.value = false
}

onClickOutside(dropdown.value, closeDropdown)
</script>

<template>
  <div class="relative flex items-center justify-center">
    <button v-on:click.stop="switchDropdown" class="flex items-center gap-2">
      <span class="text-sm text-white lg:text-base">
        {{ locale === 'en' ? 'Eng' : 'ქარ' }}
      </span>
      <icon-caret :class="dropdownIsOpen && 'rotate-180'" />
    </button>

    <ul
      ref="dropdown"
      v-if="dropdownIsOpen"
      class="absolute top-10 w-16 rounded border border-mirage-light bg-mirage-medium"
    >
      <li
        v-for="locale in availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        v-on:click="setUserLocale(locale)"
        class="cursor-pointer border-b border-mirage-light px-2 py-1 text-white last-of-type:border-0"
      >
        {{ locale === 'en' ? 'Eng' : 'ქარ' }}
      </li>
    </ul>
  </div>
</template>
