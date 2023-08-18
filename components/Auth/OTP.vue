<template>
    <div>
        <div class="login__otp">
            <input v-model="email" type="email" placeholder="Enter your email" />
            <UIButton :action="signInWithOtp" label="Sign In with magic link" login />
        </div>
    </div>
</template>

<script setup lang="ts">
    const supabase = useSupabaseClient();
    const email = ref("");

    const signInWithOtp = async () => {
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: "http://localhost:3000/",
            },
        });
        await $fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ email: email.value }),
        });
        if (error) console.log(error);
    };
</script>
<style scoped lang="scss">
    .login {
        &__otp {
            display: flex;
            flex-direction: column;
            width: fit-content;
            margin: auto;
            gap: 10px;
            overflow: hidden;
            input {
                height: 50px;
            }
        }
        .btn {
            max-width: 350px !important;
        }
    }
</style>
