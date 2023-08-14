<template>
	<div class="sidebar">
		<div class="logo">
			<img src="#" />
		</div>
		<div class="boards">
			<span class="allboards">All Boards</span>
			<div>
				<ul>
					<li></li>
					<li>+ Create New Board</li>
				</ul>
			</div>
		</div>
		<div>
			<div class="theme-toggle"></div>
			<div>
				<img src="#" />
				Hide Sidebar
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.sidebar {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: $white;
		gap: 30px;
		padding: 10px 32px;
		grid-area: sidebar;
	}
	.theme-toggle {
		align-items: flex-end;
	}
</style>
