import axios from '@/plugins/axios'
import type { ProfileUpdateData } from '@/types'

export const RetrieveAuthUser = async () => {
  return await axios.get('/api/user')
}

export const UpdateUser = async (user: number | undefined, data: ProfileUpdateData) => {
  return await axios.patch(`/api/users/${user}`, data)
}
