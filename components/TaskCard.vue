<template>
  <div class="tasks">
    <div
      :draggable="draggable"
      class="task-card"
      @click="store.toggleModal('viewTask', task.id)"
    >
      <span class="headingM"> {{ task.title }}</span>
      <span class="bodyM light-text">{{ calculateSubtasks }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'

const store = useMainStore()

const props = defineProps({
  task: {
    type: Function,
    default: () => {},
  },
  draggable: {
    type: Boolean,
    default: true,
  },
})
const calculateSubtasks = computed(() => {
  const numSubtasks = props.task.subtask.length
  const numSubtasksCompleted = props.task.subtask.filter(subtask => subtask.completed).length
  return `${numSubtasksCompleted} of ${numSubtasks} subtasks`
})
</script>

<style lang="scss" scoped>
.tasks {
  padding: 24px 0px;
  cursor: pointer;
}
.task-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 23px 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  user-select: none;
  &:hover {
    border: 1px solid var(--lines-color);
  }
  // cursor: move;
}
.task-card.over {
  border: 2px dashed #000;
}
</style>
