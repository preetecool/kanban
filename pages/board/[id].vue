<template>
	<client-only>
		<div v-for="column in columns">
			<div class="column">
				<span class="headingS light-text"
					>{{ column.toUpperCase() }} ({{ numTasks }})</span
				>
			</div>
		</div>
	</client-only>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	definePageMeta({
		layout: "dashboard"
	});

	let store = useMainStore();

	let numTasks = ref(0);
	let route = useRoute();
	let params = route.params.id;
	let categories = await $fetch(`/api/category/${params}`);
	let columns = ref([]);

	watchEffect(() => {
		// categories[0].titles.forEach((title) => {
		// 	columns.value.push(title.title);
		// });
		// console.log(columns);
	});
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
