<template>
  <div
    v-for="task in tasks"
    :key="task.id"
    class="tasks"
  >
    <div
      class="headingM task-card"
      @click="store.toggleModal('viewTask', task.id)"
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
}
</style>
