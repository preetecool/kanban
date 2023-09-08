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
    :class="[store.theme, { 'main-grid__no-sidebar': !store.isSideBarVisible }]"
  >
    <div class="logo pl-2r">
      <img :src="`/img/logo-${logo}.svg`" />
    </div>
    <Sidebar class="sidebar" />

    <Header class="header" />

    <div
      class="body"
      v-if="route.path === '/' || store.activeBoard.category.length === 0"
    >
      <div
        v-if="route.path !== '/'"
        class="body__new-column"
      >
        <p class="light-text text">Add a column to get started.</p>
        <UIButton
          label="+ Add New Column"
          @click="store.toggleModal('editBoard')"
        />
      </div>

      <div
        v-else
        class="body__new-column"
      >
        <p class="light-text text">There's no board here. Add or navigate to one using the sidebar.</p>
        <UIButton
          label="+ Add New Board"
          @click="store.toggleModal('newBoard')"
        />
      </div>
    </div>

    <div
      class="body"
      v-else
    >
      <div class="body__columns-grid">
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
const logo = computed(() => (store.theme === 'light' ? 'dark' : 'light'))
</script>

<style lang="scss" scoped>
span {
  color: colors.$medgrey;
}
.main-grid {
  height: 100vh;
  position: relative;
  // background-color: colors.$lightgrey;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 6rem 1fr;
  grid-template-areas:
    'logo header'
    'sidebar columns';

  &__no-sidebar {
    grid-template-areas:
      'logo header'
      'columns columns';
    .logo {
      border-bottom: 1px solid var(--lines-color);
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 261px 1fr;
  }
}
.text {
  padding-bottom: 10px;
}
.logo {
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid var(--lines-color);
}
.body {
  display: flex;
  flex-grow: 1;
  grid-area: columns;
  overflow: auto;
  width: 100%;

  &__new-column {
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
  &__columns-grid {
    overflow: auto;
    // display: flex;
  }
}
</style>
