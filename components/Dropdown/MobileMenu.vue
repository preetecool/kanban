<template>
  <Dropdown>
    <template #icon>
      <div class="dropdown">
        <span class="headingXL heading">{{ store.activeBoard.title }} </span>
        <Icon icon="chevron-down" />
      </div>
    </template>
    <!-- <div class="stuff"> -->
    <template #menu-items>
      <div v-for="item in store.userBoards">
        <li @click="navigateTo(`/board/${item.id}`)">
          <span class="light-text">{{ item.title }}</span>
        </li>
      </div>
    </template>
    <!-- </div> -->
  </Dropdown>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
</script>

<style lang="scss">
.dropdown {
  display: flex;
  flex-direction: row;
  gap: 8px;
  svg {
    margin-top: 11px;
  }
}
.stuff {
  position: relative;
}
</style>
