<template>
  <NuxtLink
    :to="`/board/${id}`"
    class="headingM light-text link"
  >
    <span class="headingM">{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.link {
  width: 100%;
  display: flex;
  height: 100%;
}
span {
  margin: auto 0;
}
</style>
