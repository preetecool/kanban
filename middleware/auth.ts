export default defineNuxtRouteMiddleware(async (to, from) => {
  const runtimeConfig = useRuntimeConfig()
  const user = useSupabaseUser()
  await user
  if (!user.value) {
    navigateTo(`${runtimeConfig.public.base_url}/login`)
  }
})
