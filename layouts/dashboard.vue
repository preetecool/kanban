<template>
  <div
    class="main-div"
    :class="[store.theme]"
  >
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
      :class="{ 'main-grid__no-sidebar': !store.isSideBarVisible }"
    >
      <div
        v-if="width > 600"
        class="logo pl-2r"
      >
        <img :src="`/img/logo-${logo}.svg`" />
      </div>
      <MobileHeader v-if="width < 600" />
      <Sidebar
        v-if="width > 600"
        class="sidebar"
      />

      <Header
        v-if="width > 600"
        class="header"
      />

      <div
        v-if="route.path === '/' || store.activeBoard.category.length === 0"
        class="body"
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
        v-else
        class="body"
      >
        <div class="body__columns-grid">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { useDBStore } from '@/store/db'
const store = useMainStore()
const db = useDBStore()
const route = useRoute()
const logo = computed(() => (store.theme === 'light' ? 'dark' : 'light'))

const width = ref(window.innerWidth)
watch(width, () => {})

onMounted(() => {
  const handleResize = () => {
    width.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(() => {
  setTimeout(() => {
    if (window.innerWidth < 500) {
      store.isMobileView = true
    } else {
      store.isMobileView = false
    }
  }, 2000)
})
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
  @media (max-width: 600px) {
    grid-template-areas:
      'mobile_logo mobile_header'
      'columns columns';
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
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    p {
      text-align: center;
    }
    .button {
      max-width: 250px;
    }
    @media screen and (max-width: 600px) {
      // display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__columns-grid {
    overflow: auto;
    // display: flex;
  }
}
</style>
