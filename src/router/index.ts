import { createRouter, createWebHistory } from 'vue-router'
import { defaultLocale } from '@/plugins/i18n'
import { useUserStore } from '@/stores/UserStore'
import { getCookie } from '@/utils/helpers'

const locale = getCookie('locale')
let currentLocale = defaultLocale
if (locale) {
  currentLocale = locale
}

const LandingPage = () => import('@/pages/LandingPage.vue')
const MainLayout = () => import('@/layouts/MainLayout.vue')
const ProfilePage = () => import('@/pages/ProfilePage.vue')
const NewsFeedPage = () => import('@/pages/NewsFeedPage.vue')
const MyMoviesPage = () => import('@/pages/MyMoviesPage.vue')
const SingleMoviePage = () => import('@/pages/SingleMoviePage.vue')

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
          path: '',
          component: MainLayout,
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: ProfilePage
            },
            {
              path: 'news-feed',
              name: 'news-feed',
              component: NewsFeedPage
            },
            {
              path: 'my-movies',
              name: 'my-movies',
              component: MyMoviesPage
            },
            {
              path: 'my-movies/:id',
              name: 'single-movie',
              component: SingleMoviePage,
              props: true
            }
          ],
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
