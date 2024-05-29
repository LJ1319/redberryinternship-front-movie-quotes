import { createRouter, createWebHistory } from 'vue-router'
import { defaultLocale } from '@/plugins/i18n'
import { useUserStore } from '@/stores/UserStore'
import { getCookie } from '@/utils/helpers'

const locale = getCookie('locale')

let currentLocale = defaultLocale
if (locale) {
  currentLocale = locale
}

import LandingPage from '@/pages/LandingPage.vue'
import NewsFeedPage from '@/pages/NewsFeedPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      redirect: `/${currentLocale}`
    },
    {
      path: '/:locale',
      children: [
        {
          path: '',
          name: 'landing',
          component: LandingPage,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'news-feed',
          name: 'news-feed',
          component: NewsFeedPage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.user) {
    return {
      name: 'landing',
      params: { locale: locale }
    }
  }

  if (!to.meta.requiresAuth && userStore.user) {
    return {
      name: 'news-feed',
      params: { locale: locale }
    }
  }
})

export default router
