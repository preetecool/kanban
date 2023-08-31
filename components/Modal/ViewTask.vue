<template>
	<Modal>
		<template #header>
			<div class="task-heading">
				<span class="headingL">{{ task.title }}</span>
				<div
					@mouseenter="menu = true"
					@mouseleave="menu = false"
				>
					<Icon
						class="edit-task-icon"
						name="icon-vertical-ellipsis"
						width="5px"
					/>
					<div
						v-if="menu"
						class="edit-delete"
					>
						<ul class="edit-delete__menu bodyL">
							<li
								class="edit-delete__item light-text"
								@click="changeToEditView()"
							>
								Edit Task
							</li>
							<li class="edit-delete__item danger">Delete Task</li>
						</ul>
					</div>
				</div>
			</div>
			<p class="bodyL light-text">
				{{ task.description }}
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
	let task: Task = store.selectedTask;
	const taskId = ref(task ? task.id : "");
	const subtasks: Subtask[] = db.setSubtasksForTask();
	let menu = ref(false);

	function changeToEditView() {
		// menu.value = true;
		store.toggleModal("editTask");
		store.modal.viewTask = !store.modal.viewTask;
	}
</script>
<style lang="scss" scpoped>
	.task-heading {
		display: flex;
		justify-content: space-between;
	}
	.edit-task-icon {
		:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
		width: 40px;
	}
</style>
