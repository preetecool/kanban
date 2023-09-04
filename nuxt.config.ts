// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ["@/assets/scss/global.scss"],
	ssr: false,
	runtimeConfig: {
		public: {
			base_url: process.env.BASE_URL
		}
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@use "@/assets/scss/_colors.scss" as *;
					@use "@/assets/scss/reset.scss";
					`
				}
			}
		}
	},

	modules: [
		[
			"@pinia/nuxt",

			{
				autoImports: [
					"defineStore",
					["defineStore", "definePiniaStore"],
					"acceptHMRUpdate"
				]
			}
		],
		"@nuxtjs/supabase"
	],
	imports: {
		dirs: ["stores"]
	}
});
