<template>
  <div
    @mouseenter="menu = true"
    @mouseleave="menu = false"
    class="menu"
  >
    <slot name="icon"></slot>

    <div
      class="menu-list"
      v-if="menu"
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
let menu = ref(false)
</script>

<style scoped lang="scss">
.menu {
  position: relative;
}

.menu-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 160px;
  top: 11px;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;

  &__menu {
    // gap: 20px;
    // border-radius: 8px;
  }
  // &__item:first-child {
  //   padding-top: 16px;
  // }
  // &__item:last-child {
  //   padding-bottom: 16px;
  // }
}
</style>
