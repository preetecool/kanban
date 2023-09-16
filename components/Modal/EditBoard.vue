<template>
  <Modal
    v-if="store.modal.editBoard"
    :items="[]"
  >
    <template #header>
      <div class="board-heading">
        <span class="headingL">Edit Board</span>
      </div>
    </template>

    <template #form-content-title>
      <span class="bodyM">Title</span>
      <input
        v-model="boardName"
        type="text"
        placeholder="Enter a name for your board"
      />
    </template>

    <template #form-content-input>
      <span class="bodyM light-text">Columns</span>
      <div
        v-for="(item, index) in store.activeBoard.category"
        :key="index"
      >
        <ModalElementColumnItem
          v-model:item-name="item.title"
          @input="debounceInput(item.id, item.title)"
        >
          <Icon
            icon="cross"
            class="cross"
            @click="removeColumn(index)"
          />
        </ModalElementColumnItem>
      </div>
    </template>

    <template #submit-button>
      <UIButton
        label="Save board"
        @click="updateboard()"
      />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { Board, Category } from '~~/types/app.types'
import { useMainStore } from '@/store/main'
import { useDBStore } from '@/store/db'
import { Database } from '~~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

const store = useMainStore()
const db = useDBStore()
const route = useRoute()
store.inputItems = []
const board: { category: Category[]; [key: string]: any } = store.activeBoard
const boardId = ref(board ? board.id : '')
const boardName = ref(board ? board.title : '')
const boardNameisChanged = ref(false)
let channel: RealtimeChannel
const supabase = useSupabaseClient<Database>()
let refreshCategoriesRef = null

watch(boardName, async () => {
  if (board.title !== boardName.value) {
    board.title = boardName.value
    const boardIndex = store.userBoards.findIndex(item => item.id === route.params.id)
    store.userBoards[boardIndex].title = boardName.value
    boardNameisChanged.value = true
  }
})
function removeColumn(index: number) {
  if (store.activeBoard.category[index].id) {
    db.deleteCategory(store.activeBoard.category[index].id)
  }
  store.activeBoard.category.splice(index, 1)
  return store.activeBoard.category
}

let isTyping = null

function debounceInput(id: string, title: string) {
  clearTimeout(isTyping)

  isTyping = setTimeout(() => {
    submitCategoryUpdate(id, title)
    console.log('user has finished typing')
  }, 500)
}

async function submitCategoryUpdate(id: string, title: string) {
  store.categoriesByBoard[id].title = title
  await db.updateCategory(id, title)
}

async function updateboard() {
  if (boardNameisChanged.value === true) {
    const { data: updatedBoard } = await useAsyncData('updatedBoard', async () => {
      const data = await db.updateBoard(boardId.value, boardName.value)
      return data
    })
  }

  if (store.inputItems.length > 0) {
    const titles: string[] = []
    store.inputItems.forEach((category: Category) => {
      titles.push(category.title)
    })

    const { data: newCategories, refresh: refreshCategories } = await useAsyncData('updatedCategories', async () => {
      const route = useRoute()
      const data = await db.postCategory(boardId.value, titles)
      return data
    })

    refreshCategoriesRef = refreshCategories
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
  channel.subscribe()
})

onUnmounted(() => {
  supabase.removeChannel(channel)
})
</script>
