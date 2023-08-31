<template>
	<Modal>
		<template #header>
			<div class="task-heading">
				<span class="headingL">{{ task[0].title }}</span>
				<Icon
					class="edit-task"
					name="icon-vertical-ellipsis"
					width="5px"
					@click="store.toggleModal('editTask')"
				/>
			</div>
			<p class="bodyL light-text">
				{{ task[0].description }}
			</p>
		</template>

		<template #subtasks>
			<span class="bodyM light-text">Subtasks({{ " 0 of 3" }})</span>
			<div
				v-for="(subtask, index) in subtasks"
				:key="subtask.id"
			>
				<ModalElementSubtaskItem
					:subtask="subtask"
					:taskId="taskId"
				/>
			</div>
		</template>

		<template #status>
			<ModalElementStatusInput />
		</template>
	</Modal>
</template>

<script lang="ts" setup>
	import { Task, Subtask } from "~~/types/app.types";
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";

	let store = useMainStore();
	let db = useDB();

	let task: Task[] = store.selectedTask;

	// console.log(task);

	const taskId = ref(task ? task[0].id : "");
	const subtasks: Ref<Subtask[]> | Error = ref([]);

	if (taskId.value) {
		try {
			const result = await db.fetchSubtasksForTask(taskId.value);
			if (Array.isArray(result) && result.every((item) => "id" in item)) {
				subtasks.value = result;
			}
		} catch (error) {
			console.error("Received unexpected data format:", error);
		}
	}
</script>
<style lang="scss" scpoped>
	.task-heading {
		display: flex;
		justify-content: space-between;
	}
	.edit-task {
		:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	}
</style>
