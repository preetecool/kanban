<template>
  <Dropdown view="mobilemenu">
    <template #icon>
      <div class="dropdown">
        <span class="headingXL heading">{{ store.activeBoard.title }} </span>
        <Icon icon="chevron-down" />
      </div>
    </template>
    <template #menu-items>
      <Sidebar class="mobile-menu" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
const isActive = (id: string) => id === store.activeBoard.id
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  flex-direction: row;
  gap: 8px;
  svg {
    margin-top: 11px;
  }
}
</style>
