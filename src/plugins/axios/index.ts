import axios from 'axios'
import router from '@/router'
import { defaultLocale } from '@/plugins/i18n'

import { useUserStore } from '@/stores/UserStore'
import { useMovieStore } from '@/stores/MovieStore'
import { useNotificationStore } from '@/stores/NotificationStore'
import { useQuoteStore } from '@/stores/QuoteStore'

import { initializeCSRFProtection } from '@/services/api/auth'
import { getCookie, setCookie } from '@/utils/helpers'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json'
  }
})

instance.interceptors.request.use(
  async function (config) {
    const locale: string = getCookie('locale') ?? defaultLocale

    if (config.url?.includes('api') && !config.url?.includes(`api/${locale}`)) {
      config.url = config.url.replace('api', `api/${locale}`)
    }

    if (config.method === 'post') {
      await initializeCSRFProtection()
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (config) {
    return config
  },
  async function (error) {
    const status = error.response.status
    const locale: string = getCookie('locale') ?? defaultLocale

    const userStore = useUserStore()
    const quoteStore = useQuoteStore()
    const movieStore = useMovieStore()
    const notificationStore = useNotificationStore()

    if (status === 401) {
      setCookie('user', null, 30)

      userStore.reset()
      movieStore.reset()
      quoteStore.reset()
      notificationStore.reset()

      await router.push({ name: 'landing', params: { locale: locale } })
    }

    if (status === 403 || status === 404 || status === 500) {
      await router.push({ name: 'error', params: { locale: locale }, query: { status: status } })
    }

    return Promise.reject(error)
  }
)

export default instance
