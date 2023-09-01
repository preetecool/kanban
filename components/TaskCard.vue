<template>
	<div
		v-for="(task, index) in tasks"
		:key="task.id"
		class="tasks"
	>
		<div
			class="headingM task-card"
			@click="store.toggleModal('viewTask', task.id)"
		>
			{{ task.title }}
		</div>

		<!-- <div>{{ `${numSubtaskCompleted} of ${numTotalSubTasks}` }}</div> -->
	</div>
</template>

<script lang="ts" setup>
	import { Task, Subtask } from "~~/types/app.types";
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";

	const store = useMainStore();
	const db = useDB();

	const props = defineProps({
		tasks: {
			type: Array
		}
	});

	// let tasks: Ref<Task[]> = ref([]);
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
