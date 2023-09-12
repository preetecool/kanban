<template>
  <div
    v-for="task in tasks"
    :key="task.id"
    class="tasks"
  >
    <div
      class="headingM task-card"
      @click="store.toggleModal('viewTask', task.id)"
      draggable="true"
      @dragstart="dragStart($event, task)"
      @dragover.prevent
      @drop="drop($event, task)"
    >
      {{ task.title }}
    </div>

    <!-- <div>{{ `${numSubtaskCompleted} of ${numTotalSubTasks}` }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'

const store = useMainStore()

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})
let draggedTask: null = null
function dragStart(event, task) {
  draggedTask = task
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', JSON.stringify(task))
}
function drop(event, targetTask) {
  event.preventDefault()
  const droppedData = JSON.parse(event.dataTransfer.getData('text/plain'))

  // Find the indices of the dragged and target tasks
  const fromIndex = props.tasks.findIndex(t => t.id === draggedTask.id)
  const toIndex = props.tasks.findIndex(t => t.id === targetTask.id)

  // Move the dragged task to the target position
  if (fromIndex !== toIndex) {
    props.tasks.splice(fromIndex, 1)
    props.tasks.splice(toIndex, 0, draggedTask)
  }

  draggedTask = null // Reset
}

// let tasks: Ref<Task[]> = ref([]);
</script>

<style lang="scss" scoped>
.tasks {
  padding: 24px 0px;
  cursor: pointer;
}
.task-card {
  padding: 23px 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
  &:hover {
    border: 1px solid var(--lines-color);
  }
  cursor: move;
}
.task-card.over {
  border: 2px dashed #000;
}
</style>
