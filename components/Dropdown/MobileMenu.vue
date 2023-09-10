<template>
  <Dropdown view="mobilemenu">
    <template #icon>
      <div class="dropdown">
        <span class="headingXL heading">{{ store.activeBoard.title }} </span>
        <Icon icon="chevron-down" />
      </div>
    </template>
    <template #menu-items>
      <span class="allboards pl-2r lighttext">ALL BOARDS ({{ store.userBoards?.length }})</span>
      <SidebarItem
        v-for="board in store.userBoards"
        class="item-container"
        :key="board.title"
        :class="{ 'item-container__active': isActive(board.id) }"
      >
        <template #icon-label>
          <Icon
            icon="board"
            class="icon"
          />
          <SidebarLink
            class="link"
            :id="board.id"
            :label="board.title"
          />
        </template>
      </SidebarItem>
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
.item-container {
  border-radius: 0 100px 100px 0;
  max-width: 90%;
  cursor: pointer;
  &:hover {
    svg,
    span,
    a {
      color: colors.$purple;
    }
    background-color: colors.$purplehover;
  }
  &__active {
    background-color: colors.$purple;
    a,
    svg {
      color: colors.$white;
    }
    &:hover {
      background-color: colors.$purplehover;
      fill: colors.$white;
      color: colors.$purple;
    }
  }
}
.stuff {
  position: relative;
}
.item {
  border-radius: 8px;
  padding: 8px 16px;
  justify-self: center;
  &:hover {
    cursor: pointer;
    background-color: colors.$lightgrey;
  }
}
</style>
