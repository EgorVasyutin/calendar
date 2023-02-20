import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import axiosInstance from '@/axiosInstance'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: async () => import('@/pages/IndexPage.vue'),
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: async () => import('@/pages/UserAuthorization.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: async () => import('@/pages/UserLogin.vue'),
    },
  ],
})
import useAuth from '@/composables/useAuth'
const auth = useAuth()

const checkIsLoggedIn = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('refresh')
    localStorage.setItem('accessToken', response.data.accessToken)
    auth.userId = response.data.user.id

    return true
  } catch (e) {
    if (e.response.status === 401) {
      return false
    }
  }
}

router.beforeEach(async (to: RouteLocationNormalized, from) => {
  if (to.meta.requiredAuth) {
    const isLoggedIn = await checkIsLoggedIn()

    if (isLoggedIn) {
      // next()
    } else {
      router.push('/login')
    }
  }

  // explicitly return false to cancel the navigation
  // return false
})

export default router
