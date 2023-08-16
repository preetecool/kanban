<script setup lang="ts">
	import { off } from "process";

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	watch(
		user,
		async () => {
			if (user.value) {
				const { data } = await useAsyncData("user", async () => {
					return supabase
						.from("profiles")
						.select("email")
						.eq("id", user.value.id)
						.single();
				});

				try {
					if (data) {
						if (!data.value?.data?.email) {
							const updates = {
								id: user.value.id,
								email: user.value.email,
								updated_at: new Date()
							};

							let { error } = await supabase.from("profiles").upsert(updates, {
								returning: "minimal"
							});
							if (error) throw error;
						}
					}
				} catch (error: any) {
					alert(error.message);
				}
				return navigateTo("/");
			}
		},
		{ immediate: true }
	);
</script>
<template>
	<div>Waiting for login...</div>
</template>
<!-- 61884054-fd90-4d79-891c-f6645bc81b56 -->
<!-- 61884054-fd90-4d79-891c-f6645bc81b56 -->

<!-- 2023-08-16 16:55:31.97+00 -->
<!-- 2023-08-16 16:55:31.97+00 -->
