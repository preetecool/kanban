<template>
	<div class="header">
		<div>Board Name</div>
		<div class="settings">
			<UIButton label="+ Add New Task" />
			<div>...</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.header {
		grid-area: header;
		display: flex;
		justify-content: space-between;
		padding: 30px 25px;
	}
	.setting {
	}
</style>
