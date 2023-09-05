<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>
	import { useMainStore } from "@/store/main";
	let store = useMainStore();
</script>
