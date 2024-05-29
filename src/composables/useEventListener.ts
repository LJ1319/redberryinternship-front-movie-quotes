import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: Window = window,
  event: string,
  handler: EventListenerOrEventListenerObject
) {
  onMounted(() => {
    target.addEventListener(event, handler)
  })

  onUnmounted(() => {
    target.addEventListener(event, handler)
  })
}
