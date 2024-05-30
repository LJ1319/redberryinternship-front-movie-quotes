<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import { onClickOutside } from '@/composables/onClickOutside'

import IconCaretDown from '@/components/icons/IconCaretDown.vue'

const dropdown = ref<HTMLElement | null>(null)
const dropdownIsOpen = ref(false)
const { locale, availableLocales } = useI18n()

const openDropdown = () => {
  dropdownIsOpen.value = true
}

const closeDropdown = () => {
  dropdownIsOpen.value = false
}

onClickOutside(dropdown.value, closeDropdown)

const setUserLocale = (currentLocale: string) => {
  locale.value = currentLocale
  setLocale(currentLocale)
  closeDropdown()
}
</script>

<template>
  <div class="relative flex items-center justify-center">
    <button v-on:click.stop="openDropdown" class="flex items-center gap-2">
      <span class="text-sm text-white lg:text-base">
        {{ locale === 'en' ? 'Eng' : 'ქარ' }}
      </span>
      <icon-caret-down />
    </button>

    <ul
      v-if="dropdownIsOpen"
      ref="dropdown"
      class="absolute top-10 w-16 rounded border border-light-mirage bg-dark-mirage"
    >
      <li
        v-for="locale in availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        v-on:click="setUserLocale(locale)"
        class="cursor-pointer border-b border-light-mirage p-1 text-white last-of-type:border-0"
      >
        {{ locale === 'en' ? 'Eng' : 'ქარ' }}
      </li>
    </ul>
  </div>
</template>
