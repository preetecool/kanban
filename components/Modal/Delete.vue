<template>
  <Modal>
    <template #header>
      <h2 class="danger">Delete this {{ store.deleteView }}</h2>
      <p class="bodyL light-text">
        {{ madLibs }}
      </p>
    </template>
    <template #body>
      <p>Are you sure you want to delete this board?</p>
    </template>
    <template #submit-button>
      <UIButton
        destructive
        :label="deleteText as string"
        @click="handleDelete()"
      />
      <UIButton
        secondary
        label="Cancel"
        @click="store.closeModal()"
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { useDBStore } from '@/store/db'

const store = useMainStore()
const db = useDBStore()
const deleteText = computed(() => {
  if (store.deleteView === 'task') {
    return 'Delete Task'
  }
  if (store.deleteView === 'category') {
    return 'Delete Category'
  }
  if (store.deleteView === 'board') {
    return 'Delete Board'
  }
})

async function deleteTask() {
  try {
    await db.deleteTask(store.selectedTask.id)
  } catch (error) {
    console.error('failed to delete task')
  } finally {
    store.closeModal()
  }
}

async function deleteBoard() {
  const id = store.activeBoard.id
  try {
    await db.deleteBoard(id)
  } catch (e) {
    console.error('failed to delete board')
  } finally {
    store.userBoards = store.userBoards.filter(board => board.id !== id)
    store.closeModal()
    navigateTo('/')
  }
}
function handleDelete() {
  if (store.deleteView === 'task') {
    deleteTask()
  } else if (store.deleteView === 'board') {
    deleteBoard()
  }
}

const madLibs = computed(() => {
  const type = store.deleteView
  let item
  let childElement
  if (type === 'task') {
    item = store.selectedTask
    const subtasks =
      store.selectedTask.subtask.length > 0 ? store.selectedTask.subtask.length + ' subtasks' : 'subtasks'
    childElement = subtasks
  }
  if (type === 'category') {
    item = store.categoriesByBoard
    childElement = 'tasks'
  }
  if (type === 'board') {
    item = store.activeBoard
    childElement = 'categories and tasks'
  }

  return `Are you sure you want to delete the '${item?.title}' ${type}? This action will remove its ${childElement} and cannot be undone.`
})
</script>
