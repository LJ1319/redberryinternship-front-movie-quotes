import { useEventListener } from '@/composables/useEventListener'

export function onClickOutside(targetElement: HTMLElement | null, callback: Function) {
  const handleClickOutside = (event: Event) => {
    if (!targetElement?.contains(event.target as Node)) {
      callback()
    }
  }

  useEventListener(window, 'click', handleClickOutside)
}
