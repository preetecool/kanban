<template>
    <Modal>
        <template #header>
            <div class="task-heading">
                <span class="headingL">{{ task?.title }}</span>
                <div class="icons">...</div>
            </div>
            <p class="bodyL" {{ task.description }}></p>
        </template>
        <template #subtasks>
            <span class="bodyM light-text">Subtasks({{ " 0 of 3" }})</span>
            <div>
                <span>
                    <!-- <SubtaskCard /> -->
                </span>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
    import { Task, Subtask } from "~~/types/app.types";

    const props = defineProps({
        task: {
            type: Object,
        },
    });
</script>

<style lang="scss" scpoped>
    .task-heading {
        display: flex;
    }
</style>
