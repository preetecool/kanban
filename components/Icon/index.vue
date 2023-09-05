<template>
	<svg
		width="20"
		height="16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<use :xlink:href="`#icon-${icon}`"></use>
	</svg>
</template>

<script setup lang="ts">
	const props = defineProps({
		icon: {
			type: String,
			required: true
		}
	});
</script>

<style></style>
