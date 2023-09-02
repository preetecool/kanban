<template>
    <Modal v-if="store.modal.editTask" :items="subtasks">
        <template #header>
            <div class="task-heading">
                <span class="headingL">Edit Task</span>
            </div>
        </template>

        <template #form-content-title>
            <span class="bodyM light-text">Title</span>
            <input
                type="text"
                placeholder="Enter a name for your board"
                v-model="taskName"
            />
        </template>

        <template #form-content-input :items="subtasks">
            <span class="bodyM light-text">Subtasks</span>
        </template>

        <template #description>
            <span class="bodyM light-text">Description</span>
            <textarea
                type="text"
                class="input description"
                rows="4"
                cols="50"
                placeholder="Write a description for your task"
                v-model="description"
            />
        </template>

        <template #status>
            <ModalElementStatusInput />
        </template>

        <template #submit-button>
            <UIButton label="Save Task" @click="updateTask()"></UIButton>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
    import { Task, Subtask } from "~~/types/app.types";
    import { useMainStore } from "@/store/main";
    import { useDB } from "@/store/db";

    let store = useMainStore();
    let task = store.selectedTask;

    let subtasks: Subtask[] = task.subtask;
    (store.inputItems as Subtask[]) = store.selectedTask.subtask;

    let db = useDB();

    const taskId = ref(task ? task.id : "");
    const selected = ref(task ? task.category : "");
    const taskName = ref(task ? task.title : "");
    const description = ref(task ? task.description : "");

    async function updateTask() {
        try {
            await db.updateTask(taskId.value, selected.value, taskName.value);
            if (task.title !== taskName.value) {
                store.selectedTask.title = taskName.value;
            }
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error();
        }

        let updatedSubtasks: Subtask[] = [];
        for (let i = 0; i < store.inputItems.length; i++) {
            if (store.inputItems[i].completed) {
                store.selectedTask.subtask[i].completed = true;
                updatedSubtasks.push(store.inputItems[i]);
            }
            new Set(updatedSubtasks);
        }

        console.log("store.inputItems", store.inputItems);
        console.log("store.selectedTask.subtask", store.selectedTask.subtask);
        console.log("subtasks", subtasks);

        // store.selectedTask.subtask = store.inputItems;
        try {
            await db.postSubtask(taskId.value, updatedSubtasks);
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error();
        }
    }
</script>
