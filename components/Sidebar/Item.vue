<template>
	<li class="item">
		<div
			class="wrap"
			@click="changeBoardView"
		>
			<Icon name="icon-board" />
			<span class="headingM"> {{ name }} </span>
		</div>
	</li>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	const props = defineProps({
		name: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		}
	});
	function changeBoardView() {
		let store = useMainStore();
		store.$reset();
		navigateTo(`/board/${props.url}`);
	}
</script>
<style scoped lang="scss">
	.item {
		border-radius: 0 100px 100px 0;
		left: 0;
	}
	.wrap {
		display: flex;
		gap: 16px;

		align-items: center;
	}
</style>
