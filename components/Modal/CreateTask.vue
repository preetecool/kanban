<template>
	<Modal>
		<template #header>
			<span class="headingL">Add New Task</span>
			<!-- <span class="bodyM-thin light-text"></span> -->
		</template>

		<template #form-content-title>
			<span class="bodyM light-text">Title</span>
			<input
				type="text"
				placeholder="Enter a name for your board"
				v-model="taskName"
			/>
		</template>

		<template #description>
			<span class="bodyM light-text">Description</span>
			<textarea
				type="text"
				class="input description"
				rows="4"
				cols="50"
				placeholder="Write a description for your task"
				v-model="description"
			/>
		</template>

		<template #form-content-input>
			<span class="bodyM light-text">Subtasks</span>
		</template>

		<template #status>
			<span class="bodyM light-text">Status</span>
			<select
				name="status"
				v-model="selected"
			>
				<option
					v-for="(category, index) in categories"
					:key="index"
					:value="index"
				>
					{{ category.title }}
				</option>
			</select>
		</template>

		<template #submit-button>
			<UIButton
				label="Create Task"
				@click="sendData()"
			></UIButton>
		</template>
	</Modal>
</template>

<script lang="ts" setup>
	import { useMainStore } from "@/store/main";
	import { useDB } from "@/store/db";

	import { Category, Task, CategoriesByBoard } from "~~/types/app.types";
	import { uuid } from "vue-uuid";

	const store = useMainStore();
	const db = useDB();

	let taskId = uuid.v4();
	const taskName = ref("");
	const description = ref("");
	const subtasks = ref(store.inputItems);
	let selected = ref(0);

	let route = useRoute();
	let params = route.params.id;

	const categories: Category[] = await $fetch(`/api/category/${params}`);

	store.inputItems = [];

	let tasksByCategoryByBoard: Ref<CategoriesByBoard> = ref(store.categoriesByBoard);

	async function sendData() {
		try {
			let data = await db.createTask(
				taskId,
				categories[selected.value].id,
				params,
				taskName.value,
				description.value
			);

			store.categoriesByBoard[categories[selected.value].id].task.push(data);

			console.log(store.categoriesByBoard);
		} catch (error) {
			console.error("Error Creating Task:", error);
			throw new Error();
		}
		try {
			await db.postSubtask(taskId, store.inputItems);
		} catch (error) {
			console.error("Error Creating subtask:", error);
			throw new Error();
		} finally {
			store.closeModal();
		}
	}
</script>

<style lang="scss" scoped>
	.description {
		height: 112px;
		border: 1px solid #828fa325;
		padding: 8px 16px;
		border-radius: 4px;
	}
</style>
