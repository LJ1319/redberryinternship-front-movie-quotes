<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { ForgotPasswordCredentials } from '@/types'
import { forgotPassword } from '@/services/api/auth'

import FormGroup from '@/components/auth/form/FormGroup.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'
import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits<{
  close: []
  setEmail: [value: string]
  switch: [content: string]
}>()

const { handleSubmit, setFieldError } = useForm<ForgotPasswordCredentials>()

const onSubmit = handleSubmit(async (values: ForgotPasswordCredentials) => {
  try {
    await forgotPassword(values)

    emit('setEmail', values.email.split('@')[1])
    emit('switch', 'reset-instructions')
  } catch (error: any) {
    setFieldError('email', error.response.data.message)
  }
})
</script>

<template>
  <div class="flex justify-end lg:hidden">
    <button v-on:click="emit('close')">
      <icon-close />
    </button>
  </div>

  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-3 text-center">
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">{{ $t('forgot-password') }}?</h1>
      <h2 class="text-gray-500">
        {{ $t('forgot-title') }}
      </h2>
    </div>

    <form v-on:submit="onSubmit" class="flex flex-col gap-6">
      <form-group
        name="email"
        label="email-label"
        rules="required|email"
        type="email"
        placeholder="email-placeholder"
      />

      <div class="flex flex-col gap-4">
        <primary-button action="send-instructions" class="h-10" />
      </div>
    </form>

    <button
      v-on:click.stop="emit('switch', 'login')"
      class="flex items-center justify-center gap-4 text-gray-500"
    >
      <icon-arrow-left />
      {{ $t('back-to-login') }}
    </button>
  </div>
</template>
