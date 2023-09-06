import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  let body = await readBody(event)
  let subtaskId = getRouterParam(event, 'id')

  let response

  try {
    const { data, error } = await client
      .from('subtask')
      .update({
        completed: body.completed,
        updated_at: new Date(),
      })
      .eq('id', subtaskId)
      .select('id, title, completed')

    if (error) throw error
    response = data
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }

  return response
})
