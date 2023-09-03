export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    if (!user.value) {
        return navigateTo("/login");
    }
    if (to.path !== "/") {
        return navigateTo("/");
    }

    let route = useRoute();
    let params = route.params.id;
    console.log("PARAMS", params);
});
