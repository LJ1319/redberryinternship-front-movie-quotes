<script setup lang="ts">
import { ref } from 'vue'
import { Field } from 'vee-validate'

import IconVisible from '@/components/icons/IconVisible.vue'

defineProps<{
  name: string
  rules: string
  desc: string
}>()

const isPassword = ref(true)
const toggleType = () => {
  isPassword.value = !isPassword.value
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <label :for="name" class="w-max capitalize text-white">
      {{ $t(`new-${desc}-label`) }}
    </label>

    <div class="relative w-full lg:w-10/12">
      <Field
        validate-on-input
        :name="name"
        :rules="rules"
        :type="isPassword ? 'password' : 'text'"
        id="password"
        :placeholder="$t(`new-${desc}-placeholder`)"
        class="h-12 w-full rounded bg-gray-300 pl-4 pr-12 text-lg focus:outline-none focus:ring-4 focus:ring-gray-400 lg:text-xl"
      />

      <div class="absolute right-4 top-3.5 flex items-center gap-2">
        <button v-on:click="toggleType" type="button">
          <icon-visible class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>
