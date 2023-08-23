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
	import { Database } from "~~/types/database.types";
	const store = useMainStore();
	const boardName = ref("");
	const user = useSupabaseUser();
	// const supabase = useSupabaseClient<Database>();

	async function sendData() {
		const route = useRoute();
		const params = route.params.id;
		const boardId = BigInt(Math.floor(Math.random() * 1000000000)).toString();
		const categories = store.items.map((item, index) => {
			return {
				name: item.name,
				id: `${boardId}_${index}`,
				tasks: []
			};
		});
		const { data } = useAsyncData("board", async () => {
			await $fetch("/api/boards/new", {
				method: "POST",
				body: {
					id: boardId,
					creator: user.value.email,
					created_at: new Date(),
					title: boardName.value,
					user_id: user.value.id,
					categories_and_tasks: categories
				}
			});
		});
		console.log(data);

		store.toggleModal("newBoard");
	}
</script>

<style lang="scss" scoped></style>
