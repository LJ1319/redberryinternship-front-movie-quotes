<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'

import { useUserStore } from '@/stores/UserStore'
import { updateUser } from '@/services/api/user'
import type { UpdateProfileValues } from '@/types'

import FieldContainer from '@/components/profile/form/FieldContainer.vue'
import FieldContentWrapper from '@/components/profile/form/FieldContentWrapper.vue'
import FieldContent from '@/components/profile/form/FieldContent.vue'
import PasswordGroup from '@/components/profile/form/PasswordGroup.vue'

import PrimaryButton from '@/components/base/form/PrimaryButton.vue'
import ConfirmModal from '@/components/profile/ConfirmModal.vue'
import SuccessModal from '@/components/profile/SuccessModal.vue'

import IconUser from '@/components/icons/IconUser.vue'

const userStore = useUserStore()

const isEditing = ref(false)
const confirmModalIsOpen = ref(false)
const successModalIsOpen = ref(false)

let imageUrl = userStore.user?.avatar
const selectedImage = ref<File | null>(null)

const handleImageUpload = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList && fileList.length) {
    const file = fileList[0]
    imageUrl = URL.createObjectURL(file)
    selectedImage.value = file

    isEditing.value = true
    setTimeout(() => {
      confirmModalIsOpen.value = true
    }, 750)
  }
}

const editingUsername = ref(false)
const editingEmail = ref(false)
const editingPassword = ref(false)

const enableEdit = (field: string) => {
  switch (field) {
    case 'username':
      isEditing.value = true
      editingUsername.value = true
      break
    case 'email':
      isEditing.value = true
      editingEmail.value = true
      break
    case 'password':
      isEditing.value = true
      editingPassword.value = true
      break
  }
}

const handleCancel = () => {
  imageUrl = userStore.user?.avatar

  isEditing.value = false
  editingUsername.value = false
  editingEmail.value = false
  editingPassword.value = false

  confirmModalIsOpen.value = false
}

const { meta, errors, handleSubmit, setErrors, isFieldDirty, isFieldValid } =
  useForm<UpdateProfileValues>()
const passwordRules = ['rule-min', 'rule-max', 'rule-alpha-num']

const openConfirmModal = () => {
  if (meta.value.dirty && meta.value.valid) {
    confirmModalIsOpen.value = true
  }
}

const closeConfirmModal = () => {
  confirmModalIsOpen.value = false
}

const closeSuccessModal = () => {
  successModalIsOpen.value = false
}

const onSubmit = handleSubmit(async (values: UpdateProfileValues) => {
  let formData = {
    ...values
  }

  if (selectedImage.value) {
    formData.avatar = selectedImage.value
  }

  try {
    const { data } = await updateUser(userStore.user?.id, formData)
    userStore.user = data

    handleCancel()
    successModalIsOpen.value = true
  } catch (error: any) {
    setErrors(error.response.data.errors)
  }
})
</script>

<template>
  <form v-on:submit="onSubmit" class="flex w-full flex-col items-center justify-center gap-8">
    <div class="-top-24 flex w-full flex-col items-center justify-center gap-4 lg:absolute">
      <img v-if="imageUrl" :src="imageUrl" alt="User Avatar" class="z-10 h-48 w-48 rounded-full" />

      <icon-user v-if="!imageUrl" class="z-10 h-48 w-48 rounded-full" />

      <label for="avatar" class="z-10 cursor-pointer text-xl text-white">
        {{ $t('upload-photo') }}
      </label>
      <input
        v-on:change="handleImageUpload"
        name="avatar"
        type="file"
        id="avatar"
        accept="image/*"
        class="hidden"
      />
    </div>

    <div class="flex w-full flex-col gap-16 px-8 lg:px-0">
      <div
        class="flex items-center justify-between rounded-xl lg:justify-center lg:bg-mirage-dark lg:p-48"
      >
        <div class="flex w-full flex-col gap-12 lg:w-11/12">
          <field-container
            name="username"
            :data="userStore.user?.username"
            :editing="isEditing && editingUsername"
            v-on:enableEdit="enableEdit"
          >
            <field-content-wrapper
              v-if="isEditing && editingUsername"
              v-on:cancel="handleCancel"
              v-on:switch="openConfirmModal"
            >
              <field-content name="username" rules="min:3|max:15|alpha_num" type="text" />
            </field-content-wrapper>
          </field-container>

          <field-container
            name="email"
            :data="userStore.user?.email"
            :can-edit="!userStore.user?.isGoogleUser"
            :editing="isEditing && editingEmail"
            v-on:enableEdit="enableEdit"
          >
            <field-content-wrapper
              v-if="isEditing && editingEmail"
              v-on:cancel="handleCancel"
              v-on:switch="openConfirmModal"
            >
              <field-content name="email" rules="email" type="email" />
            </field-content-wrapper>
          </field-container>

          <div v-if="!userStore.user?.isGoogleUser" class="flex flex-col gap-8">
            <field-container
              name="password"
              data="••••••••••••"
              :editing="isEditing && editingPassword"
              v-on:enableEdit="enableEdit"
            >
              <field-content-wrapper
                v-if="isEditing && editingPassword"
                v-on:cancel="handleCancel"
                v-on:switch="openConfirmModal"
              >
                <div class="w-full rounded border border-neutral-dark p-6 lg:w-10/12">
                  <p class="text-white">{{ $t('rules-password') }}:</p>
                  <ul class="list-disc px-3 text-sm text-neutral-light">
                    <li
                      v-for="rule in passwordRules"
                      :key="rule"
                      :class="[
                        errors['password'] &&
                          errors['password'].includes($t(rule)) &&
                          'text-red-500',
                        errors['password'] &&
                          !errors['password'].includes($t(rule)) &&
                          'text-green-500',
                        isFieldDirty('password') && isFieldValid('password') && 'text-green-500'
                      ]"
                      class="text-gray-300"
                    >
                      {{ $t(rule) }}
                    </li>
                  </ul>

                  <p
                    :class="[
                      errors['password_confirmation'] &&
                        errors['password_confirmation'].includes($t('rule-match')) &&
                        'text-red-500',
                      errors['password_confirmation'] &&
                        !errors['password_confirmation'].includes($t('rule-match')) &&
                        'text-green-500',
                      isFieldDirty('password_confirmation') &&
                        isFieldValid('password_confirmation') &&
                        'text-green-500'
                    ]"
                    class="text-gray-300"
                  >
                    {{ $t('rule-match') }}
                  </p>
                </div>

                <password-group name="password" rules="min:8|max:15|alpha_num" desc="password" />

                <password-group
                  name="password_confirmation"
                  rules="confirmed:password"
                  desc="password-confirm"
                />
              </field-content-wrapper>
            </field-container>
          </div>
        </div>
      </div>

      <div v-if="isEditing" class="hidden items-center justify-end gap-8 lg:flex">
        <button v-on:click="handleCancel" type="button" class="text-xl text-white">
          {{ $t('cancel') }}
        </button>
        <primary-button action="save-changes" class="h-12 px-4 text-xl" />
      </div>

      <confirm-modal v-if="confirmModalIsOpen" v-on:close="closeConfirmModal" />
      <success-modal v-if="successModalIsOpen" v-on:close="closeSuccessModal" />
    </div>
  </form>
</template>
