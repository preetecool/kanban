export default defineNuxtRouteMiddleware(async (to, from) => {
  const runtimeConfig = useRuntimeConfig()
  const user = useSupabaseUser()

  if (!user.value) {
    navigateTo(`${runtimeConfig.public.base_url}/login`)
  }
})
