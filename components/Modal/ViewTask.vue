<template>
	<Modal>
		<template #header>
			<div class="task-heading">
				<span class="headingL">{{
					store.modal.editTask ? "Edit Task" : task[0].title
				}}</span>
				<Icon
					v-if="!store.modal.editTask"
					class="edit-task"
					name="icon-vertical-ellipsis"
					width="5px"
					@click="store.toggleModal('editTask')"
				/>
			</div>
			<p
				class="bodyL light-text"
				v-if="!store.modal.editTask"
			>
				{{ task[0].description }}
			</p>
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
		<template
			#description
			v-if="store.modal.editTask"
		>
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

		<template
			#subtasks
			v-if="!store.modal.editTask"
		>
			<span class="bodyM light-text">Subtasks({{ " 0 of 3" }})</span>
			<div v-for="(subtask, index) in subtasks">
				<ModalSubtaskItem
					:subtask="subtask"
					:taskId="taskId"
					:key="index"
				/>
			</div>
		</template>
		<template #status>
			<span class="bodyM light-text">Status</span>
			<select
				name="status"
				v-model="selected"
				@change="setNewStatus"
			>
				<option
					v-for="(category, index) in store.categoriesByBoard"
					:key="category.id"
					:value="category.id"
				>
					{{ category.title }}
				</option>
			</select>
		</template>
		<template
			#submit-button
			v-if="store.modal.editTask"
		>
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

	let store = useMainStore();

	let task = store.selectedTask;

	let taskId: string | undefined;
	let subtasks: Subtask[];
	let selected: string = ref(task[0].category);
	const taskName = ref("");
	const description = ref("");
	const subTasks = ref([""]);

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

	async function setNewStatus() {
		await $fetch(`/api/task/update/${taskId}`, {
			method: "PATCH",
			body: {
				category: selected.value
			}
		});
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
