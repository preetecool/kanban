<template>
  <!-- <client-only> -->
  <div class="container-column">
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
.container-column {
  display: flex;
  flex-grow: 1;
  overflow-x: auto;
}
.column {
  flex-shrink: 0;
  height: 100%;
  width: 280px;
  padding: 24px;
}
</style>
