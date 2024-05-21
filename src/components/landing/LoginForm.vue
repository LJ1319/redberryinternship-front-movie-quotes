<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'

import IconGoogle from '@/components/icons/IconGoogle.vue'
import FormGroup from '@/components/base/form/FormGroup.vue'

const emit = defineEmits<{
  switch: [modal: string]
}>()

const onSubmit = (values: Object) => {
  console.log(values)
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-3 text-center">
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Log in to your account</h1>
      <h2 class="text-gray-500">Welcome back! Please enter your details.</h2>
    </div>

    <Form v-on:submit="onSubmit" class="flex flex-col gap-6">
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
              type="checkbox"
              name="remember"
              id="remember"
              value="remember"
              rules="required"
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
        <button class="h-10 w-full rounded bg-red text-white">Sign in</button>
        <button
          type="button"
          class="flex h-10 w-full items-center justify-center gap-2 rounded border border-white text-white"
        >
          <icon-google />
          Sign in with google
        </button>
      </div>
    </Form>

    <p class="text-center text-gray-500">
      Don't have an account?
      <button v-on:click.stop="emit('switch', 'signup')" class="text-blue underline">
        Sign up
      </button>
    </p>
  </div>
</template>
