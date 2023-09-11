<template>
  <Dropdown>
    <template #icon>
      <Icon icon="vertical-ellipsis" />
    </template>
    <template #menu-items>
      <li
        class="item"
        @click="store.toggleModal(view as keyof Modal, id)"
      >
        <span class="light-text">Edit {{ menuText }}</span>
      </li>
      <li
        class="item"
        @click="displayDeleteModal"
      >
        <span class="light-text danger">Delete {{ menuText }}</span>
      </li>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { Modal } from '~~/types/app.types'
const store = useMainStore()
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

const menu = ref(false)
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
