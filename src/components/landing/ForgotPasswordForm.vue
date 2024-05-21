<script setup lang="ts">
import { Form } from 'vee-validate'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
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
      <h1 class="text-2xl font-medium text-white lg:text-[2rem]">Forgot password?</h1>
      <h2 class="text-gray-500">
        Enter the email and we’ll send an email with instructions to reset your password
      </h2>
    </div>

    <Form v-on:submit="onSubmit" class="flex flex-col gap-6">
      <form-group
        name="email"
        label="Email"
        rules="required|email"
        type="email"
        placeholder="Enter your email"
      />

      <div class="flex flex-col gap-4">
        <button class="h-10 w-full rounded bg-red text-white">Send instructions</button>
      </div>
    </Form>

    <button
      v-on:click.stop="emit('switch', 'login')"
      class="flex items-center justify-center gap-4 text-gray-500"
    >
      <icon-arrow-left />
      Back to log in
    </button>
  </div>
</template>
