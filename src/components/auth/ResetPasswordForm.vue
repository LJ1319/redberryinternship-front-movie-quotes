<script setup lang="ts">
import { useForm } from 'vee-validate'
import { resetPassword } from '@/services/api/auth'
import type { ResetPasswordCredentials } from '@/types'

import FormGroup from '@/components/auth/form/FormGroup.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

const props = defineProps<{
  url: string
  token: string
  email: string
}>()

const emit = defineEmits<{
  close: []
  switch: [content: string]
}>()

const { handleSubmit, setFieldError, resetField } = useForm<ResetPasswordCredentials>()

const onSubmit = handleSubmit(async (values: ResetPasswordCredentials) => {
  try {
    await resetPassword(props.url, {
      token: props.token,
      email: props.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    })

    emit('switch', 'reset-message')
  } catch (error: any) {
    setFieldError('password', error.response.data.message)
    resetField('password_confirmation', { value: '' })
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
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">
        {{ $t('create-new-password') }}
      </h1>
      <h2 class="text-gray-500">
        {{ $t('new-password-hint') }}
      </h2>
    </div>

    <form v-on:submit="onSubmit" class="flex flex-col gap-6">
      <form-group
        name="password"
        label="password-label"
        rules="required|min:8|max:15|alpha_num"
        type="password"
        placeholder="password-placeholder"
      />

      <form-group
        name="password_confirmation"
        label="password-confirm-label"
        rules="required|confirmed:password"
        type="password"
        placeholder="password-confirm-placeholder"
      />

      <div class="flex flex-col gap-4">
        <primary-button action="reset-password" class="h-10" />
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
