<template>
	<div
		v-for="(task, index) in tasks"
		class="tasks"
	>
		<div
			class="headingM task-card"
			@click="store.toggleModal('editTask', task.id)"
		>
			{{ task.title }}
		</div>
		<!-- <div>{{ `${numSubtaskCompleted} of ${numTotalSubTasks}` }}</div> -->
	</div>
</template>

<script lang="ts" setup>
	import { Task, Subtask } from "~~/types/app.types";
	import { useMainStore } from "@/store/main";

	const store = useMainStore();

	const props = defineProps({
		categoryId: {
			type: String,
			default: ""
		}
	});
	const tasks: Task[] = await $fetch(`/api/category/${props.categoryId}/tasks/`);

	tasks.forEach((task) => {
		store.tasksByBoard = [
			{
				id: task.id
			}
		];
	});

	//map all tasks for current board and store the state
</script>

<style lang="scss" scpoped>
	.tasks {
		padding: 24px 0px;
		cursor: pointer;
	}
	.task-card {
		background: $white;
		padding: 23px 16px;
		border-radius: 8px;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px;
	}
</style>
