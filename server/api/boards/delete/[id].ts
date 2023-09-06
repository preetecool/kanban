import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { Subtask } from '~~/types/app.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { RealtimeChannel } from '@supabase/supabase-js'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)

  let channel: RealtimeChannel
  let boardId = getRouterParam(event, 'id')

  try {
    const { error } = await client.from('board').delete().eq('id', boardId)
    channel = client
      .channel('public:board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'board' }, payload => payload)
    channel.subscribe()
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
  return {
    status: 204,
    statusText: 'Board succesfully deleted',
  }
})
