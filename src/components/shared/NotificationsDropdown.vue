<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useNotificationStore } from '@/stores/NotificationStore'
import { markNotificationsAsRead } from '@/services/api/notifications'
import { onClickOutside } from '@/composables/onClickOutside'

import IconUser from '@/components/icons/IconUser.vue'
import IconQuote from '@/components/icons/IconQuote.vue'
import IconHeartFill from '@/components/icons/IconHeartFill.vue'
import FormModal from '@/components/shared/FormModal.vue'
import ViewQuoteForm from '@/components/shared/ViewQuoteForm.vue'

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})

const emit = defineEmits(['close'])

const dropdown = ref<HTMLElement | null>(null)
onClickOutside(dropdown.value, () => emit('close'))

const notificationStore = useNotificationStore()
notificationStore.loadNotifications()

const onSubmit = async () => {
  try {
    await markNotificationsAsRead()
    await notificationStore.loadNotifications()
  } catch (error: any) {
    console.error(error)
  }
}

const viewModalIsOpen = ref(false)
const quoteId = ref(0)

const openViewModal = (id: number) => {
  viewModalIsOpen.value = true
  quoteId.value = id
}

const closeViewModal = () => {
  viewModalIsOpen.value = false
}
</script>

<template>
  <div
    ref="dropdown"
    v-on:click.stop
    class="absolute left-0 top-20 z-50 flex h-screen w-full flex-col gap-8 overflow-scroll bg-black p-9 lg:left-auto lg:top-24 lg:h-[50rem] lg:w-[60rem] lg:rounded-xl"
  >
    <div class="flex items-center justify-between gap-2">
      <h2 class="text-xl text-white lg:text-[2rem]">{{ $t('notifications') }}</h2>

      <form v-if="notificationStore.unreadNotificationsCount !== 0" v-on:submit.prevent="onSubmit">
        <button class="text-sm text-white underline lg:text-xl">
          {{ $t('mark-read') }}
        </button>
      </form>
    </div>

    <ul v-if="notificationStore.notificationList.length" class="flex w-full flex-col gap-2">
      <li
        v-for="notification in notificationStore.notificationList"
        :key="notification.id"
        v-on:click="openViewModal(+notification.quote_id)"
        class="flex min-h-32 w-full cursor-pointer gap-4 rounded border border-zinc-600 p-4 text-white lg:items-center"
      >
        <div class="flex flex-col items-center gap-2">
          <div
            :class="!notification.read_at ? 'ring ring-green-700' : ''"
            class="flex h-16 w-16 shrink-0 gap-4 rounded-full lg:h-20 lg:w-20"
          >
            <img
              v-if="notification.user_avatar"
              :src="notification.user_avatar"
              alt="User Avatar"
              class="h-full w-full"
            />

            <icon-user v-if="!notification.user_avatar" class="h-full w-full" />
          </div>

          <span v-if="!notification.read_at" class="text-green-700 lg:hidden">{{ $t('new') }}</span>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <p class="text-xl text-white lg:text-xl">{{ notification.username }}</p>

            <p class="flex items-center gap-4 text-gray-300 lg:text-xl">
              <icon-quote v-if="notification.interaction === 'comment'" class="h-6 w-6 shrink-0" />
              <icon-heart-fill
                v-if="notification.interaction === 'like'"
                class="h-6 w-6 shrink-0"
              />
              {{ notification.interaction === 'like' ? $t('quote-liked') : $t('quote-commented') }}
            </p>
          </div>

          <p class="text-zinc-300 lg:hidden">{{ notification.interacted_at }}</p>
        </div>

        <div class="ml-auto hidden flex-col gap-1 lg:flex">
          <p class="text-xl text-zinc-300">{{ notification.interacted_at }}</p>
          <span v-if="!notification.read_at" class="text-xl text-green-700">{{ $t('new') }}</span>
        </div>
      </li>
    </ul>
  </div>

  <form-modal v-if="viewModalIsOpen" v-on:click.self="closeViewModal">
    <view-quote-form :id="quoteId" v-on:close="closeViewModal" />
  </form-modal>
</template>
