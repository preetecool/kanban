<template>
  <div class="tasks">
    <div
      class="task-card"
      @click="store.toggleModal('viewTask', task.id)"
    >
      <span class="headingM"> {{ task.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'

const store = useMainStore()

const props = defineProps({
  task: {
    type: Object,
    default: {},
  },
})
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
