<template>
	<Modal
		v-if="store.modal.editTask"
		:items="subtasks"
	>
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

		<template
			#form-content-input
			:items="subtasks"
		>
			<span class="bodyM light-text">Subtasks</span>

			<!-- <div v-for="subtask in store.inputItems">
				<input :value="subtask.title" />
			</div> -->
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
			<UIButton
				label="Save Task"
				@click="updateTask()"
			></UIButton>
		</template>
	</Modal>
</template>

<script lang="ts" setup>
	import { Task, Subtask } from "~~/types/app.types";
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";

	let store = useMainStore();
	let task = store.selectedTask;

	(store.inputItems as Subtask[]) = store.selectedTask.subtask;

	let subtasks: Ref<Subtask[]> = ref(store.inputItems);
	let db = useDB();

	const taskId = ref(task ? task.id : "");
	const selected = ref(task ? task.category : "");
	const taskName = ref(task ? task.title : "");
	const description = ref(task ? task.description : "");

	console.log("ITEMS", store.inputItems);

	// store.inputItems.forEach((item) => {
	// 		subTasks.value.push(item.title);
	// 	});
	// async function setNewStatus() {

	// }

	async function updateTask() {
		let isSubtasksChanged = subtasks.value.length !== store.selectedTask.subtask.length;

		await db.updateTask(taskId.value, selected.value);

		if (isSubtasksChanged) {
			db.postSubtask(taskId.value, subtasks.value);
		}
	}
</script>
