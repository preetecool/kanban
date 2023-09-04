<script setup>
	const user = useSupabaseUser();
	if (!user.value) {
		navigateTo("/login");
	}
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
