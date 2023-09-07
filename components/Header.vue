<template>
  <!-- <div class="logo pl-2r">
    <img :src="`/img/logo-${logo}.svg`" />
  </div> -->
  <div class="header-container">
    <div class="header">
      <div class="headingXL heading">{{ store.activeBoard.title }}</div>

      <div class="settings">
        <div class="actions">
          <UIButton
            label="+ Add New Task"
            @click="store.toggleModal('newTask')"
          />
          <UIEditDropdown
            view="editBoard"
            menuText="Board"
            :id="params as string"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { Board } from '~~/types/app.types'

const store = useMainStore()
const route = useRoute()
const params = route.params.id
</script>

<style scoped lang="scss">
img {
  padding-right: 32px;
}
.header-container {
  border-bottom: 1px solid var(--lines-color);
}
.header {
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-height: 6rem;
  height: 100%;
  /* max-width: 1140px; */
  flex-grow: 1;
}

.heading {
  flex: 1;
  margin-left: 1.5rem;
}
.settings {
  display: flex;
  height: 100%;
  padding-right: 2rem;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex: 0 0 auto;
  height: 100%;
}
</style>
