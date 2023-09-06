<template>
  <div class="sidebar">
    <div class="logo pl-2r">
      <img :src="`/img/logo-${logo}.svg`" />
    </div>
    <div class="boards">
      <span class="allboards pl-2r">ALL BOARDS ({{ boards?.length }})</span>
      <div>
        <ul v-for="board in boards">
          <SidebarItem
            :name="board.title"
            :id="board.id"
          />
        </ul>

        <div
          class="pt-16 pl-2r"
          @click="store.toggleModal('newBoard')"
        >
          <ul class="headingM">
            <IconOld name="circle-plus-solid" />
            <span>Create New Board</span>
          </ul>
        </div>
      </div>
    </div>
    <SidebarToggle />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'
import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

const store = useMainStore()
const db = useDB()
const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()
const route = useRoute()
let channel: RealtimeChannel
const params = route.params.id
const logo = computed(() => {
  if (store.theme === 'light') return 'dark'
  return 'light'
})

const { data: boards, refresh: refreshBoards } = await useAsyncData('board', async () => {
  const data = await db.fetchAllBoards()
  return data
})
store.userBoards = boards

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
.sidebar {
  height: 100vh;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: colors.$white;
  // padding-left: 2rem;
  border-right: 1px solid var(--lines-color);
  grid-area: sidebar;
}
.logo {
  display: flex;
  box-sizing: border-box;

  flex: 0 0 auto;
  height: 6rem;

  align-items: center;
}

.boards {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  // position: absolute;
  width: 100%;
}

.allboards {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2.4px;
  color: colors.$medgrey;
  // padding-bottom: 2rem;
}
ul {
  padding: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  color: colors.$medgrey;
  cursor: pointer;
}
</style>
