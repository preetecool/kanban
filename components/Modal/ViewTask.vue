<template>
  <Modal>
    <template #header>
      <div class="task-heading">
        <span class="headingL">{{ task.title }}</span>
        <DropdownEdit
          :id="taskId"
          view="editTask"
          menu-text="Task"
        />
      </div>
      <p class="bodyL light-text">
        {{ task.description }}
      </p>
    </template>

    <template #subtasks>
      <span class="bodyM light-text">Subtasks({{ ' 0 of 3' }})</span>
      <div
        v-for="subtask in subtasks"
        :key="subtask.id"
      >
        <ModalElementSubtaskItem
          :subtask="subtask"
          :task-id="taskId"
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

const store = useMainStore()
const db = useDB()
const task: Task = store.selectedTask
const taskId = ref(task ? task.id : '')
const subtasks: Subtask[] = db.setSubtasksForTask()
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
