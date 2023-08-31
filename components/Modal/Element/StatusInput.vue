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
	const taskId = ref(task ? task[0].id : "");
	const selected = ref(task ? task[0].category : "");

	async function setNewStatus() {
		await db.updateTaskCategory(taskId.value, selected.value);
	}
</script>
