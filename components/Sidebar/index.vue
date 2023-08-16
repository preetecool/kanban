<template>
	<div class="sidebar">
		<div class="logo">
			<img src="/img/logo-dark.svg" />
		</div>
		<div class="boards">
			<span class="allboards">ALL BOARDS (3)</span>
			<div>
				<ul>
					<SidebarItem />
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
	}
	.theme-toggle {
		align-items: flex-end;
	}
</style>
