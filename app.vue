<template>
    <NuxtLayout :class="theme">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
    import { useMainStore } from "@/store/main";
    const user = useSupabaseUser();
    const store = useMainStore();
    let theme = ref("");
    onMounted(() => {
        if (localStorage.getItem("theme")) {
            theme.value = localStorage.getItem("theme");
        } else {
            localStorage.setItem("theme", "light");
            theme.value = "light";
        }
        console.log("THEME", theme.value);
    });
</script>
