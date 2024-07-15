import axios from '@/plugins/axios'

export const getNotifications = async () => {
  return await axios.get('/api/notifications')
}

export const markNotificationsAsRead = async () => {
  return await axios.post('/api/notifications', null, {
    params: {
      _method: 'PATCH'
    }
  })
}
