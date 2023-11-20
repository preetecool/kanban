import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const subtaskId = getRouterParams(event)
  let response
  try {
    const { data: tasks, error } = await client.from('subtask').select('*').eq('id', subtaskId.id)
    if (tasks) {
      response = tasks
    }
    if (error) {
      return createError({ statusMessage: error.message })
    }
  } catch (e) {
    return createError({ statusMessage: e.message })
  }

  return response
})
