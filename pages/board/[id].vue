<template>
    <client-only>
        <div v-for="column in categories">
            <div class="column">
                <span class="headingS light-text">{{ column.name.toUpperCase() }} ({{ numTasks }})</span>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
    import { useMainStore } from "@/store/main";
    definePageMeta({
        layout: "dashboard",
    });

    let store = useMainStore();
    let categories = ref([{}]);
    let numTasks = ref(0);

    try {
        categories = store.activeBoard[0].categories_and_tasks;
    } catch (error) {
        throw error;
    }
</script>

<style lang="scss" scoped>
    .column {
        // background-color: black;
        height: 100%;
        width: 200px;
        padding: 24px;
        width: 280px;
    }
</style>
