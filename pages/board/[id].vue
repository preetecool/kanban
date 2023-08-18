<template></template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { storeToRefs } from "pinia";
	definePageMeta({
		layout: "dashboard"
	});
	let store = useMainStore();
	let userBoards = ref([{}]);
	const route = useRoute();
	const params = route.params.id;
</script>

<style lang="scss" scoped></style>
