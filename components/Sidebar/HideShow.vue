<template>
  <div
    v-if="store.isSideBarVisible && !store.isMobileView"
    @click="toggleSidebarDisplay"
  >
    <SidebarItem class="menu-item-container hide">
      <template #icon-label>
        <Icon
          icon="hide-sidebar"
          class="icon"
        />
        <span class="headingM light-text">Hide sidebar</span>
      </template>
    </SidebarItem>
  </div>

  <div
    v-if="!store.isSideBarVisible"
    class="show-sidebar"
    @click="toggleSidebarDisplay"
  >
    <Icon
      icon="show-sidebar"
      class="icon"
    />
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'

const store = useMainStore()
const toggleSidebarDisplay = () => {
  store.isSideBarVisible = !store.isSideBarVisible
}
</script>

<style lang="scss" scoped>
.hide {
  position: absolute;
  width: 100%;
  transform: translateY(-90%);
}
.show-sidebar {
  position: fixed;
  width: 56px;
  transform: translateY(-90%);
  left: 0;
  padding: 18px;
  border-radius: 0 100px 100px 0;
  background-color: colors.$purple;
  z-index: 99;
  cursor: pointer;

  color: colors.$medgrey;

  &:hover {
    background-color: colors.$purplehover;
    svg {
      color: white;
      display: flex;
    }
  }
}
</style>
