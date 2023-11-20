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
      <span class="bodyM light-text">Subtasks({{ calculateSubtasks }})</span>
      <div
        v-for="subtask in subtasks"
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
import { useDBStore } from '@/store/db'

const store = useMainStore()
const db = useDBStore()
const task: Task = store.selectedTask
const taskId = ref(task ? task.id : '')
const subtasks: Subtask[] = db.setSubtasksForTask()

const calculateSubtasks = computed(() => {
  const numSubtasks = store.categoriesByBoard[store.selectedTask.category].task[0].subtask.length
  const numSubtasksCompleted = store.categoriesByBoard[store.selectedTask.category].task[0].subtask.filter(
    subtask => subtask.completed,
  ).length
  return `${numSubtasksCompleted} of ${numSubtasks} subtasks`
})
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
