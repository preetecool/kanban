<template>
  <Modal modalType="newBoard">
    <template #header>
      <span class="headingL">Create a new board</span>
      <span class="bodyM-thin light-text"> Organize your tasks by creating columns! </span>
    </template>

    <template #form-content-title>
      <span class="bodyM light-text">Name</span>
      <input
        type="text"
        placeholder="Enter a name for your board"
        v-model="boardName"
      />
    </template>

    <template #form-content-input="{ items }">
      <span class="bodyM light-text">Column</span>
      <ModalList />
    </template>

    <template #submit-button>
      <UIButton
        label="Create Board"
        @click="sendData()"
      ></UIButton>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'
import { uuid } from 'vue-uuid'

const store = useMainStore()
const db = useDB()
const boardName = ref('')
const user = useSupabaseUser()
let titles = ref([])

console.log(store.inputItems)
async function sendData() {
  store.inputItems.forEach(item => {
    titles.value.push(item.title)
  })

  if (!boardName.value) {
    return console.error('Board name is Empty')
  }
  const boardId = uuid.v4()

  try {
    await db.postBoard(boardId, boardName.value)
  } catch (error) {
    console.error('Error while creating a new board', error)
    throw new Error()
  }

  try {
    await db.postCategory(boardId, titles.value)
  } catch (error) {
    console.error('Error while creating categories', error)
    throw new Error()
  } finally {
    // console.log('board created')
    // if()
    navigateTo(`/board/${boardId}`)
  }

  store.toggleModal('newBoard')
}
</script>

<style lang="scss" scoped></style>
