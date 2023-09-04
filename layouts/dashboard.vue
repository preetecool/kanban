<template>
	<!-- <Modal v-if="store.modal === true" /> -->
	<ModalBoard v-if="store.modal['newBoard'] === true" />
	<ModalEditBoard v-if="store.modal['editBoard'] === true && !db.isLoadingData" />
	<ModalCreateTask v-if="store.modal['newTask'] === true" />
	<ModalViewTask v-if="store.modal['viewTask'] === true && !db.isLoadingData" />
	<ModalEditTask v-if="store.modal['editTask'] === true && !db.isLoadingData" />
	<ModalDelete v-if="store.modal['deleteView'] === true" />

	<div class="main-grid">
		<Sidebar class="sidebar" />

		<Header class="header" />

		<div
			class="body"
			v-if="route.path === '/' || store.activeBoard.category.length === 0"
		>
			<div class="body__new-column">
				<span class="headingL">
					This board is empty. Create a new column to get started
				</span>
				<UIButton
					v-if="route.path !== '/'"
					label="+ Add New Column"
					@click="store.toggleModal('editBoard')"
				/>
				<UIButton
					v-else
					label="+ Add New Board"
					@click="store.toggleModal('newBoard')"
				/>
			</div>
		</div>

		<div
			class="body"
			v-else
		>
			<div class="columns-grid">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";
	const store = useMainStore();
	const db = useDB();
	const route = useRoute();
</script>

<style lang="scss" scoped>
	span {
		color: $medgrey;
	}
	.main-grid {
		background-color: $lightgrey;
		position: relative;
		display: grid;
		grid-template-columns: 20% 80%;
		grid-template-rows: 12.5% 87.5%;
		grid-template-areas:
			"sidebar header"
			"sidebar content";
	}

	.body {
		display: flex;

		grid-area: content;
		justify-content: center;
		align-content: center;
		&__new-column {
			display: flex;
			flex-direction: column;
			justify-content: center;
			// align-items: center;
			gap: 32px;
		}
	}
	.columns-grid {
		// background-color: black;
		display: flex;
		// gap: 24px;
		justify-content: flex-start;
		width: 100%;
	}
</style>
