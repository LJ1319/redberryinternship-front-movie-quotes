<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import type { LoginCredentials } from '@/types'
import { Login, RetrieveAuthUser } from '@/services/api/auth'

import FormGroup from '@/components/base/form/FormGroup.vue'
import GoogleButton from '@/components/base/buttons/GoogleButton.vue'
import PrimaryButton from '@/components/base/form/PrimaryButton.vue'
import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits<{
  close: []
  switch: [content: string]
}>()

const router = useRouter()
const userStore = useUserStore()

const { handleSubmit, setFieldError, resetField } = useForm<LoginCredentials>()

const onSubmit = handleSubmit(async (values: LoginCredentials) => {
  try {
    await Login(values)

    const { data } = await RetrieveAuthUser()
    userStore.user = data

    await router.push({ name: 'news-feed' })
  } catch (error: any) {
    setFieldError('email', error.response.data.message)
    resetField('password', { value: '' })
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
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Log in to your account</h1>
      <h2 class="text-gray-500">Welcome back! Please enter your details.</h2>
    </div>

    <form v-on:submit="onSubmit" class="flex flex-col gap-6">
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

      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <Field
              name="remember"
              type="checkbox"
              id="remember"
              :value="true"
              :unchecked-value="false"
              class="h-4 w-4"
            />

            <label for="remember" class="text-white">Remember me</label>
          </div>
          <ErrorMessage name="remember" class="text-sm text-red-500" />
        </div>

        <button v-on:click.stop="emit('switch', 'forgot')" class="text-blue underline">
          Forgot password
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <primary-button action="Sign in" />
        <google-button action="Sign in" />
      </div>
    </form>

    <p class="text-center text-gray-500">
      Don't have an account?
      <button v-on:click.stop="emit('switch', 'signup')" class="text-blue underline">
        Sign up
      </button>
    </p>
  </div>
</template>
