import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  let channel: RealtimeChannel
  let params = event?.context?.params?.id
  const { data: board, error } = await client
    .from('board')
    .select('*, category(title, id, task(id, title, subtask(id, title)))')
    .eq('user_id', user?.id)
    .eq('id', params)
    .single()

  if (error) {
    return createError({ statusMessage: error.message })
  }

  return board
})
