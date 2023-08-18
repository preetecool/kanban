<script setup lang="ts">
    import { useMainStore } from "@/store/main";
    import { Database } from "~~/types/database.types";

    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const store = useMainStore();
    const firstBoardRoute = store.firstBoardRoute;
    watch(
        user,
        async () => {
            if (user.value) {
                const { data } = await useAsyncData("user", async () => {
                    return supabase.from("profiles").select("email").eq("id", user.value.id).single();
                });

                try {
                    if (data) {
                        if (!data.value?.data?.email) {
                            const updates = {
                                id: user.value.id,
                                email: user.value.email,
                                updated_at: new Date(),
                            };

                            let { error } = await supabase.from("profiles").upsert(updates, {
                                returning: "minimal",
                            });
                            if (error) throw error;
                        }
                    }
                } catch (error: any) {
                    alert(error.message);
                }
                let firstBoard = await $fetch("/api/board/first");
                firstBoard = firstBoard[0].id.toString();
                let route = `/board/${firstBoard}`;
                return navigateTo(route);

                // return router.push(route);
            }
        },
        { immediate: true }
    );
</script>
<template>
    <div>Waiting for login...</div>
</template>
<style scoped lang="scss"></style>
