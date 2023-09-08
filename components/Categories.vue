<template>
  <!-- <client-only> -->
  <div class="container">
    <div class="columns">
      <div v-for="(column, index) in categories">
        <div
          class="column"
          :key="index"
        >
          <span class="headingS light-text"> {{ column.title.toUpperCase() }} ({{ numTasks }}) </span>
          <TaskCard :tasks="column.task" />
        </div>

        <!-- <div class="column"></div> -->
      </div>
      <div
        class="new-col"
        @click="store.toggleModal('editBoard')"
      >
        <span class="headingXL light-text">+ New Column</span>
      </div>
    </div>
  </div>
  <!-- </client-only> -->
</template>

<script setup lang="ts">
import { Category } from '~~/types/app.types'
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'

const store = useMainStore()
const db = useDB()
let numTasks = ref(0)
let route = useRoute()
let params = route.params.id
let categories = ref(store.categoriesByBoard)
try {
  if (store.activeBoard.category.length !== 0) {
    store.activeBoard.category.forEach((category: Category) => {
      let id = category.id
      store.categoriesByBoard[id] = {
        ...category,
      }
    })
  }
} catch (error) {
  console.error('Failed to fetch categories', error)
  throw new Error()
}
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  flex-grow: 1;
  overflow: auto;
}
.column {
  flex-shrink: 0;
  height: 100%;
  width: 280px;
  padding: 24px;
}
.new-col {
  background-color: aqua;
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
