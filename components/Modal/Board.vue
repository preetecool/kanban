<template>
  <Modal modal-type="newBoard">
    <template #header>
      <span class="headingL">Create a new board</span>
      <span class="bodyM-thin light-text"> Organize your tasks by creating columns! </span>
    </template>

    <template #form-content-title>
      <span class="bodyM light-text">Name</span>
      <input
        v-model="boardName"
        type="text"
        placeholder="Enter a name for your board"
      />
    </template>

    <template #form-content-input>
      <span class="bodyM light-text">Column</span>
      <ModalList />
    </template>

    <template #submit-button>
      <UIButton
        label="Create Board"
        @click="sendData()"
      />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMainStore } from '@/store/main'
import { uuid } from 'vue-uuid'

const store = useMainStore()
const boardName = ref('')
const generateId = () => uuid.v4()

async function sendData() {
  const boardId = generateId()
  try {
    await sendBoardData(boardId)
    await sendCategoryData(boardId)
    store.closeModal()
  } catch (error) {
    console.error('An error occurred while sending data:', error)
  } finally {
    navigateTo(`/board/${boardId}`)
  }
}

async function sendBoardData(boardId: string) {
  if (!boardName.value) {
    throw new Error('Board name is empty')
  }
  await useDB('postBoard', boardId, boardName.value)
}

async function sendCategoryData(boardId: string) {
  const categories = store.inputItems.map(item => ({
    title: item.title,
  }))
  await useDB('postCategory', boardId, categories)
  store.userBoards.push({
    id: boardId,
    title: boardName.value,
    category: categories,
  })
}
</script>
