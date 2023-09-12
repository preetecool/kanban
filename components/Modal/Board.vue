<template>
  <Modal modal-type="newBoard">
    <template #header>
      <span class="headingL">Create a new board</span>
      <span class="bodyM-thin light-text"> Organize your tasks by creating columns! </span>
    </template>

    <template #form-content-title>
      <span class="bodyM light-text">Name</span>
      <input
        v-model="boardName"
        type="text"
        placeholder="Enter a name for your board"
      />
    </template>

    <template #form-content-input>
      <span class="bodyM light-text">Column</span>
      <ModalList />
    </template>

    <template #submit-button>
      <UIButton
        label="Create Board"
        @click="sendData()"
      />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'
import { uuid } from 'vue-uuid'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { Database } from '~~/types/database.types'

const store = useMainStore()
const db = useDB()
const boardName = ref('')
const titles = ref([])
let refreshCategoriesRef = null
let refreshBoardsRef = null
let channel: RealtimeChannel
const supabase = useSupabaseClient<Database>()

console.log(store.inputItems)
async function sendData() {
  store.inputItems.forEach(item => {
    titles.value.push(item.title)
  })

  if (!boardName.value) {
    return console.error('Board name is Empty')
  }
  const boardId = uuid.v4()

  try {
    const { data: newBoards, refresh: refreshBoards } = await useAsyncData(
      'updatedCategories',
      async () => {
        return await db.postBoard(boardId, boardName.value)
      },
      {
        transform: response => response.body,
      },
    )
    refreshBoardsRef = refreshBoards
  } catch (error) {
    console.error('Error while creating a new board', error)
    throw new Error()
  } finally {
    await db.fetchAllBoards()
  }

  try {
    const { data: newCategories, refresh: refreshCategories } = await useAsyncData(
      'updatedCategories',
      async () => {
        return await db.postCategory(boardId, titles.value)
      },
      {
        transform: response => response.body,
      },
    )
    refreshCategoriesRef = refreshCategories
  } catch (error) {
    console.error('Error while creating categories', error)
    throw new Error()
  } finally {
    const router = useRouter()
    router.push(`/board/${boardId}`)
  }
  store.closeModal()
}

onMounted(() => {
  channel = supabase
    .channel('public:category')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'category' }, () => {
      if (refreshCategoriesRef) {
        refreshCategoriesRef()
      }
    })
  channel = supabase
    .channel('public:boards')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'boards' }, () => {
      if (refreshBoardsRef) {
        refreshBoardsRef()
      }
    })

  channel.subscribe()
})

onUnmounted(() => {
  supabase.removeChannel(channel)
})
</script>

<style lang="scss" scoped></style>
