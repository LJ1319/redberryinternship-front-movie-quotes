<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import type { AddQuoteValues } from '@/types'

import IconClose from '@/components/icons/IconClose.vue'
import IconUser from '@/components/icons/IconUser.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'

const emit = defineEmits(['close'])

const userStore = useUserStore()
const user = ref(userStore.user)

const { handleSubmit } = useForm<AddQuoteValues>()

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <div v-on:click.stop class="fixed left-0 top-0 z-50 flex h-2/3 w-full flex-col bg-mirage-dark">
    <div class="flex items-center border-b border-gray-300/20 p-9">
      <h1 class="flex-1 text-center text-xl font-medium capitalize text-white">
        {{ $t('write-quote') }}
      </h1>
      <button v-on:click="emit('close')" class="shrink-0">
        <icon-close color="white" />
      </button>
    </div>

    <div class="item flex h-full flex-col gap-8 p-9">
      <div class="flex items-center gap-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-full">
          <img
            v-if="user?.avatar"
            :src="user?.avatar"
            alt="User Avatar"
            class="h-10 w-10 rounded-full"
          />

          <icon-user v-if="!user?.avatar" class="h-10 w-10 rounded-full" />
        </div>

        <p class="text-xl text-white">{{ user?.username }}</p>
      </div>

      <form v-on:submit="onSubmit">
        <primary-button action="add" class="h-12 w-full text-xl" />
      </form>
    </div>
  </div>
</template>
