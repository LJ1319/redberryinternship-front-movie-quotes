import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Notification } from '@/types'
import { getNotifications } from '@/services/api/notifications'

export const useNotificationStore = defineStore('notification', () => {
  const notificationList = ref<Array<Notification>>([])
  const unreadNotificationsCount = computed(() => {
    return notificationList.value.filter((notification) => notification.read_at === null).length
  })

  const loadNotifications = async () => {
    try {
      const { data } = await getNotifications()
      notificationList.value = data
    } catch (error: any) {
      console.error(error)
    }
  }

  const updateNotifications = (notification: Notification) => {
    notificationList.value.push(notification)
  }

  const reset = () => {
    notificationList.value = []
  }

  return {
    notificationList,
    unreadNotificationsCount,
    loadNotifications,
    updateNotifications,
    reset
  }
})
