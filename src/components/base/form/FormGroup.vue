<script setup lang="ts">
import { ref } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'

import IconVisible from '@/components/icons/IconVisible.vue'
import IconInvalid from '@/components/icons/IconInvalid.vue'
import IconValid from '@/components/icons/IconValid.vue'

const props = defineProps<{
  name: string
  label: string
  rules: string
  type: string
  placeholder: string
}>()

let isPassword = ref(props.type === 'password')

const toggleType = () => {
  isPassword.value = !isPassword.value
}

const errorClass = 'border border-red-500 focus:ring-0 focus:ring-opacity-0'
const validatedClass = 'border border-green-700 focus:ring-0 focus:ring-opacity-0'
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <label :for="name" class="text-white after:ml-1 after:text-red-500 after:content-['*']">
      {{ label }}
    </label>

    <Field v-slot="{ field, meta, errors }" :name="name" :rules="rules" validate-on-input>
      <input
        v-bind="field"
        :type="isPassword ? 'password' : 'text'"
        :id="name"
        :placeholder="placeholder"
        :class="[errors.length > 0 && errorClass, meta.dirty && meta.valid && validatedClass]"
        class="peer h-10 rounded bg-gray-300 px-4 focus:outline-none focus:ring-4 focus:ring-gray-400"
      />

      <div class="absolute right-4 top-11 flex items-center gap-2">
        <button v-if="type === 'password'" v-on:click="toggleType" type="button">
          <icon-visible />
        </button>

        <span v-if="errors.length > 0">
          <icon-invalid />
        </span>

        <span v-if="meta.dirty && meta.valid">
          <icon-valid />
        </span>
      </div>
    </Field>

    <ErrorMessage :name="name" class="text-sm text-red-500" />
  </div>
</template>
