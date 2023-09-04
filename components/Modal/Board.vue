<template>
	<Modal modalType="newBoard">
		<template #header>
			<span class="headingL">Create a new board</span>
			<span class="bodyM-thin light-text">Organize your tasks by creating columns!</span>
		</template>

		<template #form-content-title>
			<span class="bodyM light-text">Name</span>
			<input
				type="text"
				placeholder="Enter a name for your board"
				v-model="boardName"
			/>
		</template>

		<template #form-content-input="{ items }">
			<span class="bodyM light-text">Column</span>
			<ModalList />
		</template>

		<template #submit-button>
			<UIButton
				label="Create Board"
				@click="sendData()"
			></UIButton>
		</template>
	</Modal>
</template>

<script lang="ts" setup>
	import { useMainStore } from "@/store/main";
	import { uuid } from "vue-uuid";

	const store = useMainStore();
	const boardName = ref("");
	const user = useSupabaseUser();
	let titles = ref([]);

	console.log(store.inputItems);
	async function sendData() {
		store.inputItems.forEach((item) => {
			titles.value.push(item.title);
		});
		console.log(titles.value);

		if (!boardName.value) {
			return console.error("Board name is Empty");
		}

		const boardId = uuid.v4();
		console.log("board board id", boardId);
		const { data: board } = useAsyncData("board", async () => {
			await $fetch("/api/boards/post/", {
				method: "POST",
				body: {
					id: boardId,
					title: boardName.value
				}
			});
		});

		const { data: categories } = useAsyncData("board", async () => {
			console.log("category board id", boardId);
			await $fetch("/api/category/post/", {
				method: "POST",
				body: {
					board: boardId,
					titles: titles.value
					// title: title,
				}
			});
		});

		store.toggleModal("newBoard");
	}
</script>

<style lang="scss" scoped></style>
