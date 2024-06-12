<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

import LogoutButton from '@/components/base/buttons/LogoutButton.vue'

import IconHouse from '@/components/icons/IconHouse.vue'
import IconVideoCamera from '@/components/icons/IconVideoCamera.vue'
import IconUser from '@/components/icons/IconUser.vue'

const route = useRoute()
const userStore = useUserStore()
const user = ref(userStore.user)

userStore.$subscribe((mutation, state) => {
  user.value = state.user
})
</script>

<template>
  <aside class="w-4/5 shrink-0 px-9 py-8 lg:w-1/4 lg:px-18">
    <div class="fixed flex flex-col gap-10 text-white">
      <div class="flex items-center gap-4">
        <div
          :class="route.name === 'profile' && 'ring-2 ring-red-600'"
          class="flex h-16 w-16 items-center justify-center rounded-full"
        >
          <img
            v-if="user?.avatar"
            :src="user?.avatar"
            alt="User Avatar"
            class="h-16 w-16 rounded-full"
          />

          <icon-user v-if="!user?.avatar" class="h-16 w-16 rounded-full" />
        </div>

        <div class="flex flex-col">
          <p class="lg:text-2xl">{{ user?.username }}</p>
          <router-link to="profile" class="text-sm text-gray-300 lg:text-base">
            {{ $t('edit-profile') }}
          </router-link>
        </div>
      </div>

      <router-link to="news-feed" class="flex items-center gap-10 capitalize lg:text-2xl">
        <icon-house
          :color="route.name === 'news-feed' ? 'red' : 'white'"
          class="h-6 w-6 lg:h-8 lg:w-8"
        />
        {{ $t('news-feed') }}
      </router-link>

      <router-link to="my-movies" class="flex items-center gap-10 capitalize lg:text-2xl">
        <icon-video-camera
          :color="route.name === 'my-movies' ? 'red' : 'white'"
          class="h-6 w-6 lg:h-8 lg:w-8"
        />
        {{ $t('my-movies') }}
      </router-link>

      <logout-button class="lg:hidden" />
    </div>
  </aside>
</template>
