<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

defineProps<{
  name: string
  rules: string
  placeholder: string
  lang?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex h-12 w-full items-center gap-2 rounded border border-gray-500 bg-mirage-dark px-4 lg:text-xl"
    >
      <Field
        :name="name"
        :rules="rules"
        type="text"
        :id="name"
        :placeholder="placeholder"
        class="w-full bg-transparent text-white focus:outline-none"
      />
      <span v-if="lang" class="shrink-0 capitalize text-gray-500">{{ lang }}</span>
    </div>

    <ErrorMessage :name="name" class="text-sm text-red-500" />
  </div>
</template>
