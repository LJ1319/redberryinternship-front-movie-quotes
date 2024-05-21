<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const i18nLocale = useI18n()
// console.log(i18nLocale.locale.value)
</script>

<template>
  <router-view />
</template>
