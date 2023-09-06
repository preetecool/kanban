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
      <span class="bodyM light-text">Title</span>
      <input
        type="text"
        placeholder="Enter a name for your board"
        v-model="boardName"
      />
    </template>

    <template #form-content-input>
      <span class="bodyM light-text">Columns</span>
      <div
        v-for="(item, index) in store.activeBoard.category"
        :key="index"
      >
        <ModalElementColumnItem v-model:item-name="item.title">
          <IconOld
            @click="removeColumn(index)"
            name="icon-cross"
            class="cross"
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
import { useDB } from '@/store/db'

let store = useMainStore()
let db = useDB()
let route = useRoute()
store.inputItems = []
let board = store.activeBoard
const boardId = ref(board ? board.id : '')
const boardName = ref(board ? board.title : '')
let boardNameisChanged = ref(false)

watch(boardName, async () => {
  if (board.title !== boardName.value) {
    board.title = boardName.value
    let boardIndex = store.userBoards.findIndex(item => item.id === route.params.id)
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
console.log(store.userBoards)
async function updateboard() {
  try {
    // const { data: updatedBoard } = useAsyncData('board', async () => {
    if (boardNameisChanged.value === true) {
      store.activeBoard.title = boardName.value

      await db.updateBoard(boardId.value, boardName.value)
    }
    // })
  } catch (error) {
    console.error('Error updating board:', error)
    throw new Error()
  }
  // try {
  //   let route = useRoute()
  //   let titles: [] = []

  //   // store.inputItems.forEach((item) => {
  //   // 	titles.push(item.title);
  //   // });
  //   // const { data: categories } = useAsyncData("board", async () => {
  //   // 	await $fetch("/api/category/post/", {
  //   // 		method: "POST",
  //   // 		body: {
  //   // 			board: route.params.id,
  //   // 			titles: titles
  //   // 			// title: title,
  //   // 		}
  //   // 	});
  //   // });
  // } catch (error) {
  //   console.error('Error updating board:', error)
  //   throw new Error()
  // } finally {
  //   store.closeModal()
  // }
}
</script>
