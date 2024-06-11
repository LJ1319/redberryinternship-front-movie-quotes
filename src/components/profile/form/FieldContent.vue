<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

import IconInvalid from '@/components/icons/IconInvalid.vue'
import IconValid from '@/components/icons/IconValid.vue'

defineProps<{
  name: string
  rules: string
  type: string
}>()

const errorClass = 'border border-red-500 focus:ring-0 focus:ring-opacity-0'
const validClass = 'border border-green-700 focus:ring-0 focus:ring-opacity-0'
</script>

<template>
  <label :for="name" class="w-max capitalize text-white">
    {{ $t(`new-${name}-label`) }}
  </label>

  <div class="relative w-full lg:w-10/12">
    <Field v-slot="{ field, meta, errors }" :name="name" :rules="rules" validate-on-input>
      <input
        v-bind="field"
        :type="type"
        :id="name"
        :placeholder="$t(`new-${name}-placeholder`)"
        :class="[errors.length && errorClass, meta.dirty && meta.valid && validClass]"
        class="h-12 w-full rounded bg-gray-300 pl-4 pr-12 text-lg focus:outline-none focus:ring-4 focus:ring-gray-400 lg:text-xl"
      />

      <div class="absolute right-4 top-3.5 flex items-center gap-2">
        <span v-if="errors.length">
          <icon-invalid class="h-5 w-5" />
        </span>

        <span v-if="meta.dirty && meta.valid">
          <icon-valid class="h-5 w-5" />
        </span>
      </div>
    </Field>
  </div>

  <ErrorMessage :name="name" class="text-sm text-red-500" />
</template>
