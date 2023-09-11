import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const categoryId = getRouterParam(event, 'id')
  const {
    data: tasks,

    error,
  } = await client.from('task').select('*').eq('category', categoryId)

  if (error) {
    return createError({ statusMessage: error.message })
  }

  return tasks
})
