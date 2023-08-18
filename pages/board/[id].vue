<template></template>

<script setup lang="ts">
    import { useMainStore } from "@/store/main";
    import { storeToRefs } from "pinia";
    definePageMeta({
        layout: "dashboard",
    });
    let store = useMainStore();
    const route = useRoute();
    store.setActiveBoard(Number(route.params.id));

    let boards = localStorage.getItem("boards");
</script>

<style lang="scss" scoped></style>
