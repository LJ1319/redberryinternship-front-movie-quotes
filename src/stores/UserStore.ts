import { defineStore } from 'pinia'
import type { User } from '@/types'
import { getCookie } from '@/utils/helpers'

type StateShape = {
  user: User | null
}

let localUser: null | User = null
const userCookie: string = getCookie('user')

if (userCookie) {
  localUser = JSON.parse(userCookie)
}

export const useUserStore = defineStore('user', {
  state: (): StateShape => {
    return {
      user: localUser
    }
  }
})
