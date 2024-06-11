<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

defineProps<{
  name: string
  rules: string
  placeholder: string
  lang: string
}>()
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <Field v-slot="{ field }" :name="name" :rules="rules">
      <textarea
        v-bind="field"
        :id="name"
        :placeholder="placeholder"
        class="relative w-full rounded border border-gray-500 bg-mirage-dark p-4 pr-16 text-white focus:outline-none lg:text-xl"
      >
      </textarea>
    </Field>
    <span class="absolute right-4 top-4 capitalize text-gray-500">{{ lang }}</span>

    <ErrorMessage :name="name" class="text-sm text-red-500" />
  </div>
</template>
