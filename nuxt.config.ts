// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["@/assets/scss/global.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
					@use "@/assets/scss/_colors.scss" as *;
					@use "@/assets/scss/reset.scss";
					`,
                },
            },
        },
    },
    modules: [
        [
            "@pinia/nuxt",

            {
                autoImports: ["defineStore", ["defineStore", "definePiniaStore"], "acceptHMRUpdate"],
            },
        ],
        "@nuxtjs/supabase",
    ],
    imports: {
        dirs: ["stores"],
    },
});
