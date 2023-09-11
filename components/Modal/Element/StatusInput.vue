<template>
  <span class="bodyM light-text">Status</span>
  <select
    v-model="selected"
    name="status"
    @change="setNewStatus"
  >
    <option
      v-for="category in store.categoriesByBoard"
      :key="category.id"
      :value="category.id"
    >
      {{ category.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'
import { Task } from '~~/types/app.types'

const store = useMainStore()
const db = useDB()
const task = store.selectedTask

const taskId = ref(task ? task.id : '')
const currentStatus = task.category
const selected = ref(task ? task.category : '')

async function setNewStatus() {
  await db.updateTask(taskId.value, selected.value)

  const taskCopy = { ...store.selectedTask }
  ;(store.categoriesByBoard[selected.value] as { task: Task[] }).task.push(taskCopy)

  const indexToRemove = store.categoriesByBoard[currentStatus].task.findIndex((task: Task) => task.id === taskId.value)

  if (indexToRemove !== -1) {
    store.categoriesByBoard[currentStatus].task.splice(indexToRemove, 1)
  }
  store.closeModal()
}
</script>
