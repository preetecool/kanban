<template>
  <div
    class="pt-16 pl-2r"
    @click="store.toggleModal('newBoard')"
  >
    <li class="new-board">
      <IconOld name="circle-plus-solid" />
      <span class="headingM">Create New Board</span>
    </li>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'

const store = useMainStore()
</script>

<style lang="scss" scoped>
.new-board {
  display: flex;
  padding: 0;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  &:hover {
    color: colors.$purple;
  }
}
</style>
