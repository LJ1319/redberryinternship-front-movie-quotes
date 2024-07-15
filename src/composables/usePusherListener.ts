import Pusher from 'pusher-js'
import type { Notification } from '@/types'

export const usePusherListener = (channelName: string, eventName: string, callback: Function) => {
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: 'eu'
  })

  const channel = pusher.subscribe(channelName)
  channel.bind(eventName, (data: Notification) => callback(data))
}
