<script setup>
	const user = useSupabaseUser();
	// onBeforeMount(() => {
	// 	if (!user.value) {
	// 		navigateTo("https://kanban-roan-delta.vercel.app/login");
	// 	}
	// });
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
