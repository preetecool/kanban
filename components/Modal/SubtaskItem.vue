<template>
	<div class="subtask">
		<input
			type="checkbox"
			v-model="subtask.completed"
		/>
		<div class="subtask__text">{{ subtask.title }}</div>
	</div>
</template>
<script setup>
	const props = defineProps({
		subtask: {
			type: Object,
			default: {}
		}
	});
</script>

<style lang="scss" scpoped>
	.subtask {
		display: flex;
		gap: 16px;
		padding: 13px;
		background-color: $lightgrey;
		border-radius: 4px;
		input {
			width: 16px;
			height: 16px;
			min-width: auto;
			min-height: auto;
			accent-color: $purple;
		}
		&__text {
			font-size: 12px;
			font-weight: bold;
		}
		--completed {
			text-decoration: line-through;
			color: #00000050;
		}
	}
</style>
