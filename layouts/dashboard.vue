<template>
	<!-- <Modal v-if="store.modal === true" /> -->
	<ModalBoard v-if="store.modal['newBoard'] === true" />
	<ModalCreateTask v-if="store.modal['newTask'] === true" />
	<ModalViewTask v-if="store.modal['viewTask'] === true && !db.isLoadingData" />
	<ModalEditTask v-if="store.modal['editTask'] === true && !db.isLoadingData" />

	<div class="main-grid">
		<Sidebar class="sidebar" />

		<client-only>
			<Header class="header" />
		</client-only>

		<div class="body">
			<div
				v-if="!hasColumns"
				class="body__new-column"
			>
				<span class="headingL">
					This board is empty. Create a new column to get started
				</span>
				<UIButton label="+ Add New Column"></UIButton>
			</div>
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

	let hasColumns = computed(() => {
		return store.activeBoard[0];
	});
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
