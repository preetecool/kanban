<template>
	<!-- <client-only> -->
	<div v-for="(column, index) in categories">
		<div
			class="column"
			:key="index"
		>
			<span class="headingS light-text">
				{{ column.title.toUpperCase() }} ({{ numTasks }})
			</span>
			<TaskCard :tasks="column.task" />
		</div>
	</div>
	<!-- </client-only> -->
</template>

<script setup lang="ts">
	import { Category } from "~~/types/app.types";
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";

	const store = useMainStore();
	const db = useDB();
	let numTasks = ref(0);
	let route = useRoute();
	let params = route.params.id;

	let data: Category[] = await db.fetchCategoriesByBoard(params as string);

	data.forEach((category: Category) => {
		let id = category.id;
		store.categoriesByBoard[id] = {
			...category
		};
	});

	let categories = ref(store.categoriesByBoard);
</script>

<style lang="scss" scoped>
	.column {
		height: 100%;
		width: 200px;
		padding: 24px;
		width: 280px;
	}
</style>
