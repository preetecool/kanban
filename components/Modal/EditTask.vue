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
			<div v-for="subtask in subtasks">
				<ModalSubtaskItem :subtask="subtask" />
			</div>
		</template>
		<template #status> </template>
	</Modal>
</template>

<script lang="ts" setup>
	import { Task, Subtask } from "~~/types/app.types";
	const props = defineProps({
		task: {
			type: Object
		}
		subtaskId:
	});

	let taskId: string | undefined;
	let subtasks: Subtask[];
	if (props.task) {
		taskId = props.task[0].id;
	} else taskId = await props.task[0].id;
	if (taskId != undefined) {
		subtasks = await $fetch(`/api/subtask/${taskId}`);
		console.log(subtasks);
	}
</script>

<style lang="scss" scpoped>
	.task-heading {
		display: flex;
		justify-content: space-between;
	}
</style>
