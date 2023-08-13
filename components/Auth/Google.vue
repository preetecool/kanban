<template>
    <div class="google" @click="signInWithOAuth">
        <img src="/btn_google_light_normal_ios.svg" />
        <p>Sign in with Google</p>
    </div>
</template>

<script setup lang="ts">
    const supabase = useSupabaseClient();
    const email = ref("");

    const signInWithOAuth = async (event: MouseEvent) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/confirm",
            },
        });
        console.log(data);
        if (error) console.log(error);
    };
</script>

<style scoped lang="scss">
    .google {
        max-width: 350px;
        background-color: #ffffff;
        padding: 8px;
        display: flex;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid #828fa325;
        &:hover {
            background-color: #f1f3f4;
        }
    }
    img {
        height: 40px;
        width: 40px;
    }
    p {
        margin: auto;
        font-family: "Roboto", sans-serif;
    }
</style>
