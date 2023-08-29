<template>
	<div class="subtask">
		<input
			type="checkbox"
			v-model="isCompleted"
			@click="updateSubtask"
			id="isCompleted"
			name="isCompleted"
			:checked="isCompleted"
		/>
		<label
			for="isCompleted"
			class="subtask__text"
			>{{ subtask.title }}</label
		>
	</div>
</template>
<script setup lang="ts">
	import { notEqual } from "assert";
	import { Subtask } from "~~/types/app.types";
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
	let isCompleted: boolean = props.subtask.completed;

	async function updateSubtask() {
		isCompleted = !isCompleted;
		console.log(isCompleted);
		let updatedSubtask: Subtask = await $fetch(`/api/subtask/${props.subtask.id}/`, {
			method: "PATCH",
			body: {
				completed: isCompleted,
				subtaskId: props.subtask.id
			}
		});
	}
</script>

<style lang="scss" scpoped>
	.subtask {
		display: flex;
		gap: 16px;
		padding: 13px;
		background-color: $lightgrey;
		border-radius: 4px;
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
		}
		--completed {
			text-decoration: line-through;
			color: #00000050;
		}
	}
</style>
