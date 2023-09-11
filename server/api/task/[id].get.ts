import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const taskId = getRouterParam(event, 'id')

  const { data: task, error } = await client
    .from('task')
    .select('*, subtask(id, title, completed)')
    .eq('id', taskId)
    .single()
  if (error) {
    return createError({ statusMessage: error.message })
  }

  return task
})
