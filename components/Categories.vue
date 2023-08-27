<template>
	<client-only>
		<div v-for="(column, index) in categories">
			<div
				class="column"
				:key="index"
			>
				<span class="headingS light-text"
					>{{ column.title.toUpperCase() }} ({{ numTasks }})</span
				>
				<Task
					:index="index"
					:categoryId="column.id"
				/>
			</div>
		</div>
	</client-only>
</template>

<script setup lang="ts">
	import { Category } from "~~/types/app.types";
	definePageMeta({
		layout: "dashboard"
	});

	let numTasks = ref(0);
	let route = useRoute();
	let params = route.params.id;
	let categories: Category[] = await $fetch(`/api/category/${params}`);
</script>

<style lang="scss" scoped>
	.column {
		height: 100%;
		width: 200px;
		padding: 24px;
		width: 280px;
	}
</style>
