<template>
	<div v-for="task in tasks">
		<div class="">
			{{ task.title }}
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Task } from "~~/types/app.types";

	const props = defineProps({
		categoryId: {
			type: String,
			default: ""
		}
	});
	const tasks: Task[] = await $fetch(`/api/tasks/${props.categoryId}`);
	console.log(tasks);
</script>
