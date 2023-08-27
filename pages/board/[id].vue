<template>
	<Categories />
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";

	definePageMeta({
		layout: "dashboard"
	});

	let store = useMainStore();
	let numTasks = ref(0);
</script>

<style lang="scss" scoped></style>
