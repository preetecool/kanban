<template>
  <li>
    <div class="board-item pl-2r">
      <div class="item-wrap">
        <slot name="icon-label"></slot>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.board-item {
  margin-top: 1px;
  display: flex;
  height: 3rem;
}
.item-wrap {
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
  color: colors.$medgrey;
}

.item-wrap > a {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-grow: 1;
}
</style>
