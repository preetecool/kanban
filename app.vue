<script setup>
	const user = useSupabaseUser();
	onBeforeMount(() => {
		if (!user.value) {
			navigateTo("https://kanban-roan-delta.vercel.app/confirm");
		}
	});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
