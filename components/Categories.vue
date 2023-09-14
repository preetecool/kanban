<template>
  <div class="container">
    <div class="columns">
      <div
        v-for="(column, index) in categories"
        :key="index"
        @drop="dragDrop($event, column.id)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="column">
          <span class="headingS light-text"> {{ column.title.toUpperCase() }} ({{ column.task.length }}) </span>

          <TaskCard
            v-for="(task, index) in column.task"
            :task="task"
            draggable
            @dragstart="dragStart($event, task)"
          />
        </div>
      </div>
      <div
        class="new-col"
        @click="store.toggleModal('editBoard')"
      >
        <span class="headingXL light-text">+ New Column</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category, Task } from '~~/types/app.types'
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'

const store = useMainStore()
const db = useDB()
const route = useRoute()
const params = route.params.id
const categories = ref(store.categoriesByBoard)

try {
  if (store.activeBoard.category.length !== 0) {
    store.activeBoard.category.forEach((category: Category) => {
      const id = category.id
      store.categoriesByBoard[id] = {
        ...category,
      }
    })
  }
} catch (error) {
  console.error('Failed to fetch categories', error)
  throw new Error()
}
function dragStart(event: DragEvent, task: Task) {
  store.selectedTask = task
}
// console.log(categories.value)

function dragDrop(event: DragEvent, columnId: Category['id']) {
  let start_column = store.selectedTask.category

  const task_arr = categories.value[start_column].task
  for (let i = 0; i < task_arr.length; ++i) {
    if (task_arr[i].id === store.selectedTask.id) {
      task_arr.splice(i, 1)
    }
    store.selectedTask.category = columnId
  }

  categories.value[columnId].task.push(store.selectedTask)
  let taskId = store.selectedTask.id
  db.updateTask(taskId, columnId)
  store.selectedTask = null
}
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  flex-grow: 1;
  overflow: auto;
  min-height: 50vh;
}
.column {
  flex-shrink: 0;
  height: 100%;
  width: 280px;
  padding: 24px;
}
.new-col {
  min-width: 280px;
  max-width: 280px;
  // height: calc()
  height: calc(100vh - 7rem - 24px);
  max-height: 100vh;
  margin-top: 24px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    span {
      color: colors.$purplehover;
    }
    border: 1px solid var(--lines-color);
    box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 2px;
    cursor: pointer;
  }
}
</style>
