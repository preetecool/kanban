import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const { data: boards, error } = await client
    .from('board')
    .select('*, category(title, id, created_at, task(id, title))')
    .eq('user_id', user?.id)
    .order('created_at', { foreignTable: 'category', ascending: true })

  if (error) {
    return createError({ statusMessage: error.message })
  }

  return boards
})
