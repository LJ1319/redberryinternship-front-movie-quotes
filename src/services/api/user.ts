import axios from '@/plugins/axios'
import type { ProfileUpdateData } from '@/types'

export const RetrieveAuthUser = async () => {
  return await axios.get('/api/user')
}

export const UpdateUser = async (user: number | undefined, data: ProfileUpdateData) => {
  return await axios.post(`/api/users/${user}`, data, {
    params: {
      _method: 'PATCH'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
