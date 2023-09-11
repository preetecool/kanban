<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="svg-container"
  >
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.svg-container {
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 16px;
}
svg {
  display: block;
}
</style>
