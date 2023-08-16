<template>
	<div
		class="modal"
		@click="store.toggleModal()"
	>
		<div
			class="modal__content"
			@click.stop
		>
			<div class="modal__content__header">
				<span class="headingL">Create a new board</span>
				<span class="bodyM-thin light-text"
					>Add columns to your board. Columns help to organize your tasks.</span
				>
			</div>
			<div class="modal__content__body">
				<div class="modal__content__body__input">
					<div class="input-block">
						<span class="bodyM light-text">Name</span>
						<input
							type="text"
							placeholder="Enter a name for your board"
						/>
					</div>
					<div class="input-block">
						<span class="bodyM light-text">Column</span>

						<div v-for="column in columns">
							<ModalColumnItem
								:columnName="column.name"
								:remove="removeColumn(column.id)"
							/>
						</div>
						<UIButton
							label="+ Add New Column"
							secondary
							@click="addNewColumn()"
						/>
					</div>
				</div>
			</div>
			<div class="modal__content__footer">
				<UIButton
					label="Create Board"
					@click="store.toggleModal()"
				></UIButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useMainStore } from "@/store/main";
	const store = useMainStore();
	const modal = ref(false);
	const boardName = ref("");
	let numColumns = ref(0);
	let columns = ref([
		{
			id: await numColumns,
			name: ref("")
		}
	]);

	async function addNewColumn() {
		columns.value.push({
			name: ref("")
		});
		await numColumns.value++;
	}

	function removeColumn(id) {
		columns.value.slice(0, id);
		numColumns.value--;
	}
	console.log(numColumns.value);
</script>

<style lang="scss" scoped>
	.bgModal {
		z-index: 99;
	}
	input {
		max-width: 416px;
		width: 416px;
	}
	.input-block {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
		transition: all 0.3s ease-in-out;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		&__content {
			width: 480px;
			// height: 429px;
			background-color: $white;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			&__header {
				padding: 32px;
				display: flex;
				flex-direction: column;
				gap: 16px;
			}
			&__body {
				padding: 32px;
				display: flex;
				flex-direction: column;
				gap: 8px;
				&__input {
					display: flex;
					flex-direction: column;
					gap: 24px;
				}
			}
			&__footer {
				padding: 32px;
			}
		}
	}
</style>
```
