import { defineStore } from 'pinia'
import type { User } from '@/types'
import { getCookie } from '@/utils/helpers'

type StateShape = {
  user: User | null
}

let localUser: null | User = null
const cookie: string = getCookie('user')

if (cookie) {
  localUser = JSON.parse(cookie)
}

export const useUserStore = defineStore('user', {
  state: (): StateShape => {
    return {
      user: localUser
    }
  }
})
