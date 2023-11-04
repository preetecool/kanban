<template>
  <div class="sidebar-container">
    <div
      v-if="store.isSideBarVisible"
      class="sidebar"
    >
      <SidebarBoardsList :boards="store.userBoards" />
      <SidebarToggle />
    </div>
    <SidebarHideShow />
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/store/main'
import type { RealtimeChannel } from '@supabase/supabase-js'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()
let refreshBoards
let realtimeChannel: RealtimeChannel
const boards = ref([])

const { data } = await useDB('fetchAllBoards')
watch(
  boards,
  async () => {
    await useAsyncData('board', async () => {
      const { data, refresh } = await useDB('fetchAllBoards')
      boards.value = data.value
      refreshBoards = refresh
      return data
    })
    useDBRefresh(refreshBoards, 'board')
  },
  { immediate: true },
)
store.userBoards = data
onMounted(() => {})
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
