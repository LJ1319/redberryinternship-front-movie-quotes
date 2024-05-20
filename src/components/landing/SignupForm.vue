<script setup lang="ts">
import { Form } from 'vee-validate'

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
      <h1 class="text-2xl lg:text-[2rem] font-medium text-white">Create an account</h1>
      <h2 class="text-gray-500">Start your journey!</h2>
    </div>

    <Form v-on:submit="onSubmit" class="flex flex-col gap-6">
      <form-group
        name="name"
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
        <button class="h-10 w-full rounded bg-red text-white">Get Started</button>
        <button
          type="button"
          class="flex h-10 w-full items-center justify-center gap-2 rounded border border-white text-white"
        >
          <icon-google />
          Sign up with google
        </button>
      </div>
    </Form>

    <p class="text-center text-gray-500">
      Already have an account?
      <button v-on:click.stop="emit('switch', 'login')" class="text-blue underline">Log in</button>
    </p>
  </div>
</template>
