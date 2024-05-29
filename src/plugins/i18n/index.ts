import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ge from '@/locales/ge.json'

export const defaultLocale = 'en'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: 'ge',
  messages: {
    en,
    ge
  }
})

export default i18n
