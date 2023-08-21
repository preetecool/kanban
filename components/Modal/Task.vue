<template>
    <Modal>
        <template #header>
            <span class="headingL">Add New Task</span>
            <!-- <span class="bodyM-thin light-text"></span> -->
        </template>
        <template #form-content-title>
            <span class="bodyM light-text">Title</span>
            <input type="text" placeholder="Enter a name for your board" v-model="taskName" />
        </template>

        <template #description>
            <span class="bodyM light-text">Description</span>
            <input type="textarea" placeholder="Enter a name for your board" v-model="description" />
        </template>

        <template #form-content-input>
            <span class="bodyM light-text">Subtasks</span>
            <input type="text" placeholder="Enter a name for your board" v-model="subTasks" />
        </template>
        <template #submit-button>
            <UIButton label="Create Task" @click="sendData()"></UIButton>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
    const taskName = ref("");
    const description = ref("");

    const sendData = () => {
        console.log("hello world");
    };
</script>

<style lang="scss" scoped></style>
