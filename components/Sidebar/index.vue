<template>
  <div class="sidebar-container">
    <div
      v-if="store.isSideBarVisible"
      class="sidebar"
    >
      <SidebarBoardsList :boards="data" />
      <SidebarToggle />
    </div>
    <SidebarHideShow />
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
import type { RealtimeChannel } from '@supabase/supabase-js'

const client = useSupabaseClient()
let realtimeChannel: RealtimeChannel

const { data, refresh } = await useDB('fetchAllBoards')
store.userBoards = data

onMounted(() => {
  realtimeChannel = client
    .channel('public:board')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'board' }, () => refresh())
  realtimeChannel.subscribe()
})

onUnmounted(() => {
  client.removeChannel(realtimeChannel)
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
