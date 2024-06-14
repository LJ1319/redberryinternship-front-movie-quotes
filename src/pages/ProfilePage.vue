<script setup lang="ts">
import EditProfileForm from '@/components/profile/EditProfileForm.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between lg:gap-40 lg:px-18 lg:py-9">
    <h1 class="hidden w-max px-10 text-2xl font-medium text-white lg:block">
      {{ $t('my-profile') }}
    </h1>

    <router-link to="news-feed" class="m-9 w-max lg:hidden">
      <icon-arrow-left class="h-4 w-4" />
    </router-link>

    <div
      class="relative flex min-h-max flex-1 flex-col gap-8 rounded-t-xl bg-mirage pb-32 pt-6 lg:block lg:w-4/5 lg:bg-transparent lg:py-0"
    >
      <edit-profile-form />
    </div>
  </div>
</template>
