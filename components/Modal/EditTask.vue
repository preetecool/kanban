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
				<ModalSubtaskItem
					:subtask="subtask"
					:taskId="taskId"
					:key="index"
				/>
			</div>
		</template>
		<template #status> </template>
	</Modal>
</template>

<script lang="ts" setup>
	import { Task, Subtask } from "~~/types/app.types";
	import { useMainStore } from "@/store/main";

	let store = useMainStore();
	// onMounted(() => {
	// 	store.getAllSubtasks();
	// });
	let task = store.selectedTask;

	let taskId: string | undefined;
	let subtasks: Subtask[];
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
</script>

<style lang="scss" scpoped>
	.task-heading {
		display: flex;
		justify-content: space-between;
	}
</style>
