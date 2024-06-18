<script setup lang="ts">
import { ref } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'

import IconShow from '@/components/icons/IconShow.vue'
import IconHide from '@/components/icons/IconHide.vue'
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
const validClass = 'border border-green-700 focus:ring-0 focus:ring-opacity-0'
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <label :for="name" class="w-max text-white after:ml-1 after:text-red-500 after:content-['*']">
      {{ $t(label) }}
    </label>

    <Field v-slot="{ field, meta, errors }" :name="name" :rules="rules" validate-on-input>
      <input
        v-bind="field"
        :type="isPassword ? 'password' : 'text'"
        :id="name"
        :placeholder="$t(placeholder)"
        :class="[errors.length && errorClass, meta.dirty && meta.valid && validClass]"
        class="h-10 rounded bg-gray-300 px-4 focus:outline-none focus:ring-4 focus:ring-gray-400"
      />

      <div class="absolute right-4 top-11 flex items-center gap-2">
        <button v-if="type === 'password'" v-on:click="toggleType" type="button">
          <icon-show v-if="isPassword" color="gray" />
          <icon-hide v-if="!isPassword" />
        </button>

        <span v-if="errors.length">
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
