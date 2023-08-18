export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    if (user.value) {
        

    }

    if (to.path !== "/") {
        return navigateTo("/");
    }
});
