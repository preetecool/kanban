<template>
	<div class="sidebar">
		<div class="logo">
			<img src="/img/logo-dark.svg" />
		</div>
		<div class="boards">
			<span class="allboards">ALL BOARDS (3)</span>
			<div>
				<ul>
					<SidebarItem name="Marketing" />
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
	const store = useMainStore();
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
