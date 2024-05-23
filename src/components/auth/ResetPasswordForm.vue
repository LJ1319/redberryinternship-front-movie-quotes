<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { ResetPasswordCredentials } from '@/types'
import { ResetPassword } from '@/services/api/auth'

import FormGroup from '@/components/base/form/FormGroup.vue'
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
    await ResetPassword(props.url, {
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
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Create new password</h1>
      <h2 class="text-gray-500">
        Your new password must be different from previous used passwords
      </h2>
    </div>

    <form v-on:submit="onSubmit" class="flex flex-col gap-6">
      <form-group
        name="password"
        label="Password"
        rules="required|min:8|max:15|alpha_num"
        type="password"
        placeholder="Password"
      />

      <form-group
        name="password_confirmation"
        label="Confirm password"
        rules="required|confirmed:password"
        type="password"
        placeholder="Password"
      />

      <div class="flex flex-col gap-4">
        <primary-button action="Reset password" />
      </div>
    </form>

    <button
      v-on:click.stop="emit('switch', 'login')"
      class="flex items-center justify-center gap-4 text-gray-500"
    >
      <icon-arrow-left />
      Back to log in
    </button>
  </div>
</template>
