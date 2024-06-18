<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { useMovieStore } from '@/stores/MovieStore'
import { deleteQuote } from '@/services/api/quotes'
import { onClickOutside } from '@/composables/onClickOutside'

import FormModal from '@/components/shared/FormModal.vue'
import ViewQuoteForm from '@/components/shared/ViewQuoteForm.vue'
import EditQuoteForm from '@/components/shared/EditQuoteForm.vue'

import IconShow from '@/components/icons/IconShow.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconBin from '@/components/icons/IconBin.vue'

const props = defineProps<{
  id: number
}>()

const emit = defineEmits(['close'])

const route = useRoute()
const movieStore = useMovieStore()

const actionsMenu = ref<HTMLElement | null>(null)
onClickOutside(actionsMenu.value, () => emit('close'))

const viewModalIsOpen = ref(false)
const editModalIsOpen = ref(false)

const openModal = (modal: string) => {
  switch (modal) {
    case 'view':
      viewModalIsOpen.value = true
      break
    case 'edit':
      editModalIsOpen.value = true
      break
  }
}

const closeModal = (modal: string) => {
  switch (modal) {
    case 'view':
      viewModalIsOpen.value = false
      emit('close')
      break
    case 'edit':
      editModalIsOpen.value = false
      emit('close')
      break
  }
}

const switchModal = () => {
  viewModalIsOpen.value = false
  editModalIsOpen.value = true
}

const handleSubmit = async () => {
  try {
    await deleteQuote(props.id)
    await movieStore.loadMovie(route.params.id.toString())
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <div
    ref="actionsMenu"
    v-on:click.stop
    class="absolute bottom-12 right-9 flex w-64 flex-col gap-8 rounded-xl bg-mirage px-10 py-8 text-white lg:-right-48 lg:bottom-4"
  >
    <button v-on:click="openModal('view')" class="flex items-center gap-4">
      <icon-show color="white" class="h-5 w-5" />
      <span>{{ $t('view-quote') }}</span>
    </button>

    <button v-on:click="openModal('edit')" class="flex items-center gap-4">
      <icon-pencil />
      <span>{{ $t('edit') }}</span>
    </button>

    <form v-on:submit.prevent="handleSubmit">
      <button class="flex items-center gap-4">
        <icon-bin />
        <span>{{ $t('delete') }}</span>
      </button>
    </form>
  </div>

  <form-modal v-if="viewModalIsOpen" v-on:click.self="closeModal('view')">
    <view-quote-form :id="id" v-on:close="closeModal('view')" v-on:switch="switchModal" />
  </form-modal>

  <form-modal v-if="editModalIsOpen" v-on:click.self="closeModal('edit')">
    <edit-quote-form :id="id" v-on:close="closeModal('edit')" />
  </form-modal>
</template>
