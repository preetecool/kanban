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

	const store = useMainStore();
	const boardName = ref("");
	const user = useSupabaseUser();
	let titles = ref([]);

	async function sendData() {
		store.inputItems.forEach((item) => {
			titles.value.push(item.title);
		});

		const boardId = BigInt(Math.floor(Math.random() * 1000000000)).toString();

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
