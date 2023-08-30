<template>
	<div class="header">
		<div class="headingXL">{{ boardTitle }}</div>
		<div class="settings">
			<div class="wrap">
				<UIButton
					label="+ Add New Task"
					@click="store.toggleModal('newTask')"
				/>
				<Icon
					name="icon-vertical-ellipsis"
					width="5px"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { Board } from "~~/types/app.types";

	const store = useMainStore();

	let boardTitle: Board["title"] = store.activeBoard[0].title;
</script>

<style scoped lang="scss">
	.header {
		grid-area: header;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25px;
		border-bottom: 1px solid $lineslight;
		background-color: $white;
	}
	.setting {
		display: flex;
		height: 100%;
	}
	.wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
	}
</style>
