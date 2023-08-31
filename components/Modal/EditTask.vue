<template>
	<Modal v-if="store.modal.editTask">
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

		<template #form-content-input>
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
			<UIButton
				label="Create Task"
				@click="sendData()"
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
	let db = useDB();

	const taskId = ref(task ? task[0].id : "");
	const selected = ref(task ? task[0].category : "");
	const taskName = ref(task ? task[0].title : "");
	const description = ref(task ? task[0].description : "");

	async function setNewStatus() {
		await db.updateTaskCategory(taskId.value, selected.value);
	}

	async function sendData() {
		// Logic to send the updated data, such as taskName and description, to the server.
		// This can be added to the modalService and called here.
	}
</script>
