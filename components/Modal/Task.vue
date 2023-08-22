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
					:value="selected"
				>
					{{ category.name }}
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
	const taskName = ref("");
	const description = ref("");
	const subTasks = ref([]);
	const categories = ref([]);
	let selected = ref("");
	let route = useRoute();
	let params = route.params.id;
	const store = useMainStore();

	async function getCategories() {
		try {
			const { data } = await useFetch(`/api/boards/${params}`);
			return data.value[0].categories;
		} catch (error) {
			console.error("Error fetching categories:", error);
			return [];
		}
	}
	async function sendData() {
		const taskId = BigInt(Math.floor(Math.random() * 1000000000)).toString();
		try {
			const data = $fetch("/api/tasks/new", {
				method: "POST",
				body: {
					id: taskId,
					board: Number(params),
					due_date: "",
					description: description.value,
					title: taskName.value,
					subtasks: store.items,
					status: selected.value
				}
			});
		} catch (error) {
			console.error("Error Creating Task:", error);
			throw new Error();
		}
	}
	onMounted(async () => {
		categories.value = await getCategories();
	});
</script>

<style lang="scss" scoped>
	.description {
		height: 112px;
		border: 1px solid #828fa325;
		padding: 8px 16px;
		border-radius: 4px;
	}
</style>
