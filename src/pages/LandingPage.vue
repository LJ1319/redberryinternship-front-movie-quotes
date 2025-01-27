<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores/UserStore'
import { googleCallback, verifyEmail } from '@/services/api/auth'
import { retrieveAuthUser } from '@/services/api/user'

import IconSpinner from '@/components/icons/IconSpinner.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import PageModal from '@/components/shared/PageModal.vue'
import PageFooter from '@/components/shared/PageFooter.vue'

import SignupForm from '@/components/auth/SignupForm.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'

import ActivationInstructions from '@/components/landing/ActivationInstructions.vue'
import ActivationMessage from '@/components/landing/ActivationMessage.vue'
import ResetInstructions from '@/components/landing/ResetInstructions.vue'
import ResetMessage from '@/components/landing/ResetMessage.vue'
import ResendInstructions from '@/components/landing/ResendInstructions.vue'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const userStore = useUserStore()

const isLoading = ref(false)
const modalIsOpen = ref(false)
let modalContent = ref<string | null>(null)
let url = ref('')
let token = ref('')
let email = ref('')

const openModal = (content: string) => {
  modalContent.value = content
  modalIsOpen.value = true
}

const closeModal = () => {
  modalIsOpen.value = false
}

const handleVerifyEmail = async (url: string) => {
  try {
    await verifyEmail(url)
    openModal('activation-message')
  } catch (error: any) {
    openModal('resend-instructions')
  }
}

if (route.query.verificationUrl && route.query.email) {
  const verificationUrl = route.query.verificationUrl
  const signature = route.query.signature
  const url = `${verificationUrl}&signature=${signature}`

  email.value = route.query.email.toString()

  router.replace({ query: undefined })

  handleVerifyEmail(url)
}

if (route.query.resetUrl && route.query.signature && route.query.token && route.query.email) {
  const resetUrl = route.query.resetUrl
  const signature = route.query.signature
  token.value = route.query.token.toString()
  email.value = route.query.email.toString()

  url.value = `${resetUrl}&signature=${signature}`

  router.replace({ query: undefined })

  openModal('reset-password')
}

const setEmail = (value: string) => {
  email.value = value
}

const handleGoogleAuth = async (code: string) => {
  try {
    isLoading.value = true
    await googleCallback(code)

    const { data } = await retrieveAuthUser()
    userStore.user = data

    await router.push({ name: 'news-feed', params: { locale: locale.value } })
    isLoading.value = false
  } catch (error: any) {
    console.error(error)
  }
}

if (route.query.authuser && route.query.code) {
  handleGoogleAuth(route.query.code.toString())
  router.replace({ query: undefined })
}
</script>

<template>
  <div
    v-if="isLoading"
    style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
    class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center"
  >
    <icon-spinner class="z-50 animate-spin" />
  </div>

  <page-header v-if="!isLoading" v-on:open="openModal" />

  <main v-if="!isLoading">
    <page-modal v-if="modalIsOpen" v-on:close="closeModal">
      <signup-form
        v-if="modalContent === 'signup'"
        v-on:close="closeModal"
        v-on:setEmail="setEmail"
        v-on:switch="openModal"
      />

      <activation-instructions
        v-if="modalContent === 'activation-instructions'"
        v-on:close="closeModal"
        :email="email"
      />

      <activation-message
        v-if="modalContent === 'activation-message'"
        v-on:close="closeModal"
        v-on:switch="openModal"
      />

      <login-form v-if="modalContent === 'login'" v-on:close="closeModal" v-on:switch="openModal" />

      <forgot-password-form
        v-if="modalContent === 'forgot'"
        v-on:close="closeModal"
        v-on:setEmail="setEmail"
        v-on:switch="openModal"
      />

      <reset-instructions
        v-if="modalContent === 'reset-instructions'"
        v-on:close="closeModal"
        :email="email"
      />

      <reset-password-form
        v-if="modalContent === 'reset-password'"
        v-on:close="closeModal"
        v-on:switch="openModal"
        :url="url"
        :token="token"
        :email="email"
      />

      <reset-message
        v-if="modalContent === 'reset-message'"
        v-on:close="closeModal"
        v-on:switch="openModal"
      />

      <resend-instructions
        v-if="modalContent === 'resend-instructions'"
        v-on:close="closeModal"
        v-on:switch="openModal"
        :email="email"
      />
    </page-modal>

    <section
      style="background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%)"
      class="min-h-screen w-screen"
    >
      <div
        style="
          background: linear-gradient(180deg, #11101a 0%, #08080d 50.52%, rgba(0, 0, 0, 0) 100%);
        "
        class="absolute left-0 top-0 h-screen w-screen"
      ></div>

      <div
        class="mx-auto mt-28 flex max-w-72 flex-col items-center justify-center gap-8 lg:mt-24 lg:max-w-2xl"
      >
        <h1 class="z-10 text-center text-2xl font-bold text-gold lg:text-6xl lg:leading-[6rem]">
          {{ $t('title') }}
        </h1>
        <button
          v-on:click.stop="openModal('signup')"
          class="z-10 h-10 max-w-32 rounded bg-red px-4 text-white lg:h-12 lg:max-w-36 lg:text-xl"
        >
          {{ $t('get-started') }}
        </button>
      </div>

      <div
        style="
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 55.21%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute right-1/4 top-1/4 hidden h-screen w-screen -rotate-90 lg:block"
      ></div>

      <div
        style="background-image: url(/interstellar.png)"
        class="flex h-screen w-screen items-center bg-cover bg-fixed bg-center bg-no-repeat"
      >
        <div class="mx-6 flex h-max gap-4 lg:mx-40 lg:max-w-5xl">
          <div class="flex h-6 items-center lg:h-16">
            <div class="h-1 w-4 shrink-0 bg-white lg:w-14"></div>
          </div>

          <div>
            <p class="font-montserrat text-xl font-bold text-white lg:text-6xl">
              “{{ $t('interstellar-quote') }}”
            </p>
            <p class="l g:text-3xl mt-4 font-montserrat font-bold text-zinc-300">
              {{ $t('interstellar-movie') }}, 2014
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative h-screen w-screen overflow-hidden">
      <div
        style="
          background: linear-gradient(
            180deg,
            rgba(17, 16, 26, 0.95) 0%,
            rgba(8, 8, 13, 0.13) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute left-0 top-0 h-screen w-screen"
      ></div>

      <div
        style="
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 55.21%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute right-1/4 top-0 hidden h-screen w-screen -rotate-90 lg:block"
      ></div>

      <div
        style="background-image: url(/royal.png)"
        class="flex h-screen w-screen items-center bg-cover bg-fixed bg-center bg-no-repeat"
      >
        <div class="mx-6 flex h-max gap-4 lg:mx-40 lg:max-w-5xl">
          <div class="flex h-6 items-center lg:h-16">
            <div class="h-1 w-4 shrink-0 bg-white lg:w-14"></div>
          </div>

          <div>
            <p class="font-montserrat text-xl font-bold text-white lg:text-6xl">
              “{{ $t('royal-quote') }}”
            </p>
            <p class="mt-4 font-montserrat font-bold text-zinc-300 lg:text-3xl">
              {{ $t('royal-movie') }}, 2001
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative h-screen w-screen overflow-hidden">
      <div
        style="
          background: linear-gradient(
            180deg,
            rgba(17, 16, 26, 0.95) 0%,
            rgba(8, 8, 13, 0.13) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute left-0 top-0 h-screen w-screen"
      ></div>

      <div
        style="
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 55.21%,
            rgba(0, 0, 0, 0) 100%
          );
        "
        class="absolute right-1/4 top-0 hidden h-screen w-screen -rotate-90 lg:block"
      ></div>

      <div
        style="background-image: url(/lotr.png)"
        class="flex h-screen w-screen items-center bg-cover bg-fixed bg-center bg-no-repeat"
      >
        <div class="mx-6 flex h-max gap-4 lg:mx-40 lg:max-w-5xl">
          <div class="flex h-6 items-center lg:h-16">
            <div class="h-1 w-4 shrink-0 bg-white lg:w-14"></div>
          </div>

          <div>
            <p class="font-montserrat text-xl font-bold text-white lg:text-6xl">
              “{{ $t('lotr-quote') }}”
            </p>
            <p class="mt-4 font-montserrat font-bold text-zinc-300 lg:text-3xl">
              {{ $t('lotr-movie') }}, 2003
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <page-footer />
</template>
