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
				// scss: {
				//     includePaths: ["./assets/scss"],
				// },
				scss: {
					additionalData: `
                	@use "@/assets/scss/_colors.scss" as colors;
                	@use "@/assets/scss/variables.scss" as variables;
                	@use "@/assets/scss/mixins.scss" as mixins ;
                	@use "@/assets/scss/reset.scss" ;
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
