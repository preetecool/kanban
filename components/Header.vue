<template>
	<div class="header">
		<div class="headingXL heading">{{ store.activeBoard.title }}</div>

		<div class="settings">
			<div class="actions">
				<UIButton
					label="+ Add New Task"
					@click="store.toggleModal('newTask')"
				/>

				<UIEditDropdown
					view="editBoard"
					menuText="Board"
					:id="(params as string)"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { Board } from "~~/types/app.types";

	const store = useMainStore();
	const route = useRoute();
	const params = route.params.id;
</script>

<style scoped lang="scss">
	.header {
		grid-area: header;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid var(--lines-color);
		background-color: colors.$white;
		max-height: 6rem;
	}
	.divider {
		height: 100%;
		width: 1px;
		background-color: var(--lines-color);
		margin-left: 5.5rem;
		margin-right: 1.5rem;
	}
	.heading {
		flex: 1;
		margin-left: 1.5rem;
	}
	.settings {
		display: flex;
		height: 100%;
		padding-right: 2rem;
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		flex: 0 0 auto;
		height: 100%;
	}
</style>
