<template>
	<div
		class="modal"
		@click="store.toggleModal('closeModal')"
	>
		<div
			class="modal__content"
			@click.stop
		>
			<div class="modal__content__header">
				<slot name="header" />
			</div>

			<div
				class="modal__content__body"
				v-if="!store.modal.deleteView"
			>
				<div class="modal__content__body__input">
					<slot name="subtasks" />
					<div class="input-block">
						<slot name="form-content-title" />
					</div>
					<slot name="description" />
					<div
						class="input-block"
						v-if="!store.modal.viewTask"
					>
						<slot
							name="form-content-input"
							:items="items"
						/>

						<div
							v-for="(item, index) in items"
							:key="index"
						>
							<ModalElementColumnItem v-model:item-name="item.title">
								<IconOld
									@click="removeColumn(index)"
									name="icon-cross"
								/>
							</ModalElementColumnItem>
						</div>
						<UIButton
							:label="AddButtonLabel"
							secondary
							@click="addNewColumn()"
						/>
					</div>
				</div>
			</div>
			<div
				class="modal__content__body status"
				v-if="hasStatus"
			>
				<slot name="status" />
			</div>
			<div class="modal__content__footer">
				<slot name="submit-button" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useMainStore } from "@/store/main";
	import { off } from "process";
	import { Database } from "~~/types/database.types";

	const store = useMainStore();
	let items = store.inputItems;

	async function addNewColumn() {
		items.push({
			title: ""
		});

		return items;
	}

	function removeColumn(id: number) {
		items.splice(id, 1);
		return items;
	}

	const AddButtonLabel = computed(() => {
		return store.modal.editTask ? "Add New Subtask" : "Add New Column";
	});

	const hasStatus = computed(() => {
		if (store.modal.editTask || store.modal.viewTask || store.modal.newTask) {
			return true;
		}
	});
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
			background-color: colors.$white;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
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
				display: flex;
				gap: 16px;

				& > *:only-child {
					flex: 1;
				}
			}
		}
	}
</style>
```
