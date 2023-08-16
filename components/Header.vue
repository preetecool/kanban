<template>
	<div class="header">
		<div class="headingXL">Board Name</div>
		<div class="settings">
			<div class="wrap">
				<UIButton label="+ Add New Task" />
				<div>...</div>
			</div>
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
		border-bottom: 1px solid $lineslight;
		background-color: $white;
	}
	.setting {
		display: flex;
		height: 100%;
	}
	.wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
	}
</style>
