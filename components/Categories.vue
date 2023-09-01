<template>
    <!-- <client-only> -->
    <div v-for="(column, index) in categories">
        <div class="column" :key="index">
            <span class="headingS light-text">
                {{ column.title.toUpperCase() }} ({{ numTasks }})
            </span>
            <TaskCard :tasks="column.task" />
        </div>
    </div>
    <!-- </client-only> -->
</template>

<script setup lang="ts">
    import { Category } from "~~/types/app.types";
    import { useMainStore } from "@/store/main";

    let store = useMainStore();

    let numTasks = ref(0);
    let route = useRoute();
    let params = route.params.id;
    let data: Category[] = await $fetch(`/api/category/${params}`);
    // categories.forEach((category) => store.categoriesByBoard.push(category));
    data.forEach((category: Category) => {
        let id = category.id;
        store.categoriesByBoard[id] = {
            ...category,
        };
    });
    let categories = ref(store.categoriesByBoard);

    console.log("categories", categories.value);
</script>

<style lang="scss" scoped>
    .column {
        height: 100%;
        width: 200px;
        padding: 24px;
        width: 280px;
    }
</style>
