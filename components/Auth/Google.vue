<script setup lang="ts">
	const supabase = useSupabaseClient();

	const signInWithOAuth = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google"
		});
		console.log(data);
		if (error) console.log(error);
	};
</script>
<template>
	<div>
		<button @click="signInWithOAuth">Sign In with Google</button>
	</div>
</template>
