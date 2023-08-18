<template>
    <div v-for="column in board.categories">
        <div class="column"></div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from "@/store/main";

    definePageMeta({
        layout: "dashboard",
    });

    let store = useMainStore();
    let board = store.activeBoard[0];

    let userBoards = ref([{}]);
    const route = useRoute();
    const params = route.params.id;
</script>

<style lang="scss" scoped>
    .column {
        background-color: black;
        height: 100%;
    }
</style>
