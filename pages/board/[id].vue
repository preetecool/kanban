<template>
  <NuxtLayout
    :key="route.fullPath"
    name="dashboard"
  >
    <Categories />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
const route = useRoute()
</script>
