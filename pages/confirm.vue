<script setup lang="ts">
import { useMainStore } from '@/store/main'

import { Database } from '~~/types/database.types'
import { Board } from '~~/types/app.types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const store = useMainStore()

watch(
  user,
  async () => {
    if (user.value) {
      const { data } = await useAsyncData('user', async () => {
        return supabase.from('profiles').select('email, dark_theme').eq('id', user.value.id).single()
      })
      try {
        if (data) {
          if (!data.value?.data?.email) {
            const updates = {
              id: user.value.id,
              email: user.value.email,
              updated_at: new Date(),
            }
            if (data?.value?.data?.dark_theme) {
              store.setTheme(true)
            } else store.setTheme(false)
            const { error } = await supabase.from('profiles').upsert(updates, {
              returning: 'minimal',
            })
            if (error) throw error
          }
        }
      } catch (error: any) {
        alert(error.message)
      } finally {
        const boards: Board[] = await $fetch('/api/boards/get/all')
        const profile = await $fetch(`/api/profile/get/`)

        if (profile.body[0].dark_theme) {
          store.setTheme(true)
          localStorage.setItem('theme', 'dark')
        } else {
          store.setTheme(false)
          localStorage.setItem('theme', 'light')
        }

        if (boards.length) {
          const firstBoard = boards[0].id
          const route = `/board/${firstBoard}/`
          store.activeBoard = boards[0]
          navigateTo(route)
        } else navigateTo('/')
      }
    }
  },
  { immediate: true },
)
</script>
<template>
  <div>Waiting for login...</div>
</template>
<style scoped lang="scss"></style>
