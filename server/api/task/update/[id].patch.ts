import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)
  const taskId = getRouterParam(event, 'id')
  let response

  try {
    const { data, error } = await client
      .from('task')
      .update({
        category: body.category,
        updated_at: new Date(),
        title: body.title,
        description: body.description,
      })
      .eq('id', taskId)
      .select('*')
    if (error) throw error
    response = data
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }

  return response
})
