import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)

  // let channel: RealtimeChannel;
  const subtaskId = getRouterParam(event, 'id')

  try {
    const { error } = await client.from('subtask').delete().eq('id', subtaskId)
    if (error) {
      return 'Something went wrong'
    }
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
  return {
    status: 204,
    statusText: 'Subtask Succesfully deleted',
  }
})
