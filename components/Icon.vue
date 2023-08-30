<template>
	<svg class="icon">
		/
		<image
			:xlink:href="`/img/${name}.svg`"
			:width="width"
			:height="height"
		/>
	</svg>
</template>

<script setup lang="ts">
	const props = defineProps({
		name: {
			type: String,
			required: true
		},
		width: {
			type: String,
			default: "16px"
		},
		height: {
			type: String,
			default: "16px"
		}
	});
</script>
<style lang="scss" scoped>
	.icon {
		width: 16px;
		height: 16px;
	}
</style>
