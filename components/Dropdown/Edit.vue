<template>
  <Dropdown>
    <template #icon>
      <Icon icon="vertical-ellipsis" />
    </template>
    <template #menu-items>
      <li
        @click="store.toggleModal(view as keyof Modal, id)"
        class="item"
      >
        <span class="light-text">Edit {{ menuText }}</span>
      </li>
      <li
        @click="displayDeleteModal"
        class="item"
      >
        <span class="light-text danger">Delete {{ menuText }}</span>
      </li>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { Modal } from '~~/types/app.types'
let store = useMainStore()
const props = defineProps({
  view: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  menuText: {
    type: String,
    required: true,
  },
})

let menu = ref(false)
function displayDeleteModal() {
  if (store.modal.viewTask) {
    store.deleteView = 'task'
  } else if (store.modal.editBoard) {
    store.deleteView = 'category'
  } else {
    store.deleteView = 'board'
  }
  store.toggleModal('deleteView' as keyof Modal, props.id)
}
</script>

<style lang="scss" scoped>
.item {
  border-radius: 8px;
  padding: 8px 16px;
  justify-self: center;
  &:hover {
    cursor: pointer;
    background-color: colors.$lightgrey;
  }
}
</style>
