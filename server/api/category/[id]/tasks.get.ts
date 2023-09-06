import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  let categoryId = getRouterParam(event, 'id')
  const {
    data: tasks,

    error,
  } = await client.from('task').select('*').eq('category', categoryId)

  if (error) {
    return createError({ statusMessage: error.message })
  }

  return tasks
})
