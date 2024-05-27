import axios from 'axios'
import router from '@/router'

import { useUserStore } from '@/stores/UserStore'
import { InitializeCSRFProtection } from '@/services/api/auth'
import { setCookie } from '@/utils/helpers'

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
    if (config.method === 'post') {
      await InitializeCSRFProtection()
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
    const userStore = useUserStore()

    if (status === 401) {
      setCookie('user', JSON.stringify({ user: null }), 30)
      userStore.user = null
      await router.replace({ name: 'landing' })
    }

    if (status === 403 || status === 404 || status === 500) {
      await router.replace({ name: 'error', query: { status: status } })
    }

    return Promise.reject(error)
  }
)

export default instance
