<template>
  <li>
    <div class="item pl-2r">
      <div class="item-wrap">
        <slot name="icon-label" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const store = useMainStore()
</script>
<style scoped lang="scss">
.item {
  margin-top: 1px;
  display: flex;
  height: 3rem;
}
.item-wrap {
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
}
.item-wrap > a {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-grow: 1;
}
</style>
