import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  try {
    const { data, error } = await client
      .from('task')
      .insert({
        id: body.taskId,
        category: body.categoryId,
        title: body.title,
        description: body.description,
        completed: false,
      })
      .select()
      .single()
    if (error) throw error
    return data
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
})
