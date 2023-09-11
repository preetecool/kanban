<template>
  <div class="sidebar-container">
    <!-- <transition name="slide"> -->
    <div
      class="sidebar"
      v-if="store.isSideBarVisible"
    >
      <SidebarBoardsList :boards="boards" />
      <SidebarToggle />
    </div>
    <!-- </transition> -->
    <SidebarHideShow />
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

const { data: boards, refresh: refreshBoards } = await useAsyncData('board', async () => {
  // if (!store.userBoards.length) {
  const data: Board[] = await db.fetchAllBoards()
  store.userBoards = data
  // }
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
  border-right: 1px solid var(--lines-color);
}
.sidebar {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: colors.$white;
  overflow-y: auto;
  padding-bottom: 2rem;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 261px;

    padding-bottom: 0;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-90%);
}
</style>
