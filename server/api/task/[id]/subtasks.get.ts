import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const taskId = getRouterParam(event, 'id')

  let response
  try {
    const { data: tasks, error } = await client.from('subtask').select('*').eq('task', taskId).order('created_at')
    if (tasks) {
      response = tasks
    } else if (error) {
      return createError({ statusMessage: error.message })
    }
  } catch (e: any) {
    return createError({ statusMessage: e.message })
  }

  return response
})
