<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { SignupCredentials } from '@/types'
import { Signup } from '@/services/api/auth'

import FormGroup from '@/components/base/form/FormGroup.vue'
import GoogleButton from '@/components/base/buttons/GoogleButton.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'
import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits<{
  close: []
  setEmail: [value: string]
  switch: [content: string]
}>()

const { handleSubmit, setErrors, resetField } = useForm<SignupCredentials>()

const onSubmit = handleSubmit(async (values: SignupCredentials) => {
  try {
    await Signup(values)

    emit('setEmail', values.email.split('@')[1])
    emit('switch', 'activation-instructions')
  } catch (error: any) {
    setErrors(error.response.data.errors)
    resetField('password', { value: '' })
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
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Create an account</h1>
      <h2 class="text-gray-500">Start your journey!</h2>
    </div>

    <form v-on:submit="onSubmit" class="flex flex-col gap-6">
      <form-group
        name="username"
        label="Name"
        rules="required|min:3|max:15|alpha_num"
        type="text"
        placeholder="Enter your name"
      />

      <form-group
        name="email"
        label="Email"
        rules="required|email"
        type="email"
        placeholder="Enter your email"
      />

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
        <primary-button action="Get started" />
        <google-button action="Sign up" />
      </div>
    </form>

    <p class="text-center text-gray-500">
      Already have an account?
      <button v-on:click.stop="emit('switch', 'login')" class="text-blue underline">Log in</button>
    </p>
  </div>
</template>
