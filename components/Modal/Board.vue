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
import { title } from 'process'
import { uuid } from 'vue-uuid'

const store = useMainStore()
const boardName = ref('')
const boardId = uuid.v4()

async function sendData() {
  await sendBoardData()
  await sendCategoryData()
  store.closeModal()
}
async function sendBoardData() {
  if (!boardName.value) return console.error('Board name is Empty')
  const { data } = await useDB('postBoard', boardId, boardName.value)
}
async function sendCategoryData() {
  let titles: string[] = []
  store.inputItems.forEach(item => {
    titles.push(item.title)
    store.userBoards.category.push({
      id: uuid.v4(),
      title: title,
    })
    let catObjs = [];
    store.userBoards.category.forEach((cat)=> {
        let title_id_pair = [cat.title, cat.id]
        catObjs.push(title_id_pair)
    })
  })
  const { data } = await useDB('postCategory', boardId, catObjs)
}
</script>
