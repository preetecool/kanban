<template>
  <div
    @mouseenter="toggle(true)"
    @mouseleave="toggle(false)"
    @click="menu = !menu"
    class="menu"
  >
    <slot name="icon"></slot>

    <div
      class="menu-list"
      v-if="menu"
      :class="{ 'menu-list__mobilemenu': view === 'mobilemenu', 'menu-list__editmenu': view !== 'mobilemnu' }"
    >
      <ul class="menu-list__menu bodyL">
        <div class="menu-list__item">
          <slot name="menu-items"> </slot>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
let menu = ref(false)

const toggle = (bool: boolean) => {
  if (!store.isMobileView) {
    menu.value = bool
  }
}

const props = defineProps({
  view: {
    type: String,
  },
})
</script>

<style scoped lang="scss">
.menu {
  position: relative;
  border-radius: 8px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  z-index: 1;
  &__editmenu {
    position: absolute;
    top: 15px;
    right: 0;
    width: 160px;
    border: 1px solid var(--lines-colors);
  }
  &__mobilemenu {
    // width: 100%;
    width: 264px;

    top: 3.5rem;
    left: 1rem;
  }
}
</style>
