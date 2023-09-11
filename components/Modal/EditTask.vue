<template>
  <Modal
    v-if="store.modal.editTask"
    :items="subtasks"
  >
    <template #header>
      <div class="task-heading">
        <span class="headingL">Edit Task</span>
      </div>
    </template>

    <template #form-content-title>
      <span class="bodyM light-text">Title</span>
      <input
        v-model="taskName"
        type="text"
        placeholder="Enter a name for your board"
      />
    </template>

    <template #form-content-input>
      <span class="bodyM light-text">Subtasks</span>
      <div
        v-for="(item, index) in store.selectedTask.subtask"
        :key="index"
      >
        <ModalElementColumnItem v-model:item-name="item.title">
          <IconOld
            name="icon-cross"
            @click="removeColumn(index)"
          />
        </ModalElementColumnItem>
      </div>
    </template>

    <template #description>
      <span class="bodyM light-text">Description</span>
      <textarea
        v-model="description"
        type="text"
        class="input description"
        rows="4"
        cols="50"
        placeholder="Write a description for your task"
      ></textarea>
    </template>

    <template #status>
      <ModalElementStatusInput />
    </template>

    <template #submit-button>
      <UIButton
        label="Save Task"
        @click="updateTask()"
      />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { Task, Subtask } from '~~/types/app.types'
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'

const store = useMainStore()
const db = useDB()
store.inputItems = []
const task = store.selectedTask
const taskId = ref(task ? task.id : '')
const selected = ref(task ? task.category : '')
const taskName = ref(task ? task.title : '')
const description = ref(task ? task.description : '')
const findTaskOnBoard = store.categoriesByBoard[task.category].task.filter(item => item.id === taskId.value)

watch(taskName || description, async () => {
  if (task.title !== taskName.value) {
    findTaskOnBoard[0].title = taskName.value
  }
  if (task.description !== description.value) {
    findTaskOnBoard[0].description = description.value
  }
})
function removeColumn(index: number) {
  if (store.selectedTask.subtask[index].id) {
    db.deleteSubtask(store.selectedTask.subtask[index].id)
  }
  store.selectedTask.subtask.splice(index, 1)
  return store.selectedTask.subtask
}
async function updateTask() {
  try {
    await db.updateTask(taskId.value, selected.value, taskName.value, description.value)
    if (task.title !== taskName.value) {
      store.selectedTask.title = taskName.value
    }
  } catch (error) {
    console.error('Error updating task:', error)
    throw new Error()
  }
  try {
    await db.postSubtask(taskId.value, store.inputItems)
  } catch (error) {
    console.error('Error updating task:', error)
    throw new Error()
  } finally {
    store.closeModal()
  }
}
</script>
