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
      <!-- <ModalList /> -->
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
import { Category } from '~~/types/app.types'
import { useMainStore } from '@/store/main'
import { uuid } from 'vue-uuid'
import { callWithNuxt } from '#app/nuxt'
import { useDBStore } from '@/store/db'
import Id from 'server/api/boards/delete/[id]'

const supabase = useSupabaseClient()
const store = useMainStore()
const db = useDBStore()

const boardName = ref('')
const generateId = () => uuid.v4()
async function sendData() {
  if (!boardName.value.trim()) {
    alert('Board name is required')
    return
  }

  const boardId = generateId()
  const app = useNuxtApp()
  try {
    await sendBoardData(boardId)

    if (store.inputItems && store.inputItems.length > 0) {
      await sendCategoryData(boardId)
    } else {
      console.error('No categories to add')
    }

    store.closeModal()

    callWithNuxt(app, () => navigateTo(`/board/${boardId}`))
  } catch (error) {
    console.error('An error occurred while sending data:', error)
  }
}

async function sendBoardData(boardId: string) {
  if (!boardName.value) {
    throw new Error('Board name is empty')
  }
  await useDB('postBoard', boardId, boardName.value)
}

async function sendCategoryData(boardId: string) {
  if (store.inputItems) {
    let catObjs: { title: string; id: string; board: string }[] = []
    store.inputItems.forEach((category: Category) => {
      catObjs.push({
        title: category.title,
        id: generateId(),
        board: boardId,
      })
    })
    catObjs.forEach(category => {
      store.categoriesByBoard[category.id] = {
        ...category,
        task: [],
      }
    })
    console.log('catObjs:', catObjs)
    if (store.inputItems.length > 0) {
      await useDB('postCategory', boardId, catObjs)
    } else {
      throw new Error('No categories to send')
    }
  }
}
</script>
