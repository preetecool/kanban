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
import { useMainStore } from '@/store/main'
import { uuid } from 'vue-uuid'

const store = useMainStore()
const boardName = ref('')
const boardId = uuid.v4()

async function sendData() {
  await sendBoardData()
  await sendCategoryData()
}
async function sendBoardData() {
  if (!boardName.value) {
    return console.error('Board name is Empty')
  }
  try {
    const { data, refresh } = await useDB('postBoard', boardId, boardName.value)
    useDBRefresh(refresh, 'board', data)
  } catch (error) {
    console.error('Error while creating a new board', error)
  }
}
async function sendCategoryData() {
  let titles: string[] = []
  const categories = store.inputItems.map(() => {})
  store.inputItems.forEach(item => {
    titles.push(item.title)
  })
  try {
    const { data, refresh } = await useDB('postCategory', boardId, titles)
    useDBRefresh(refresh, 'board', data)
  } catch (error) {
    console.error('Error while creating categories', error)
    throw new Error()
  }
  store.closeModal()
}
</script>

<style lang="scss" scoped></style>
