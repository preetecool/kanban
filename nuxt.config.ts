// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['@/assets/scss/global.scss'],
  ssr: false,
  runtimeConfig: {
    public: {
      base_url: process.env.BASE_URL,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                  @use "@/assets/scss/reset.scss";
                	@use "@/assets/scss/_colors.scss" as colors;
                	@use "@/assets/scss/variables.scss" as variables;
                	@use "@/assets/scss/mixins.scss" as mixins ;
                	`,
        },
      },
    },
  },

  modules: [
    [
      '@pinia/nuxt',

      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore'], 'acceptHMRUpdate'],
      },
    ],
    '@nuxtjs/supabase',
  ],
  imports: {
    dirs: ['stores'],
  },
})
