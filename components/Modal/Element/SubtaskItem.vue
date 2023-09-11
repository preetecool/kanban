<template>
  <div class="subtask">
    <input
      :id="subtask.id"
      type="checkbox"
      :checked="taskCompleted"
      name="isCompleted"
      @change="updateSubtask"
    />
    <label
      :for="subtask.id"
      class="subtask__text"
      :class="{ subtask__completed: taskCompleted }"
    >
      {{ subtask.title }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDB } from '@/store/db'
const props = defineProps({
  subtask: {
    type: Object,
    default: () => {},
  },
  taskId: {
    type: String,
    default: '',
  },
})

const db = useDB()
const taskCompleted: Ref<boolean> = ref(props.subtask.completed)
const subtaskId: string = props.subtask.id
async function updateSubtask() {
  taskCompleted.value = !taskCompleted.value
  try {
    await db.updateSubtask(subtaskId, taskCompleted.value)
  } catch (e) {
    console.error(e)
    taskCompleted.value = !taskCompleted.value
  }
}
</script>

<style lang="scss" scpoped>
.subtask {
  display: flex;
  gap: 16px;
  padding: 13px;

  border-radius: 4px;
  input {
    width: 16px;
    height: 16px;
    min-width: auto;
    min-height: auto;
    accent-color: colors.$purple;
    border-radius: 2px;
  }
  &__text {
    font-size: 12px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
  &__completed {
    text-decoration: line-through;
    // color: #00000050;
  }
}
</style>
