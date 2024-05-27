import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

import LandingPage from '@/pages/LandingPage.vue'
import NewsFeedPage from '@/pages/NewsFeedPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/news-feed',
      name: 'news-feed',
      component: NewsFeedPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.user) {
    return {
      name: 'landing'
    }
  }

  if (!to.meta.requiresAuth && userStore.user) {
    return {
      name: 'news-feed'
    }
  }
})

export default router
