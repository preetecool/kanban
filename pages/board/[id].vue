<template>
	<client-only>
		<div v-for="column in categories">
			<div class="column">
				<span class="headingS light-text"
					>{{ column.title.toUpperCase() }} ({{ numTasks }})</span
				>
			</div>
		</div>
	</client-only>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { Category } from "~~/types/app.types";
	definePageMeta({
		layout: "dashboard"
	});

	let store = useMainStore();

	let numTasks = ref(0);
	let route = useRoute();
	let params = route.params.id;
	let categories: Category[] = await $fetch(`/api/category/${params}`);
</script>

<style lang="scss" scoped>
	.column {
		// background-color: black;
		height: 100%;
		width: 200px;
		padding: 24px;
		width: 280px;
	}
</style>
