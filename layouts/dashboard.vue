<template>
  <IconMain />
  <!-- <Modal v-if="store.modal === true" /> -->
  <ModalBoard v-if="store.modal['newBoard'] === true" />
  <ModalEditBoard v-if="store.modal['editBoard'] === true && !db.isLoadingData" />
  <ModalCreateTask v-if="store.modal['newTask'] === true" />
  <ModalViewTask v-if="store.modal['viewTask'] === true && !db.isLoadingData" />
  <ModalEditTask v-if="store.modal['editTask'] === true && !db.isLoadingData" />
  <ModalDelete v-if="store.modal['deleteView'] === true" />

  <div
    class="main-grid"
    :class="store.theme"
  >
    <Sidebar class="sidebar" />

    <Header class="header" />

    <div
      class="body"
      v-if="route.path === '/' || store.activeBoard.category.length === 0"
    >
      <div class="body__new-column">
        <UIButton
          v-if="route.path !== '/'"
          label="+ Add New Column"
          @click="store.toggleModal('editBoard')"
        />
        <UIButton
          v-else
          label="+ Add New Board"
          @click="store.toggleModal('newBoard')"
        />
      </div>
    </div>

    <div
      class="body"
      v-else
    >
      <div class="columns-grid">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { useDB } from '@/store/db'
const store = useMainStore()
const db = useDB()
const route = useRoute()
</script>

<style lang="scss" scoped>
span {
  color: colors.$medgrey;
}
.main-grid {
  height: 100vh;
  // overflow-y: auto;
  background-color: colors.$lightgrey;
  display: grid;
  grid-template-columns: minmax(261px, 300px) 1fr;
  grid-template-rows: 6rem 1fr;
  grid-template-areas:
    'sidebar header'
    'sidebar columns';
  @media (max-width: 768px) {
    grid-template-columns: 261px 1fr;
  }
}

.body {
  display: flex;
  grid-area: columns;
  overflow: auto;
  &__new-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
  &__columns-grid {
    flex-direction: row;
  }
}
</style>
