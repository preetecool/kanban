<template>
  <div class="sidebar-container">
    <div
      class="sidebar"
      v-if="isSideBarVisible"
    >
      <div class="logo pl-2r">
        <img :src="`/img/logo-${logo}.svg`" />
      </div>
      <div class="boards">
        <span class="allboards pl-2r">ALL BOARDS ({{ boards?.length }})</span>
        <div>
          <ul class="">
            <SidebarItem
              v-for="board in boards"
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
            <SidebarNewBoard />
          </ul>
        </div>
      </div>
      <SidebarToggle />

      <SidebarItem
        @click="toggleSidebarDisplay"
        class="item-container hide"
      >
        <template #icon-label>
          <Icon
            icon="hide-sidebar"
            class="icon"
          />
          <span class="headingM light-text">Hide sidebar</span>
        </template>
      </SidebarItem>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'
import { Board } from '~~/types/app.types'
import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

const store = useMainStore()
const db = useDB()
const supabase = useSupabaseClient<Database>()
let channel: RealtimeChannel
let isSideBarVisible = ref(true)
const logo = computed(() => (store.theme === 'light' ? 'dark' : 'light'))
const isActive = (id: string) => id === store.activeBoard.id
const toggleSidebarDisplay = () => {
  isSideBarVisible.value = !isSideBarVisible.value
}
const { data: boards, refresh: refreshBoards } = await useAsyncData('board', async () => {
  if (!store.userBoards.length) {
    const data: Board[] = await db.fetchAllBoards()
    store.userBoards = data
  }
  return store.userBoards
})

onMounted(() => {
  channel = supabase
    .channel('public:board')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'board' }, () => refreshBoards())
  channel.subscribe()
})

onUnmounted(() => {
  supabase.removeChannel(channel)
})
</script>

<style scoped lang="scss">
.sidebar-container {
  position: sticky;
  top: 0;
  overflow-y: auto;
  grid-area: sidebar;
}

.logo {
  height: 6rem;
  display: flex;
  align-items: center;
}

.sidebar {
  flex-grow: 1;
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: colors.$white;
  border-right: 1px solid var(--lines-color);
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    width: 261px;
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
.icon {
  color: #828fa3;
}
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
.hide {
  margin-bottom: 30px;
}
</style>
