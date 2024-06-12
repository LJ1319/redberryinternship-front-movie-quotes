import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ka from '@/locales/ka.json'

export const defaultLocale = 'en'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: 'ka',
  messages: {
    en,
    ka
  }
})

export default i18n
