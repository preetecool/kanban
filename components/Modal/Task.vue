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

	import { Category } from "~~/types/app.types";

	import { uuid } from "vue-uuid";

	let taskId = uuid.v4();

	const taskName = ref("");
	const description = ref("");
	const subTasks = ref([""]);
	let selected = ref(0);

	let route = useRoute();
	let params = route.params.id;
	const store = useMainStore();
	const user = useSupabaseUser();

	const categories: Category[] = await $fetch(`/api/category/${params}`);

	async function sendData() {
		store.items.forEach((item) => {
			subTasks.value.push(item.title);
		});
		try {
			const tasks = $fetch(`/api/task/new`, {
				method: "POST",
				body: {
					taskId: taskId,
					categoryId: categories[selected.value].id,
					board: params,
					title: taskName.value,
					description: description.value
				}
			});
			const subtask = $fetch("/api/subtask/new", {
				method: "POST",
				body: {
					task: taskId,
					subtasks: subTasks.value
				}
			});
		} catch (error) {
			console.error("Error Creating Task:", error);
			throw new Error();
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
