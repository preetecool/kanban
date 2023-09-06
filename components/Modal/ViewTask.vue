<template>
  <Modal>
    <template #header>
      <div class="task-heading">
        <span class="headingL">{{ task.title }}</span>
        <UIEditDropdown
          view="editTask"
          menuText="Task"
          :id="taskId"
        />
      </div>
      <p class="bodyL light-text">
        {{ task.description }}
      </p>
    </template>

    <template #subtasks>
      <span class="bodyM light-text">Subtasks({{ ' 0 of 3' }})</span>
      <div
        v-for="(subtask, index) in subtasks"
        :key="subtask.id"
      >
        <ModalElementSubtaskItem
          :subtask="subtask"
          :taskId="taskId"
        />
      </div>
    </template>

    <template #status>
      <ModalElementStatusInput />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { Task, Subtask } from '~~/types/app.types'
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'

let store = useMainStore()
let db = useDB()
let task: Task = store.selectedTask
const taskId = ref(task ? task.id : '')
const subtasks: Subtask[] = db.setSubtasksForTask()
let menu = ref(false)
</script>
<style lang="scss" scpoped>
.task-heading {
  display: flex;
  justify-content: space-between;
}
.edit-task-icon {
  :hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  width: 40px;
}
</style>
