<template>
  <div class="mobile-header">
    <div class="menu pl-2r">
      <DropdownMobileMenu />
      <!-- <img src="/img/logo-mobile.svg" />
      <div class="dropdown">
        <span class="headingXL heading">{{ store.activeBoard.title }} </span>
        <Icon icon="chevron-down" /> -->
      <!-- </div> -->
    </div>
    <div class="settings pr-2r">
      <div
        class="add-task"
        @click="store.toggleModal('newTask')"
      >
        <Icon icon="add-task-mobile" />
      </div>
      <DropdownEdit
        :id="store.activeBoard.id"
        view="board"
        menu-text="Board"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
</script>
<style lang="scss" scoped>
.mobile-header {
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.menu {
  display: flex;
  gap: 16px;
}
.dropdown {
  display: flex;
  flex-direction: row;
  gap: 8px;
  svg {
    margin-top: 11px;
  }
}
.settings {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.add-task {
  width: 48px;
  height: 32px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: colors.$purple;
  &:active {
    background-color: colors.$purplehover;
  }
}
</style>
