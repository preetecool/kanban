import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  let channel: RealtimeChannel
  const params = event?.context?.params?.id
  const { data: board, error } = await client
    .from('board')
    .select('*, category(title, id, created_at, task(id, title, subtask(id, title)))')
    .eq('user_id', user?.id)
    .eq('id', params)
    .order('created_at', { foreignTable: 'category' })
    .single()

  if (error) {
    return createError({ statusMessage: error.message })
  }

  return board
})
