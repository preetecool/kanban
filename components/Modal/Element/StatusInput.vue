<template>
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

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";

	const store = useMainStore();
	const db = useDB();
	let task = store.selectedTask;

	const taskId = ref(task ? task.id : "");
	const selected = ref(task ? task.category : "");

	async function setNewStatus() {
		await db.updateTask(taskId.value, selected.value);
	}
</script>
