<template>
	<div class="sidebar">
		<div class="logo">
			<img src="/img/logo-dark.svg" />
		</div>
		<div class="boards">
			<span class="allboards">ALL BOARDS (3)</span>
			<div>
				<ul v-for="board in boards">
					<SidebarItem :name="board.title" />
				</ul>
				<div
					class="pt-16"
					@click="store.toggleModal()"
				>
					<ul class="headingM">
						<Icon name="circle-plus-solid" />
						<span>Create New Board</span>
					</ul>
				</div>
			</div>
		</div>
		<div class="sidebar-settings">
			<div class="theme-toggle"></div>
			<div>
				<img src="#" />
				Hide Sidebar
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useMainStore } from "@/store/main";
	import { Database } from "~~/types/database.types";
	import type { RealtimeChannel } from "@supabase/supabase-js";

	const store = useMainStore();
	const user = useSupabaseUser();
	const supabase = useSupabaseClient<Database>();
	const route = useRoute();
	let channel: RealtimeChannel;
	const params = route.params.id;
	// const { data: boards, refresh: refreshBoards } = await useAsyncData("boards", async () => {
	//     const { data } = await supabase.from("boards").select("*").eq("user_id", user.value?.id);
	//     return data;
	// });
	let userBoards = ref([{}]);
	const { data: boards } = await useAsyncData(
		"boards",
		() =>
			$fetch("/api/boards/get", {
				params: {
					page: params
				}
			}),

		{ watch: [userBoards], immediate: true }
	);
	// onMounted(() => {
	// 	channel = supabase
	// 		.channel("public:boards")
	// 		.on("postgres_changes", { event: "*", schema: "public", table: "boards" }, () =>
	// 			refreshBoards()
	// 		);
	// 	channel.subscribe();
	// 	if (boards.value) {
	// 		store.firstBoardRoute = boards.value[0].id;
	// 	}
	// });

	// const boards = ref(data);
</script>

<style scoped lang="scss">
	.sidebar {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: $white;
		gap: 30px;
		padding: 10px 32px;
		grid-area: sidebar;
		border-right: 1px solid $lineslight;
		position: relative;
	}
	.logo {
		padding: 34px 0;
		box-sizing: border-box;
		margin-right: 0;
	}
	.allboards {
		font-size: 12px;
		font-weight: bold;
		letter-spacing: 2.4px;
		color: $medgrey;
	}
	ul {
		padding: 0;
		display: flex;
		align-items: center;
		gap: 16px;
		color: $medgrey;
		cursor: pointer;
	}

	.sidebar-settings {
		display: flex;
		align-items: flex-end;
		margin-top: auto;
		padding-bottom: 32px;
	}

	.theme-toggle {
	}
</style>
