import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import { getCookie } from '@/utils/helpers'

export const useUserStore = defineStore('user', () => {
  const localeUser = ref<null | User>(null)
  const userCookie: string = getCookie('user')

  if (userCookie) {
    localeUser.value = JSON.parse(userCookie)
  }

  const user = ref<User | null>(localeUser.value)

  const reset = () => (user.value = null)

  return { user, reset }
})
