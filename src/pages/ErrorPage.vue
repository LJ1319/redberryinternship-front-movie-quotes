<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const status = route.query.status

const imageUrl =
  status === '403' ? '/src/assets/images/gandolf.png' : '/src/assets/images/ghost.png'
const title = status === '403' ? 'You shall not pass!' : 'Whoops!'
const text = status === '403' ? 'forbidden' : 'not-found'
</script>

<template>
  <div
    style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
    class="flex h-screen w-screen flex-col items-center justify-center gap-8 text-white"
  >
    <div class="relative flex max-h-64 w-96 justify-center">
      <img :src="imageUrl" alt="" class="z-50" />
      <img
        v-if="status === '403'"
        src="@/assets/images/union.png"
        alt=""
        class="absolute top-[70px]"
      />
    </div>

    <div class="flex flex-col items-center gap-4 px-14 text-center">
      <h1 class="text-2xl font-bold lg:text-5xl">{{ title }}</h1>
      <p class="font-medium lg:text-2xl">
        {{ $t(text) }}
      </p>
    </div>

    <router-link
      to="/"
      class="flex h-12 min-w-36 items-center justify-center rounded bg-red px-4 text-xl"
    >
      {{ $t('return-home') }}
    </router-link>
  </div>
</template>
