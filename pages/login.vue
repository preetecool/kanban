<script setup lang="ts">
	const supabase = useSupabaseClient();
	const email = ref("");

	const signInWithOAuth = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: "http://localhost:3000/confirm"
			}
		});
		console.log(data);
		if (error) console.log(error);
	};
	const signInWithOtp = async () => {
		const { error } = await supabase.auth.signInWithOtp({
			email: email.value,
			options: {
				emailRedirectTo: "http://localhost:3000/confirm"
			}
		});
		if (error) console.log(error);
	};
</script>
<template>
	<div>
		<button @click="signInWithOAuth">Sign In with Google</button>
		<div>
			<button @click="signInWithOtp">Sign In with magic link</button>
			<input
				v-model="email"
				type="email"
			/>
		</div>
	</div>
</template>
