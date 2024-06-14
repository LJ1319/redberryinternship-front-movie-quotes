<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    data?: string
    canEdit?: boolean
    editing: boolean
  }>(),
  {
    canEdit: true
  }
)

const emit = defineEmits<{
  'enable-edit': [name: string]
}>()
</script>

<template>
  <div class="flex flex-col border-b border-gray-600 lg:gap-4 lg:border-0">
    <span class="w-max text-white">
      {{ $t(`${name}-label`) }}
    </span>

    <div class="flex gap-8">
      <span
        class="flex h-12 w-10/12 items-center text-lg text-white lg:shrink-0 lg:rounded lg:bg-gray-300 lg:px-4 lg:text-xl lg:text-black"
      >
        {{ data }}
      </span>

      <button
        v-if="canEdit && !editing"
        v-on:click="emit('enable-edit', name)"
        type="button"
        class="text-white"
      >
        {{ $t('edit') }}
      </button>
    </div>

    <slot />
  </div>
</template>
