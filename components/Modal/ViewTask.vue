<template>
    <Modal>
        <template #header>
            <div class="task-heading">
                <span class="headingL">{{ task[0].title }}</span>
                <div class="icons">...</div>
            </div>
            <p class="bodyL light-text">{{ task[0].description }}</p>
        </template>
        <template #subtasks>
            <span class="bodyM light-text">Subtasks({{ " 0 of 3" }})</span>
            <div v-for="(subtask, index) in subtasks">
                <ModalSubtaskItem :subtask="subtask" :taskId="taskId" :key="index" />
            </div>
        </template>
        <template #status>
            <span class="bodyM light-text">Status</span>
            <select name="status" v-model="selected" @change="setNewStatus">
                <option
                    v-for="(category, index) in store.categoriesByBoard"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.title }}
                </option>
            </select>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
    import { Task, Subtask } from "~~/types/app.types";
    import { useMainStore } from "@/store/main";

    let store = useMainStore();

    let task = store.selectedTask;

    let taskId: string | undefined;
    let subtasks: Subtask[];
    // let selected = ref(0);
    let selected = ref(task[0].category);

    if (task) {
        taskId = task[0].id;
    }
    if (taskId != undefined) {
        try {
            subtasks = await $fetch(`/api/task/${task[0].id}/subtasks`);
        } catch (e) {
            console.log("Error fetching subtasks", e);
        }
    }

    async function setNewStatus() {
        await $fetch(`/api/task/update/${taskId}`, {
            method: "PATCH",
            body: {
                category: selected.value,
            },
        });
    }
</script>

<style lang="scss" scpoped>
    .task-heading {
        display: flex;
        justify-content: space-between;
    }
</style>
