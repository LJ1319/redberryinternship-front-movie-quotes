import axios from '@/plugins/axios'
import type { UpdateProfileValues } from '@/types'

export const retrieveAuthUser = async () => {
  return await axios.get('/api/user')
}

export const updateUser = async (user: number | undefined, data: UpdateProfileValues) => {
  return await axios.post(`/api/users/${user}`, data, {
    params: {
      _method: 'PATCH'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
