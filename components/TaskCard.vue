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
	}
</style>
