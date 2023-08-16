<script setup>
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	watch(
		user,
		async () => {
			if (user.value) {
				return navigateTo("/");
			}
			const { data } = await useAsyncData("user", async () => {
				supabase.from("profiles").select("id, email").eq("id", user.value.id);
			});
			if (data) {
				const update = {
					email: user.value.email
				};
				await supabase.from("profiles").upsert(update, {
					returning: "minimal"
				});
				console.log(data.value);
			}
			console.log("USER DATA", data.value);
		},
		{ immediate: true }
	);
</script>
<template>
	<div>Waiting for login...</div>
</template>
