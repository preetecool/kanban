import { createError } from 'h3'
import { Database } from '~~/types/database.types'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  let body = await readBody(event)
  let boardId = getRouterParam(event, 'id')
  
  try {
    const { data, error } = await client
      .from('board')
      .update({
        title: body.title,
        updated_at: new Date(),
      })
      .eq('id', boardId)
      .select()
    if (error) throw error
    return {
      status: 200,
      statusText: 'Successfully updated board',
      body: data,
    }
  } catch (error: any) {
    return createError({ statusMessage: error.message })
  }
})
