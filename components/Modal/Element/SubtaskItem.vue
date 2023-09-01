<template>
	<div class="subtask">
		<input
			type="checkbox"
			:checked="taskCompleted"
			@change="updateSubtask"
			:id="subtask.id"
			name="isCompleted"
		/>
		<label
			:for="subtask.id"
			class="subtask__text"
			:class="{ subtask__completed: taskCompleted }"
			>{{ subtask.title }}</label
		>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useDB } from "@/store/db";
	const props = defineProps({
		subtask: {
			type: Object,
			default: {}
		},
		taskId: {
			type: String,
			default: ""
		}
	});

	let db = useDB();
	let taskCompleted: Ref<boolean> = ref(props.subtask.completed);
	let subtaskId: string = props.subtask.id;
	async function updateSubtask() {
		taskCompleted.value = !taskCompleted.value;
		try {
			await db.updateSubtask(subtaskId, taskCompleted.value);
		} catch (e) {
			console.error(e);
			taskCompleted.value = !taskCompleted.value;
		}
	}
</script>

<style lang="scss" scpoped>
	.subtask {
		display: flex;
		gap: 16px;
		padding: 13px;
		background-color: $lightgrey;
		border-radius: 4px;
		&:hover {
			background-color: $purplehover;
			color: black;
		}
		input {
			width: 16px;
			height: 16px;
			min-width: auto;
			min-height: auto;
			accent-color: $purple;
		}
		&__text {
			font-size: 12px;
			font-weight: bold;
			&:hover {
				cursor: pointer;
			}
		}
		&__completed {
			text-decoration: line-through;
			color: #00000050;
		}
	}
</style>
