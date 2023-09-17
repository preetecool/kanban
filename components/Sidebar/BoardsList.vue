<template>
  <div class="boards">
    <span class="allboards pl-2r">ALL BOARDS ({{ boards?.length }})</span>
    <div>
      <ul class="">
        <SidebarItem
          v-for="board in boards"
          :key="board.title"
          class="menu-item-container"
          :class="{ 'menu-item-container__active': isActive(board.id) }"
        >
          <template #icon-label>
            <Icon
              icon="board"
              class="icon"
            />
            <SidebarLink
              :id="board.id"
              class="link"
              :label="board.title"
            />
          </template>
        </SidebarItem>
        <SidebarNewBoard />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
const props = defineProps({
  boards: {
    type: Array,
    default: [],
  },
})
const isActive = (id: string) => id === store.activeBoard.id
</script>

<style scoped lang="scss">
.boards {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.allboards {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2.4px;
  color: colors.$medgrey;
}
.menu-item-container {
  color: #828fa3;
  &__active {
    span,
    a,
    .icon {
      color: colors.$white;
    }
  }
}
</style>
